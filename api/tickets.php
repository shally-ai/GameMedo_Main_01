<?php
require_once 'db_connect.php';
require_once 'auth_check.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        check_auth(); // Only admins/assignees for now
        
        $stmt = $conn->prepare("SELECT t.*, c.name as client_name FROM tickets t JOIN clients c ON t.client_id = c.id WHERE t.id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result && $row = $result->fetch_assoc()) {
            echo json_encode($row);
        } else {
            echo json_encode(["error" => "Ticket not found"]);
        }
        $stmt->close();
    } elseif (isset($_GET['client_id'])) {
        $client_id = intval($_GET['client_id']);
        $assigned_to = isset($_GET['assigned_to']) ? intval($_GET['assigned_to']) : 0;
        
        if ($assigned_to > 0) {
            $stmt = $conn->prepare("
                SELECT t.*, c.name as client_name, tm.name as assignee_name, 'own' as ticket_type 
                FROM tickets t 
                JOIN clients c ON t.client_id = c.id 
                LEFT JOIN team_members tm ON t.assigned_to = tm.id 
                WHERE t.client_id = ?
                UNION
                SELECT t.*, c.name as client_name, tm.name as assignee_name, 'assigned' as ticket_type 
                FROM tickets t 
                JOIN clients c ON t.client_id = c.id 
                LEFT JOIN team_members tm ON t.assigned_to = tm.id 
                WHERE t.assigned_to = ? AND t.client_id != ?
                ORDER BY created_at DESC
            ");
            $stmt->bind_param("iii", $client_id, $assigned_to, $client_id);
        } else {
            $stmt = $conn->prepare("SELECT t.*, c.name as client_name, 'own' as ticket_type FROM tickets t JOIN clients c ON t.client_id = c.id WHERE t.client_id = ? ORDER BY t.created_at DESC");
            $stmt->bind_param("i", $client_id);
        }
        
        $stmt->execute();
        $result = $stmt->get_result();
        $tickets = [];
        while ($row = $result->fetch_assoc()) {
            $tickets[] = $row;
        }
        echo json_encode($tickets);
        $stmt->close();
    } else {
        check_auth();
        
        $stmt = $conn->prepare("SELECT t.*, c.name as client_name, tm.name as assignee_name FROM tickets t JOIN clients c ON t.client_id = c.id LEFT JOIN team_members tm ON t.assigned_to = tm.id ORDER BY t.created_at DESC");
        $stmt->execute();
        $result = $stmt->get_result();
        
        $tickets = [];
        while ($row = $result->fetch_assoc()) {
            $tickets[] = $row;
        }
        echo json_encode($tickets);
        $stmt->close();
    }
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!$data) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid input data"]);
        exit;
    }

    // Creating/Updating tickets is protected
    // (A client can create their own, but an admin key is currently used for simplicity)
    check_auth();
    
    if (empty($data['ticket_number'])) {
        $res = $conn->query("SELECT MAX(id) as max_id FROM tickets");
        $max_id = ($res && $res->num_rows > 0) ? intval($res->fetch_assoc()['max_id']) : 0;
        $data['ticket_number'] = "TK-" . str_pad($max_id + 1, 3, "0", STR_PAD_LEFT);
    }

    $ticket_number = $data['ticket_number'];
    $client_id = intval($data['client_id']);
    $category = $data['category'] ?? 'Other';
    $subject = $data['subject'] ?? 'No Subject';
    $priority = $data['priority'] ?? 'normal';
    $status = $data['status'] ?? 'open';
    $assigned_to = isset($data['assigned_to']) && $data['assigned_to'] ? intval($data['assigned_to']) : null;
    $assigned_team = $data['assigned_team'] ?? '';

    if (isset($data['id']) && intval($data['id']) > 0) {
        $id = intval($data['id']);
        $stmt = $conn->prepare("UPDATE tickets SET category=?, subject=?, priority=?, status=?, assigned_to=?, assigned_team=? WHERE id=?");
        $stmt->bind_param("ssssisi", $category, $subject, $priority, $status, $assigned_to, $assigned_team, $id);
    } else {
        $stmt = $conn->prepare("INSERT INTO tickets (ticket_number, client_id, category, subject, priority, status, assigned_to, assigned_team) 
                               VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sissssis", $ticket_number, $client_id, $category, $subject, $priority, $status, $assigned_to, $assigned_team);
    }
    
    if ($stmt->execute()) {
        $res_id = $conn->insert_id ?: ($data['id'] ?? 0);
        echo json_encode(["message" => "Ticket saved", "id" => $res_id]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to save ticket."]);
    }
    $stmt->close();
}

$conn->close();
?>
