<?php
require 'openSBDB.php';

$email = "";

date_default_timezone_set("America/New_York");
$today = date("Y-m-d");

if(array_key_exists('accountID', $_REQUEST)) $accountID = urldecode($_REQUEST['accountID']);

$paidFlag = 0;
$sql = "SELECT * FROM SBOrders WHERE accountID = '" . $accountID . "'";

$resource = $conn->query($sql);
$dset = $resource->fetch_all(MYSQLI_ASSOC);
// print_r($dset);
echo(json_encode($dset));
?>
