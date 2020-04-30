<?php

$itemArray = array();

$REQUEST['name'] = "Avroham";
$REQUEST['address1'] = "17 Corey Road";
$REQUEST['city'] = "Brighton";
$REQUEST['state_code'] = "MA";
$REQUEST['country_code'] = "US";
$REQUEST['zip'] = "02135";
$REQUEST['sync_variant_id'] = 123456789;
$REQUEST['sync_variant_id2'] = 987654321;
$REQUEST['quantity'] = 10;
$REQUEST['quantity2'] = 13;

$recipient->name = $REQUEST['name'];
$recipient->address1 = $REQUEST['address1'];
$recipient->city = $REQUEST['city'];
$recipient->state_code = $REQUEST['state_code'];
$recipient->country_code = $REQUEST['country_code'];
$recipient->zip = $REQUEST['zip'];

$itemArray[0]->sync_variant_id = $REQUEST['sync_variant_id'];
$itemArray[0]->quantity = $REQUEST['quantity'];

$itemArray[1]->sync_variant_id = $REQUEST['sync_variant_id2'];
$itemArray[1]->quantity = $REQUEST['quantity2'];

$data->items = $itemArray;
$data->recipient = $recipient;

echo json_encode($data, JSON_PRETTY_PRINT);
?>
