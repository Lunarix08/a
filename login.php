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

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    if (empty($email) || empty($password)) {
        $_SESSION['login_error'] = "Email and password are required.";
        header("Location: index.php");
        exit();
    } else {
        // Update this query to use the correct column names
        $sql = "SELECT * FROM users WHERE email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            if (password_verify($password, $user['password'])) {
                if ($email == 'DailyGrindAdmin@gmail.com' && $password == 'DailyGrindAdmin123') { 
                    header("Location: admin.php"); 
                    exit(); 
                } else {
                    $_SESSION['user'] = $email;
                    header("Location: index.php");
                    exit();
                }
            } else {
                $_SESSION['login_error'] = "Invalid password.";
                header("Location: index.php");
                exit();
            }
        } else {
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $_SESSION['login_error'] = "Invalid email address.";
            } else {
                $_SESSION['login_error'] = "Email or password is incorrect.";
            }
            header("Location: index.php");
            exit();
        }
    }
}

$conn->close();
?>