<?php
require 'apiBase.php';
require 'apiky.php';

$ID = 0;

if(array_key_exists('ID', $_REQUEST)) $ID = urldecode($_REQUEST['ID']);

$pf = new PrintfulApiClient($apiKey);
try {

    $product = $pf->get('sync/variant/' . $ID);
    echo json_encode($product);

} catch (PrintfulApiException $e) { //API response status code was not successful
    echo 'Printful API Exception: ' . $e->getCode() . ' ' . $e->getMessage();
} catch (PrintfulException $e) { //API call failed
    echo 'Printful Exception: ' . $e->getMessage();
    var_export($pf->getLastResponseRaw());
}

?>
