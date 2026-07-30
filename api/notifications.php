<?php
include 'db_connect.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (isset($_GET['client_id'])) {
        $client_id = intval($_GET['client_id']);
        $result = $conn->query("SELECT * FROM notifications WHERE client_id = $client_id ORDER BY created_at DESC");
        $notifications = [];
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $notifications[] = $row;
            }
        }
        echo json_encode($notifications);
    } else {
        echo json_encode(["error" => "client_id is required"]);
    }
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!$data) {
        echo json_encode(["error" => "Invalid input data"]);
        exit;
    }

    if (isset($data['mark_all_read'])) {
        $client_id = intval($data['client_id']);
        $sql = "UPDATE notifications SET is_read = TRUE WHERE client_id = $client_id";
    } elseif (isset($data['id'])) {
        $id = intval($data['id']);
        $sql = "UPDATE notifications SET is_read = TRUE WHERE id = $id";
    } else {
        $client_id = intval($data['client_id']);
        $type = $conn->real_escape_string($data['type'] ?? 'other');
        $title = $conn->real_escape_string($data['title'] ?? '');
        $message = $conn->real_escape_string($data['message'] ?? '');
        $sql = "INSERT INTO notifications (client_id, type, title, message) VALUES ($client_id, '$type', '$title', '$message')";
    }
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Success", "id" => $conn->insert_id]);
    } else {
        echo json_encode(["error" => $conn->error]);
    }
}

$conn->close();
?>
