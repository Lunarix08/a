<?php
session_start(); // Start the session at the beginning

// Database connection
$servername = "localhost"; // Your database server
$username = "root"; // Your database username
$password = ""; // Your database password
$dbname = "fabianero"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the current maximum order_id
    $result = $conn->query("SELECT MAX(order_id) AS max_order_id FROM payments");
    $row = $result->fetch_assoc();
    $max_order_id = $row['max_order_id'];

    // Generate new order_id
    if ($max_order_id) {
        // Extract the numeric part and increment it
        $number = (int)substr($max_order_id, 3); // Remove 'Ord' and convert to integer
        $new_order_id = 'Ord' . ($number + 1); // Increment and prepend 'Ord'
    } else {
        // If there are no orders, start with Ord1
        $new_order_id = 'Ord1';
    }

    // Get payment information from the form
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone_number = $_POST['phone_number'];
    $card_number = $_POST['card-number'];
    $cvv = $_POST['cvv'];

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO payments (order_id, name, email, phone_number, card_number, cvv) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $new_order_id, $name, $email, $phone_number, $card_number, $cvv);

    // Execute the statement
    if ($stmt->execute()) {
        $_SESSION['payment_status'] = 'success';
    } else {
        $_SESSION['payment_status'] = 'failed';
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();

    // Redirect to index.php
    header("Location: index.php");
    exit();
} else {
    // If not a POST request, redirect to index.php or show an error
    header("Location: index.php");
    exit();
}
?>