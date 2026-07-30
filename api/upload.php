<?php
require_once 'db_connect.php';
require_once 'auth_check.php';

// ONLY authenticated admins can upload files
check_auth();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_FILES["file"])) {
        http_response_code(400);
        echo json_encode(["error" => "No file uploaded"]);
        exit;
    }

    $file = $_FILES["file"];
    $allowed_extensions = ["jpg", "jpeg", "png", "gif", "webp", "mp4", "webm", "mov"];
    $allowed_mime_types = ["image/jpeg", "image/png", "image/gif", "image/webp", "video/mp4", "video/webm", "video/quicktime"];

    $file_info = pathinfo($file["name"]);
    $extension = strtolower($file_info["extension"]);
    
    // 1. Check extension whitelist
    if (!in_array($extension, $allowed_extensions)) {
        http_response_code(400);
        echo json_encode(["error" => "File type not allowed."]);
        exit;
    }

    // 2. Check MIME type (more secure than extension alone)
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime_type = finfo_file($finfo, $file["tmp_name"]);
    finfo_close($finfo);

    if (!in_array($mime_type, $allowed_mime_types)) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid file content."]);
        exit;
    }

    // 3. Prevent directory traversal and sanitize filename
    $filename = time() . "_" . preg_replace("/[^a-zA-Z0-9._-]/", "_", basename($file["name"]));
    
    $target_dir = "../uploads/";
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0755, true); // Use more restrictive permissions
    }
    
    $target_file = $target_dir . $filename;

    if (move_uploaded_file($file["tmp_name"], $target_file)) {
        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
        $url = $protocol . "://" . $_SERVER['HTTP_HOST'] . "/uploads/" . $filename;
        echo json_encode(["url" => $url, "path" => "uploads/" . $filename]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to save file."]);
    }
}
?>
