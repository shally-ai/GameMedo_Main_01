<?php
require_once 'db_connect.php';
require_once 'auth_check.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Public access for samples is OK (Portfolio)
    $stmt = $conn->prepare("SELECT * FROM samples ORDER BY created_at DESC");
    $stmt->execute();
    $result = $stmt->get_result();
    
    $samples = [];
    while ($row = $result->fetch_assoc()) {
        $samples[] = $row;
    }
    echo json_encode($samples);
    $stmt->close();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    check_auth();
    
    $data = json_decode(file_get_contents("php://input"), true);
    $title = $data['title'];
    $type = $data['type'];
    $media_url = $data['media_url'];
    $thumbnail_url = $data['thumbnail_url'] ?? "";
    $website_url = $data['website_url'] ?? "";
    
    $stmt = $conn->prepare("INSERT INTO samples (title, type, media_url, thumbnail_url, website_url) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $title, $type, $media_url, $thumbnail_url, $website_url);
    
    if ($stmt->execute()) {
        echo json_encode(["message" => "Sample added", "id" => $stmt->insert_id]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to add sample."]);
    }
    $stmt->close();
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    check_auth();
    
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        $stmt = $conn->prepare("DELETE FROM samples WHERE id = ?");
        $stmt->bind_param("i", $id);
        
        if ($stmt->execute()) {
            echo json_encode(["message" => "Sample deleted"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Failed to delete sample."]);
        }
        $stmt->close();
    }
}

$conn->close();
?>
