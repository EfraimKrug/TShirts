<?php
require 'openSBDB.php';

$amtPaid = "";
$pmtStatus = "";
$firstName = "";
$lastName = "";
$email = "";
$address_line_1 = "";
$address_line_2 = "";
$city = "";
$state = "";
$postal_code = "";
$country_code = "";
$reference_id = "";
$id = "";
$totalCharged = "";
$oldEmail = "";

//"email=" + e + "&shirtID=" + s + "&Number=" + n + "&price=" + p + "&paidFlag=" + f + "&MailingAddress=" + m + "&orderDate=" + od + "&sentDate=" + sd;
date_default_timezone_set("America/New_York");
$today = date("Y-m-d");

    if(array_key_exists('amtPaid', $_REQUEST)) $amtPaid = $_REQUEST['amtPaid'];
    if(array_key_exists('pmtStatus', $_REQUEST)) $pmtStatus = $_REQUEST['pmtStatus'];
    if(array_key_exists('firstName', $_REQUEST)) $firstName = $_REQUEST['firstName'];
    if(array_key_exists('lastName', $_REQUEST)) $lastName = $_REQUEST['lastName'];
    if(array_key_exists('email', $_REQUEST)) $email = $_REQUEST['email'];
    if(array_key_exists('address_line_1', $_REQUEST)) $address_line_1 = $_REQUEST['address_line_1'];
    if(array_key_exists('address_line_2', $_REQUEST)) $address_line_2 = $_REQUEST['address_line_2'];
    if(array_key_exists('city', $_REQUEST)) $city = $_REQUEST['city'];
    if(array_key_exists('state', $_REQUEST)) $state = $_REQUEST['state'];
    if(array_key_exists('postal_code', $_REQUEST)) $postal_code = $_REQUEST['postal_code'];
    if(array_key_exists('country_code', $_REQUEST)) $country_code = $_REQUEST['country_code'];
    if(array_key_exists('reference_id', $_REQUEST)) $reference_id = $_REQUEST['reference_id'];
    if(array_key_exists('id', $_REQUEST)) $id = $_REQUEST['id'];
    if(array_key_exists('totalCharged', $_REQUEST)) $totalCharged = $_REQUEST['totalCharged'];
    if(array_key_exists('oldEmail', $_REQUEST)) $oldEmail = $_REQUEST['oldEmail'];

$paidFlag = 0;
$sql = "INSERT INTO `SBPayPal` (`amtPaid`,`pmtStatus`,`firstName`,`lastName`,`email`,`address_line_1`,`address_line_2`,`city`,`state`,`postal_code`,`country_code`,`reference_id`,`payment_id`,`totalCharged`,`oldEmail`) VALUES (" . $amtPaid .  ",'" . $pmtStatus .  "','"  . $firstName . "','" . $lastName . "','" . $email . "','" . $address_line_1 . "','" . $address_line_2 . "','" . $city . "','" . $state . "','" . $postal_code . "','" . $country_code . "','" . $reference_id . "','" . $id . "'," . $totalCharged . ",'" . $oldEmail . "')";

// echo $sql;

$resource = $conn->query($sql);
$RowKey = $conn->insert_id;
echo $RowKey;
?>
