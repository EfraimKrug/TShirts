<?php
require 'apiBase.php';
require 'apiky.php';
// require 'apiTry.php';
//liana S. at printful - customer service...  liana@printful.com
//

$itemArray = [];

$recipient->name = $_REQUEST['name'];
$recipient->address1 = $_REQUEST['address1'];
$recipient->city = $_REQUEST['city'];
$recipient->state_code = $_REQUEST['state_code'];
$recipient->country_code = $_REQUEST['country_code'];
$recipient->zip = $_REQUEST['zip'];

$itemArray[0]->sync_variant_id = (int)$_REQUEST['sync_variant_id'];
$itemArray[0]->quantity = (int)$_REQUEST['quantity'];

$itemArray[1]->sync_variant_id = (int)$_REQUEST['sync_variant_id'];
$itemArray[1]->quantity = (int)$_REQUEST['quantity'];

$data->recipient = $recipient;
$data->items = $itemArray;

$pf = new PrintfulApiClient($apiKey);
try {
    $estimate = $pf->post('orders/estimate-costs', $data);
    echo json_encode($estimate);

} catch (PrintfulApiException $e) { //API response status code was not successful
    echo 'Printful API Exception: ' . $e->getCode() . ' ' . $e->getMessage();
} catch (PrintfulException $e) { //API call failed
    echo 'Printful Exception: ' . $e->getMessage();
    var_export($pf->getLastResponseRaw());
}

?>
