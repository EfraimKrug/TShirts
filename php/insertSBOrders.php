<?php
require 'openSBDB.php';

$accountID = "";
$targetID = "";
$shirtID = "";
$Number = "";
$price = "";
$paidFlag = "";
$size = "";
$orderDate = "";
$sentDate = "";
$color = "";
//"email=" + e + "&shirtID=" + s + "&Number=" + n + "&price=" + p + "&paidFlag=" + f + "&MailingAddress=" + m + "&orderDate=" + od + "&sentDate=" + sd;
date_default_timezone_set("America/New_York");
$today = date("Y-m-d");

// if (count($_REQUEST) < 7) die();

if(array_key_exists('accountID', $_REQUEST)) $accountID = urldecode($_REQUEST['accountID']);
if(array_key_exists('targetID', $_REQUEST)) $targetID = urldecode($_REQUEST['targetID']);
if(array_key_exists('shirtID', $_REQUEST)) $shirtID = "#" . $_REQUEST['shirtID'];
if(array_key_exists('number', $_REQUEST)) $Number = $_REQUEST['number'];
if(array_key_exists('price', $_REQUEST)) $price = $_REQUEST['price'];
if(array_key_exists('size', $_REQUEST)) $size = $_REQUEST['size'];
if(array_key_exists('color', $_REQUEST)) $color = $_REQUEST['color'];

// if(array_key_exists('MailingAddress', $_REQUEST)) $MailingAddress = $_REQUEST['MailingAddress'];
// if(array_key_exists('orderDate', $_REQUEST)) $orderDate = $_REQUEST['orderDate'];
// if(array_key_exists('sentDate', $_REQUEST)) $sentDate = $_REQUEST['sentDate'];
$paidFlag = 0;
$sql = "INSERT INTO `SBOrders` (`accountID`,`targetID`,`shirtID`,`size`,`Number`,`color`,`price`,`paidFlag`,`orderDate`,`sentDate`) VALUES ('" . $accountID .  "','" . $targetID .  "','"  . $shirtID . "','" . $size . "'," . $Number . ",'" . $color . "'," . $price . "," . $paidFlag . ",'" . $today . "','0000-00-00')";
// echo $sql;
$resource = $conn->query($sql);
$RowKey = $conn->insert_id;
echo $RowKey;
?>
