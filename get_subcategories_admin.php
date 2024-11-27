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

// Get the main category from the GET parameter
$maincategory = isset($_GET['maincategory']) ? $_GET['maincategory'] : '';

// Use a prepared statement to prevent SQL injection
$sql = "SELECT DISTINCT subcategory FROM products WHERE maincategory = ? ORDER BY subcategory";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $maincategory);
$stmt->execute();
$result = $stmt->get_result();

$subcategories = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $subcategories[] = $row['subcategory'];
    }
}

echo json_encode($subcategories);

$stmt->close();
$conn->close();
?>