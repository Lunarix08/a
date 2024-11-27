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

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $phone_number = $_POST['phone_number'];
    $address = $_POST['address'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    if (empty($username) || empty($email) || empty($phone_number) || empty($address) || empty($password) || empty($confirm_password)) {
        $_SESSION['register_error'] = "All fields are required.";
        header("Location: index.php");
        exit();
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['register_error'] = "Invalid email address.";
        header("Location: index.php");
        exit();
    } elseif ($password != $confirm_password) {
        $_SESSION['register_error'] = "Passwords do not match.";
        header("Location: index.php");
        exit();
    } else {
        $sql = "SELECT * FROM users WHERE email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $_SESSION['register_error'] = "Email address is already in use.";
            header("Location: index.php");
            exit();
        } else {
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            $role = 'User'; 

            $sql = "INSERT INTO users (username, email, phone_number, address, password, role) VALUES (?, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ssssss", $username, $email, $phone_number, $address, $hashed_password, $role);
            $stmt->execute();

            if ($stmt->affected_rows > 0) {
                $_SESSION['register_success'] = "Registration successful!";
                header("Location: index.php");
                exit();
            } else {
                $_SESSION['register_error'] = "Error adding user.";
                header("Location: index.php");
                exit();
            }
        }
    }
}

$conn->close();
?>