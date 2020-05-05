<?php
require 'openSBDB.php';

$email = "";

date_default_timezone_set("America/New_York");
$today = date("Y-m-d");

if(array_key_exists('email', $_REQUEST)) $email = urldecode($_REQUEST['email']);

$paidFlag = 0;
$sql = "SELECT MAX(accountID) as accountID FROM SBAccounts WHERE email = '" . $email . "'";

$resource = $conn->query($sql);
$dset = $resource->fetch_all(MYSQLI_ASSOC);
// print_r($dset);
echo $dset[0]['accountID'];
?>
