<?php
require_once 'db_connect.php';
require_once 'auth_check.php';

// Only admins can see bookings
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    check_auth();
    
    $stmt = $conn->prepare("SELECT * FROM bookings ORDER BY created_at DESC");
    $stmt->execute();
    $result = $stmt->get_result();
    
    $bookings = [];
    while ($row = $result->fetch_assoc()) {
        $bookings[] = $row;
    }
    echo json_encode($bookings);
    $stmt->close();
}

// Public can create bookings, but we still secure the input
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    // Using prepared statements for ALL inserts
    $stmt = $conn->prepare("INSERT INTO bookings (name, email, whatsapp, preferred_date, preferred_time) VALUES (?, ?, ?, ?, ?)");
    
    if ($stmt) {
        $stmt->bind_param("sssss", 
            $data['name'], 
            $data['email'], 
            $data['whatsapp'], 
            $data['preferred_date'], 
            $data['preferred_time']
        );

        if ($stmt->execute()) {
            echo json_encode(["message" => "Booking created", "id" => $stmt->insert_id]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Scheduling failed. Please try again."]);
        }
        $stmt->close();
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Execution failed."]);
    }
}

$conn->close();
?>
