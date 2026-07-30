<?php
require_once 'config.php';

// Hostinger MySQL Connection
$host = DB_HOST;
$username = DB_USER;
$password = DB_PASS;
$database = DB_NAME;

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    // Hidden real error for security
    http_response_code(500);
    die(json_encode(["error" => "Database connection failure."]));
}

// Set time zone
$conn->query("SET time_zone = '+00:00'");

// CORS Headers - Dynamic check based on configuration
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    // Optionally log unauthorized origin attempt
}

header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Api-Key");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}
?>
