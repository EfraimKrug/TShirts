<?php
require 'apiBaseStuff.php';
require 'apikyStuff.php';

$stillRequired = FALSE;
$ID = 0;

if(array_key_exists('ID', $_REQUEST)) $ID = urldecode($_REQUEST['ID']);
$FILE_NAME = "./api/product" . $ID . ".api";

$pf = new PrintfulApiClient($apiKey);

$oldProduct = file_get_contents($FILE_NAME);
if($oldProduct)
  echo json_encode(json_decode($oldProduct, true));
else {
  $stillRequired = TRUE;
}

try {

    $product = $pf->get('sync/products/' . $ID);
    if($stillRequired) echo json_encode($product);
    file_put_contents($FILE_NAME, json_encode($product));

} catch (PrintfulApiException $e) { //API response status code was not successful
    echo 'Printful API Exception: ' . $e->getCode() . ' ' . $e->getMessage();
} catch (PrintfulException $e) { //API call failed
    echo 'Printful Exception: ' . $e->getMessage();
    var_export($pf->getLastResponseRaw());
}

?>
