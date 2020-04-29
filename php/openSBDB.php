<?php
$servername = "efraimmkrug71828.domaincommysql.com";
$username = "socialbonding";
$password = "S0c1@lB0nd1ng";
$dbname = "socialbondingdb";
$messageBack = "";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
   die("Connection failed: " . $conn->connect_error);
}
?>
