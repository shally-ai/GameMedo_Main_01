<?php
require_once 'db_connect.php';
require_once 'auth_check.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        // Only admins or the client who owns the order should see this (ideally)
        // For now, let's at least enforce standard check_auth for admin views
        check_auth(); 
        
        $stmt = $conn->prepare("SELECT o.*, c.name as client_name, c.school_name FROM orders o JOIN clients c ON o.client_id = c.id WHERE o.id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result && $row = $result->fetch_assoc()) {
            echo json_encode($row);
        } else {
            echo json_encode(["error" => "Order not found"]);
        }
        $stmt->close();
    } elseif (isset($_GET['client_id'])) {
        $client_id = intval($_GET['client_id']);
        // If it's a client view, we might allow it if we had sessions, 
        // but for now let's at least use prepared statements.
        $stmt = $conn->prepare("SELECT * FROM orders WHERE client_id = ? ORDER BY created_at DESC");
        $stmt->bind_param("i", $client_id);
        $stmt->execute();
        $result = $stmt->get_result();

        $orders = [];
        while ($row = $result->fetch_assoc()) {
            $orders[] = $row;
        }
        echo json_encode($orders);
        $stmt->close();
    } else {
        // Listing all orders is strictly Admin
        check_auth();
        
        $stmt = $conn->prepare("SELECT o.*, c.name as client_name, c.school_name, tm.name as assignee_name FROM orders o JOIN clients c ON o.client_id = c.id LEFT JOIN team_members tm ON o.assigned_to = tm.id ORDER BY o.created_at DESC");
        $stmt->execute();
        $result = $stmt->get_result();

        $orders = [];
        while ($row = $result->fetch_assoc()) {
            $orders[] = $row;
        }
        echo json_encode($orders);
        $stmt->close();
    }
}

if ($method === 'POST') {
    // Creating/Updating orders is strictly Admin
    check_auth();
    
    $data = json_decode(file_get_contents("php://input"), true);
    if (!$data) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid input data"]);
        exit;
    }
    
    // Auto-generate order number if not provided
    if (empty($data['order_number'])) {
        $res = $conn->query("SELECT MAX(id) as max_id FROM orders");
        $max_id = ($res && $res->num_rows > 0) ? intval($res->fetch_assoc()['max_id']) : 0;
        $data['order_number'] = "ORD-" . str_pad($max_id + 1, 3, "0", STR_PAD_LEFT);
    }

    $order_number = $data['order_number'];
    $client_id = intval($data['client_id']);
    $service_type = $data['service_type'] ?? 'Website';
    $title = $data['title'] ?? 'Untitled Order';
    $description = $data['description'] ?? '';
    $status = $data['status'] ?? 'pending';
    $progress = intval($data['progress'] ?? 0);
    $deadline = $data['deadline'] ?? '';
    $assignee = $data['assignee'] ?? 'Unassigned';
    $assigned_to = isset($data['assigned_to']) && $data['assigned_to'] ? intval($data['assigned_to']) : null;

    if (isset($data['id']) && intval($data['id']) > 0) {
        $id = intval($data['id']);
        $stmt = $conn->prepare("UPDATE orders SET service_type=?, title=?, description=?, status=?, progress=?, deadline=?, assignee=?, assigned_to=? WHERE id=?");
        $stmt->bind_param("ssssissii", $service_type, $title, $description, $status, $progress, $deadline, $assignee, $assigned_to, $id);
    } else {
        $stmt = $conn->prepare("INSERT INTO orders (order_number, client_id, service_type, title, description, status, progress, deadline, assignee, assigned_to) 
                               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sissssisss", $order_number, $client_id, $service_type, $title, $description, $status, $progress, $deadline, $assignee, $assigned_to);
    }
    
    if ($stmt->execute()) {
        $order_id = $stmt->insert_id ?: ($data['id'] ?? 0);
        echo json_encode(["message" => "Order saved", "id" => $order_id]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to save order."]);
    }
    $stmt->close();
}

$conn->close();
?>
