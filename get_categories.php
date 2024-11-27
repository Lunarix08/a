<?php
$db_host = 'localhost';
$db_user = 'root';
$db_password = '';
$db_name = 'fabianero';

$conn = new mysqli($db_host, $db_user, $db_password, $db_name);
$sql = "SELECT DISTINCT maincategory FROM products ORDER BY maincategory";
$result = $conn->query($sql);
$categories = [];
while ($row = $result->fetch_assoc()) {
    $categories[] = $row['maincategory'];
}
echo json_encode($categories);
?>