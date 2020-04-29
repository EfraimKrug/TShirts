<?php
require 'openSBDB.php';

$email = "";

echo "<html><body><p>";
$sql = "SELECT * FROM `SBAccounts`";
$resource = $conn->query($sql);
while($row = $resource->fetch_assoc()) {
    echo "</p><p>";
    print_r($row);
    echo "</p><p>";
}
echo "</p><p>";
$sql = "SELECT * FROM `SBTargets`";
$resource = $conn->query($sql);
while($row = $resource->fetch_assoc()) {
    echo "</p><p>";
    print_r($row);
    echo "</p><p>";

}
echo "</p><p>";
$sql = "SELECT * FROM `SBOrders`";
$resource = $conn->query($sql);
while($row = $resource->fetch_assoc()) {
    echo "</p><p>";
    print_r($row);
    echo "</p><p>";
}
echo "</p></body></html>";
?>
