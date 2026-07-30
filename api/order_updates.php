<?php
include 'db_connect.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (isset($_GET['order_id'])) {
        $order_id = intval($_GET['order_id']);
        $result = $conn->query("SELECT * FROM order_updates WHERE order_id = $order_id ORDER BY created_at ASC");
        $updates = [];
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $updates[] = $row;
            }
        }
        echo json_encode($updates);
    } else {
        echo json_encode(["error" => "order_id is required"]);
    }
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!$data) {
        echo json_encode(["error" => "Invalid input data"]);
        exit;
    }

    $order_id = intval($data['order_id']);
    $created_by = intval($data['created_by']);
    $created_by_type = $conn->real_escape_string($data['created_by_type'] ?? 'client');
    $message = $conn->real_escape_string($data['message'] ?? '');
    $file_url = $conn->real_escape_string($data['file_url'] ?? '');

    $sql = "INSERT INTO order_updates (order_id, message, created_by, created_by_type, file_url) 
            VALUES ($order_id, '$message', $created_by, '$created_by_type', '$file_url')";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Update sent", "id" => $conn->insert_id]);
    } else {
        echo json_encode(["error" => $conn->error]);
    }
}

$conn->close();
?>
