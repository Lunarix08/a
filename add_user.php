<?php
session_start();

// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database configuration
$db_host = 'localhost';
$db_user = 'root';
$db_password = '';
$db_name = 'fabianero';

// Create a connection to the database
$conn = new mysqli($db_host, $db_user, $db_password, $db_name);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if all required fields are received via POST
if (isset($_POST['user_id'], $_POST['username'], $_POST['email'], $_POST['role'], $_POST['phone_number'], $_POST['address'])) {
    $user_id = $_POST['user_id'];
    $username = $_POST['username'];
    $email = $_POST['email'];
    $role = $_POST['role'];
    $phone_number = $_POST['phone_number'];
    $address = $_POST['address'];

    // Prepare the SQL statement to insert the new user
    $sql = "INSERT INTO users (id, username, email, role, phone_number, address) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        error_log("Error preparing statement: " . $conn->error, 3, '/path/to/error.log');
        die("Error preparing statement.");
    }

    $stmt->bind_param("isssss", $user_id, $username, $email, $role, $phone_number, $address);

    if ($stmt->execute()) {
        echo "User  added successfully.";
    } else {
        error_log("Error executing statement: " . $stmt->error, 3, '/path/to/error.log');
        echo "Error executing statement.";
    }

    $stmt->close();
} else {
    echo "Required fields are missing.";
}

$conn->close();
?>