<?php
include 'db_connect.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (isset($_GET['ticket_id'])) {
        $ticket_id = intval($_GET['ticket_id']);
        $result = $conn->query("SELECT * FROM ticket_messages WHERE ticket_id = $ticket_id ORDER BY created_at ASC");
        $messages = [];
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $messages[] = $row;
            }
        }
        echo json_encode($messages);
    } else {
        echo json_encode(["error" => "ticket_id is required"]);
    }
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!$data) {
        echo json_encode(["error" => "Invalid input data"]);
        exit;
    }

    $ticket_id = intval($data['ticket_id']);
    $sender_id = intval($data['sender_id']);
    $sender_type = $conn->real_escape_string($data['sender_type'] ?? 'client');
    $message = $conn->real_escape_string($data['message'] ?? '');
    $file_url = $conn->real_escape_string($data['file_url'] ?? '');

    $sql = "INSERT INTO ticket_messages (ticket_id, sender_id, sender_type, message, file_url) 
            VALUES ($ticket_id, $sender_id, '$sender_type', '$message', '$file_url')";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Message sent", "id" => $conn->insert_id]);
    } else {
        echo json_encode(["error" => $conn->error]);
    }
}

$conn->close();
?>
