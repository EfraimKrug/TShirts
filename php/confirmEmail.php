<?php
require 'openSBDB.php';
require 'email.php';

$SBMailEmail = "";

date_default_timezone_set("America/New_York");
$today = date("Y-m-d");

if(array_key_exists('email', $_REQUEST)) $SBMailEmail = $_REQUEST['email'];

$sql = "UPDATE `SBMailingList` SET `SBMailConfirm` = 1 WHERE `SBMailEmail` = '" . $SBMailEmail . "'";
// echo $sql;
$resource = $conn->query($sql);
header("Location: http://www.NameThatThing.site/home.html"); 
?>
