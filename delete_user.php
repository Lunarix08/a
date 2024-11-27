<?php
session_start();

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

// Check if user_id is received via POST
if (isset($_POST['user_id'])) {
    $user_id = $_POST['user_id'];

    // Prepare the SQL statement to delete the user
    $sql = "DELETE FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);

    if ($stmt->execute()) {
        // Successfully deleted
        echo "User  deleted successfully.";
    } else {
        // Error occurred
        echo "Error deleting user: " . $conn->error;
    }

    $stmt->close();
} else {
    echo "No user ID received.";
}

$conn->close();
?>