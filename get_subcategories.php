<?php
header('Content-Type: application/json');

$db_host = 'localhost';
$db_user = 'root';
$db_password = '';
$db_name = 'fabianero';

$conn = new mysqli($db_host, $db_user, $db_password, $db_name);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$sql = "SELECT DISTINCT subcategory FROM products ORDER BY subcategory";
$result = $conn->query($sql);

$subcategories = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $subcategories[] = $row['subcategory'];
    }
}

echo json_encode($subcategories);

$conn->close();
?>