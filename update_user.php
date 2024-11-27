<?php
session_start();

$db_host = 'localhost';
$db_user = 'root';
$db_password = '';
$db_name = 'fabianero';

$conn = new mysqli($db_host, $db_user, $db_password, $db_name);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Database connection established successfully! ";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $userId = $_POST['user_id'];
    $username = $_POST['username'];
    $email = $_POST['email'];
    $phoneNumber = $_POST['phone_number'];
    $address = $_POST['address'];
    $role = $_POST['role'];

    echo "Data received: ";
    var_dump($_POST);

    $sql = "UPDATE users SET username = ?, email = ?, phone_number = ?, address = ?, role = ? WHERE id = ? ";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssss", $username, $email, $phoneNumber, $address, $role, $userId);

    try {
        $stmt->execute();
        echo "User updated successfully! ";
    } catch (Exception $e) {
        echo "Error updating user: " . $e->getMessage();
    }
}

$conn->close();
?>
