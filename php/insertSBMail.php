<?php
require 'openSBDB.php';
require 'email.php';

$SBMailFirst = "";
$SBMailLast = "";
$SBMailEmail = "";

date_default_timezone_set("America/New_York");
$today = date("Y-m-d");

if(array_key_exists('SBMailFirst', $_REQUEST)) $SBMailFirst = urldecode($_REQUEST['SBMailFirst']);
if(array_key_exists('SBMailLast', $_REQUEST)) $SBMailLast = $_REQUEST['SBMailLast'];
if(array_key_exists('SBMailEmail', $_REQUEST)) $SBMailEmail = $_REQUEST['SBMailEmail'];

$sql = "DELETE FROM `SBMailingList` WHERE SBMailEmail = '" . $SBMailEmail . "'";
$resource = $conn->query($sql);

$sql = "INSERT INTO `SBMailingList`(`SBMailFirst`, `SBMailLast`, `SBMailEmail`) VALUES ('" . $SBMailFirst . "','" . $SBMailLast . "','" . $SBMailEmail . "')";
// echo $sql;
$resource = $conn->query($sql);
$RowKey = $conn->insert_id;
sendThanksEmail($SBMailFirst, $SBMailEmail);

echo $RowKey;
?>
