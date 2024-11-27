<?php
// Check if payment_id is set
if (isset($_POST['payment_id'])) {
    $payment_id = $_POST['payment_id'];

    // Connect to the database
    $db_host = 'localhost';
    $db_user = 'root';
    $db_password = '';
    $db_name = 'fabianero';

    $conn = new mysqli($db_host, $db_user, $db_password, $db_name);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare and execute the SQL statement to delete the payment
    $stmt = $conn->prepare("DELETE FROM payments WHERE payment_id = ?");
    $stmt->bind_param("s", $payment_id);

    if ($stmt->execute()) {
        echo "Payment deleted successfully.";
        
    } else {
        echo "Error deleting payment: " . $conn->error;
    }
    header("Location: admin.php");
    // Close the statement and connection
    $stmt->close();
    $conn->close();
} else {
    echo "No payment ID provided.";
    header("Location: admin.php");
}
?>