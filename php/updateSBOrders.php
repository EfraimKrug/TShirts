<?php
require 'openSBDB.php';

$orderID = "";
$paidFlag = "";
//"email=" + e + "&shirtID=" + s + "&Number=" + n + "&price=" + p + "&paidFlag=" + f + "&MailingAddress=" + m + "&orderDate=" + od + "&sentDate=" + sd;
date_default_timezone_set("America/New_York");
$today = date("Y-m-d");

// if (count($_REQUEST) < 7) die();

if(array_key_exists('orderID', $_REQUEST)) $orderID = urldecode($_REQUEST['orderID']);
if(array_key_exists('paidFlag', $_REQUEST)) $paidFlag = urldecode($_REQUEST['paidFlag']);

$sql = "UPDATE `SBOrders` SET `paidFlag` = " . $paidFlag . " WHERE orderID = " . $orderID;
// echo $sql;
$resource = $conn->query($sql);
?>
