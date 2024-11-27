<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$db_host = 'localhost';
$db_user = 'root';
$db_password = '';
$db_name = 'fabianero';

$conn = new mysqli($db_host, $db_user, $db_password, $db_name);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['product_id'])) {
    $product_id = $_POST['product_id'];

    error_log("Attempting to delete product with ID: " . $product_id);

    // Update the SQL query to use product_ID
    $stmt = $conn->prepare("DELETE FROM products WHERE product_ID = ?");
    if (!$stmt) {
        error_log("Prepare failed: " . $conn->error);
        http_response_code(500);
        echo "Prepare failed: " . $conn->error;
        exit;
    }

    $stmt->bind_param("i", $product_id);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo "Product deleted successfully";
            error_log("Product deleted successfully. Affected rows: " . $stmt->affected_rows);
        } else {
            http_response_code(404);
            echo "No product found with the given ID";
            error_log("No product found with ID: " . $product_id);
        }
    } else {
        http_response_code(500);
        echo "Error deleting product: " . $stmt->error;
        error_log("Error deleting product: " . $stmt->error);
    }

    $stmt->close();
} else {
    http_response_code(400);
    echo "Invalid request";
    error_log("Invalid request received");
}

$conn->close();
?>