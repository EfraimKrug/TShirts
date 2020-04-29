<?php
require 'openSBDB.php';

$email = "";
$name = "";
$street = "";
$city = "";
$state = "";
$zip = "";
$country = "";
//"email=" + e + "&shirtID=" + s + "&Number=" + n + "&price=" + p + "&paidFlag=" + f + "&MailingAddress=" + m + "&orderDate=" + od + "&sentDate=" + sd;

if (count($_REQUEST) < 7) die();

if(array_key_exists('email', $_REQUEST)) $email = urldecode($_REQUEST['email']);
if(array_key_exists('name', $_REQUEST)) $name = $_REQUEST['name'];
if(array_key_exists('street', $_REQUEST)) $street = $_REQUEST['street'];
if(array_key_exists('city', $_REQUEST)) $city = $_REQUEST['city'];
if(array_key_exists('state', $_REQUEST)) $state = $_REQUEST['state'];
if(array_key_exists('zip', $_REQUEST)) $zip = $_REQUEST['zip'];
if(array_key_exists('country', $_REQUEST)) $county = $_REQUEST['country'];

$sql = "SELECT * FROM `SBAccounts` WHERE `email` = '" . $email . "'";
$resource = $conn->query($sql);
$row = $resource->fetch_assoc();
$accountID = 0;

if(isset($row['accountID'])){
  $accountID = $row['accountID'];
} else {
  $sql = "INSERT INTO `SBAccounts` (`email`,`name`) VALUES ('" . $email .  "','" . $name . "')";
  $resource = $conn->query($sql);
  $accountID = $conn->insert_id;
}

$sql = "INSERT INTO `SBTargets` (`accountID`,`street`,`city`,`state`,`zip`,`country`) VALUES ('" . $accountID . "','" . $street . "','" . $city . "','" . $state . "','" . $zip . "','" . $county . "')";
$resource = $conn->query($sql);
$targetKey = $conn->insert_id;
// send the Target Address key to the order...
echo json_encode(array("accountID" => $accountID, "targetID" => $targetKey));
?>
