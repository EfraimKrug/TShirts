<?php
require 'apiBase.php';

$FILE_NAME = "./api/productList.api";
$stillRequired = FALSE;

$apiKey = 'aj8lew54-qdnh-aam0:cswl-uizia5v89ov4';

$pf = new PrintfulApiClient($apiKey);
$oldProductList = file_get_contents($FILE_NAME);
if($oldProductList)
  echo json_encode(json_decode($oldProductList, true));
else {
  $stillRequired = TRUE;
}

try {

    $productList = $pf->get('sync/products');
    if($stillRequired) echo json_encode($productList);
    file_put_contents($FILE_NAME, json_encode($productList));

} catch (PrintfulApiException $e) { //API response status code was not successful
    echo 'Printful API Exception: ' . $e->getCode() . ' ' . $e->getMessage();
} catch (PrintfulException $e) { //API call failed
    echo 'Printful Exception: ' . $e->getMessage();
    var_export($pf->getLastResponseRaw());
}

?>
