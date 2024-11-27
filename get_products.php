<?php
$db_host = 'localhost';
$db_user = 'root';
$db_password = '';
$db_name = 'fabianero';

$conn = new mysqli($db_host, $db_user, $db_password, $db_name);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['subcategory'])) {
    $subcategory = $_GET['subcategory'];
    $sql = "SELECT * FROM products WHERE subcategory = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $subcategory);
} else {
    $sql = "SELECT * FROM products";
    $stmt = $conn->prepare($sql);
}
$stmt->execute();
$result = $stmt->get_result();
$products = [];
while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}
echo json_encode($products);
$conn->close();
?>
