<?php
//require 'apiBase.php';
require 'apiTry.php';
$order = "";
echo "Try new stuff";

if(array_key_exists('order', $_REQUEST)) $ID = urldecode($_REQUEST['order']);

$order = '{"items":[{"variant_id":7239,"quantity":1,"files":[{"type":"default","url":"https://files.cdn.printful.com/files/11a/11a753954bafe6e8b3ae4e57b7d01ad0_preview.png"},{"type":"label_outside","url":"https://files.cdn.printful.com/files/429/429a29884baec5683237435bb7f9796d_preview.png"},{"type":"preview","url":"https://files.cdn.printful.com/files/fc6/fc63053438f0919c5bf250052cab2c93_preview.png"}]}],"recipient":{"name":"Shlomo Shmo","address1":"183 Honeydew Avenue","city":"Lawrence","state_code":"KS","country_code":"US","zip":"66045"}}';
$data = $order;

$apiKey = 'aj8lew54-qdnh-aam0:cswl-uizia5v89ov4';
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
