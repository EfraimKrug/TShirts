<?php
////////////////////////////////////////////////////////
//Manual order process -
// This must be run in the case that an order was paid, but
// did not get into Printful...
//
////////////////////////////////////////////////////////
require 'apiBase.php';
require 'apiky.php';
////////////////////////////////////////////////////////
require 'openSBDB.php';

$email = "";

date_default_timezone_set("America/New_York");
$today = date("Y-m-d");

if(array_key_exists('accountID', $_REQUEST)) $accountID = urldecode($_REQUEST['accountID']);
$paidFlag = 0;
$sql = "SELECT * FROM SBOrders as O, SBAccounts as A, SBTargets as T WHERE A.accountID = O.accountID and O.targetID = T.targetID and O.paidFlag = 1";

$resource = $conn->query($sql);


$itemArray = [];
if ($resource->num_rows > 0) {
    $row = $resource->fetch_assoc();
    $itemArray[0]->sync_variant_id = substr($row["shirtID"],1);
    $itemArray[0]->quantity = $row["Number"];

    $recipient->name = $row['name'];
    $recipient->address1 = $row['street'];
    $recipient->city = $row['city'];
    $recipient->state_code = $row['state'];
    $recipient->country_code = $row['country'];
    $recipient->zip = $row['zip'];

    $data->recipient = $recipient;
    $data->items = $itemArray;

    $pf = new PrintfulApiClient($apiKey);
    try {
        $estimate = $pf->post('orders', $data);
        echo json_encode($estimate);
    } catch (PrintfulApiException $e) { //API response status code was not successful
        echo 'Printful API Exception: ' . $e->getCode() . ' ' . $e->getMessage();
    } catch (PrintfulException $e) { //API call failed
        echo 'Printful Exception: ' . $e->getMessage();
        var_export($pf->getLastResponseRaw());
    }

    // print_r($data);
}

?>
