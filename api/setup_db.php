<?php
include 'db_connect.php';

$sql_bookings = "CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    whatsapp VARCHAR(20) NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_time VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

$sql_samples = "CREATE TABLE IF NOT EXISTS samples (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type ENUM('video', 'graphic', 'website') NOT NULL,
    media_url TEXT NOT NULL,
    thumbnail_url TEXT,
    website_url TEXT,
    storage_path TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

$sql_clients = "CREATE TABLE IF NOT EXISTS clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    school_name VARCHAR(255),
    position VARCHAR(100),
    phone VARCHAR(20),
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

$sql_orders = "CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(20) NOT NULL UNIQUE,
    client_id INT NOT NULL,
    service_type ENUM('Website', 'Video', 'Social Media') NOT NULL,
    status ENUM('pending', 'in_progress', 'under_review', 'completed', 'delivered') DEFAULT 'pending',
    title VARCHAR(255) NOT NULL,
    description TEXT,
    progress INT DEFAULT 0,
    deadline DATETIME,
    assignee VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
)";

// Define queries individually
$sql_tickets = "CREATE TABLE IF NOT EXISTS tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_number VARCHAR(20) UNIQUE NOT NULL,
    client_id INT NOT NULL,
    category VARCHAR(50) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    priority ENUM('low', 'normal', 'high', 'urgent') DEFAULT 'normal',
    status ENUM('open', 'in_progress', 'resolved', 'closed') DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
)";

$sql_messages = "CREATE TABLE IF NOT EXISTS ticket_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT NOT NULL,
    sender_id INT NOT NULL,
    sender_type ENUM('client', 'admin') DEFAULT 'client',
    message TEXT,
    file_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE
)";

$sql_updates = "CREATE TABLE IF NOT EXISTS order_updates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    message TEXT,
    created_by INT NOT NULL,
    created_by_type ENUM('client', 'admin') DEFAULT 'client',
    file_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
)";

$sql_notifications = "CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    type ENUM('order', 'message', 'urgent', 'other') DEFAULT 'other',
    title VARCHAR(255) NOT NULL,
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
)";

$sql_team_members = "CREATE TABLE IF NOT EXISTS team_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL DEFAULT 'developer',
    avatar_url TEXT,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

// Execute queries
$tables = [
    "bookings" => $sql_bookings,
    "samples" => $sql_samples,
    "clients" => $sql_clients,
    "orders" => $sql_orders,
    "tickets" => $sql_tickets,
    "ticket_messages" => $sql_messages,
    "order_updates" => $sql_updates,
    "notifications" => $sql_notifications,
    "team_members" => $sql_team_members
];

$results = [];
foreach ($tables as $name => $sql) {
    if ($conn->query($sql) === TRUE) {
        $results[$name] = "OK";
    } else {
        $results[$name] = "Error: " . $conn->error;
    }
}

// Add thumbnail_url column to samples if it doesn't exist (legacy support)
$conn->query("ALTER TABLE samples ADD COLUMN IF NOT EXISTS thumbnail_url TEXT AFTER media_url");

// Migration for clients table: add position and phone
$conn->query("ALTER TABLE clients ADD COLUMN IF NOT EXISTS position VARCHAR(100) AFTER school_name");
$conn->query("ALTER TABLE clients ADD COLUMN IF NOT EXISTS phone VARCHAR(20) AFTER position");

// Migration for tickets table: add assignment columns
$conn->query("ALTER TABLE tickets ADD COLUMN IF NOT EXISTS assigned_to INT AFTER status");
$conn->query("ALTER TABLE tickets ADD COLUMN IF NOT EXISTS assigned_team VARCHAR(50) AFTER assigned_to");

// Migration for orders table: add assignment column
$conn->query("ALTER TABLE orders ADD COLUMN IF NOT EXISTS assigned_to INT AFTER assignee");

echo json_encode(["message" => "Setup completed", "results" => $results]);

$conn->close();
?>
