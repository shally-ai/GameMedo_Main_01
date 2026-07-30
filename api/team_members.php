<?php
require_once 'db_connect.php';
require_once 'auth_check.php';

// ALL team operations are strictly Admin
check_auth();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        $stmt = $conn->prepare("SELECT * FROM team_members WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result && $row = $result->fetch_assoc()) {
            echo json_encode($row);
        } else {
            echo json_encode(["error" => "Team member not found"]);
        }
        $stmt->close();
    } elseif (isset($_GET['role'])) {
        $role = $_GET['role'];
        $status_filter = isset($_GET['include_inactive']) ? "" : " AND status='active'";
        
        $sql = "SELECT * FROM team_members WHERE role = ?$status_filter ORDER BY name ASC";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $role);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $members = [];
        while ($row = $result->fetch_assoc()) {
            $members[] = $row;
        }
        echo json_encode($members);
        $stmt->close();
    } else {
        $status_filter = isset($_GET['include_inactive']) ? "" : " WHERE status='active'";
        $sql = "SELECT * FROM team_members$status_filter ORDER BY name ASC";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $members = [];
        while ($row = $result->fetch_assoc()) {
            $members[] = $row;
        }
        echo json_encode($members);
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

    $name = $data['name'] ?? '';
    $email = $data['email'] ?? '';
    $role = $data['role'] ?? 'developer';
    $avatar_url = $data['avatar_url'] ?? '';
    $status = $data['status'] ?? 'active';

    if (empty($name) || empty($email)) {
        http_response_code(400);
        echo json_encode(["error" => "Name and email are required"]);
        exit;
    }

    if (isset($data['id']) && intval($data['id']) > 0) {
        $id = intval($data['id']);
        $stmt = $conn->prepare("UPDATE team_members SET name=?, email=?, role=?, avatar_url=?, status=? WHERE id=?");
        $stmt->bind_param("sssssi", $name, $email, $role, $avatar_url, $status, $id);
    } else {
        $stmt = $conn->prepare("INSERT INTO team_members (name, email, role, avatar_url, status) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $name, $email, $role, $avatar_url, $status);
    }

    if ($stmt->execute()) {
        $res_id = $conn->insert_id ?: ($data['id'] ?? 0);
        echo json_encode(["message" => "Team member saved", "id" => $res_id]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to save team member."]);
    }
    $stmt->close();
}

if ($method === 'DELETE') {
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        // Soft delete: set status to inactive
        $stmt = $conn->prepare("UPDATE team_members SET status='inactive' WHERE id=?");
        $stmt->bind_param("i", $id);
        
        if ($stmt->execute()) {
            echo json_encode(["message" => "Team member deactivated"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Failed to deactivate team member."]);
        }
        $stmt->close();
    }
}

$conn->close();
?>
