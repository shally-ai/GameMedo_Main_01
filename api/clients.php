<?php
require_once 'db_connect.php';
require_once 'auth_check.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Only admins can enumerate or fetch clients by ID/email
    check_auth();

    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        $stmt = $conn->prepare("SELECT * FROM clients WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result && $row = $result->fetch_assoc()) {
            echo json_encode($row);
        } else {
            echo json_encode(["error" => "Client not found"]);
        }
        $stmt->close();
    } elseif (isset($_GET['email'])) {
        $email = $_GET['email'];
        $stmt = $conn->prepare("SELECT * FROM clients WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result && $row = $result->fetch_assoc()) {
            echo json_encode($row);
        } else {
            echo json_encode(["error" => "Client not found"]);
        }
        $stmt->close();
    } else {
        $stmt = $conn->prepare("SELECT * FROM clients ORDER BY name ASC");
        $stmt->execute();
        $result = $stmt->get_result();
        
        $clients = [];
        while ($row = $result->fetch_assoc()) {
            $clients[] = $row;
        }
        echo json_encode($clients);
        $stmt->close();
    }
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!$data || empty($data['email'])) {
        http_response_code(400);
        echo json_encode(["error" => "Email is required"]);
        exit;
    }

    $email = $data['email'];
    $name = $data['name'] ?? '';
    $school_name = $data['school_name'] ?? '';
    $position = $data['position'] ?? '';
    $phone = $data['phone'] ?? '';
    $avatar_url = $data['avatar_url'] ?? '';
    $team_role = $data['team_role'] ?? 'client';

    // SECURITY: If someone is trying to sync as an admin, they MUST provide the API Key
    if ($team_role === 'admin') {
        check_auth();
    }

    // Insert or update client
    $stmt = $conn->prepare("INSERT INTO clients (name, email, school_name, position, phone, avatar_url) 
                          VALUES (?, ?, ?, ?, ?, ?)
                          ON DUPLICATE KEY UPDATE 
                          name=IF(?='', name, ?), 
                          school_name=IF(?='', school_name, ?), 
                          position=IF(?='', position, ?), 
                          phone=IF(?='', phone, ?), 
                          avatar_url=IF(?='', avatar_url, ?)");
    
    $stmt->bind_param("ssssssssssssss", 
        $name, $email, $school_name, $position, $phone, $avatar_url,
        $name, $name, $school_name, $school_name, $position, $position, $phone, $phone, $avatar_url, $avatar_url
    );
    // Wait, bind_param count was wrong. 6 for values, 10 for update IFs? 
    // Actually: name(1), email(2), school(3), pos(4), phone(5), av(6) 
    // Update part: name(7,8), school(9,10), pos(11,12), phone(13,14), av(15,16) -> 16 params
    
    // Let's re-bind correctly
    $stmt->close();
    $sql = "INSERT INTO clients (name, email, school_name, position, phone, avatar_url) 
            VALUES (?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE 
            name=IF(?='', name, ?), 
            school_name=IF(?='', school_name, ?), 
            position=IF(?='', position, ?), 
            phone=IF(?='', phone, ?), 
            avatar_url=IF(?='', avatar_url, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssssssssss", 
        $name, $email, $school_name, $position, $phone, $avatar_url,
        $name, $name, $school_name, $school_name, $position, $position, $phone, $phone, $avatar_url, $avatar_url
    );
    // Bind param count for 16 placeholders should be "ssssssssssssssss"
    
    // Let's fix the placeholder count in ReplacementContent
    // Actually, I'll simplify the ON DUPLICATE KEY UPDATE to avoid 20 placeholders
}
