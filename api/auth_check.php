<?php
require_once 'config.php';

function check_auth() {
    $headers = getallheaders();
    $api_key = $headers['X-Api-Key'] ?? $headers['x-api-key'] ?? null;

    if (!$api_key || $api_key !== ADMIN_API_KEY) {
        http_response_code(401);
        echo json_encode(["error" => "Unauthorized access. Invalid or missing API key."]);
        exit;
    }
}

// Function to protect specific HTTP methods (e.g. only protect GET for admin data)
function protect_method($methods) {
    if (in_array($_SERVER['REQUEST_METHOD'], $methods)) {
        check_auth();
    }
}
?>
