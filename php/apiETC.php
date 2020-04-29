<?php
require 'apiBase.php';

$ID = 0;
$path = "";

if(array_key_exists('path', $_REQUEST)) $path = urldecode($_REQUEST['path']);
if(array_key_exists('ID', $_REQUEST)) $ID = urldecode($_REQUEST['ID']);

$apiKey = 'aj8lew54-qdnh-aam0:cswl-uizia5v89ov4';
$pf = new PrintfulApiClient($apiKey);
try {

    if($ID) $etc = $pf->get($path . "/" . $ID);
    else
       $etc = $pf->get($path);

    echo json_encode($etc);

} catch (PrintfulApiException $e) { //API response status code was not successful
    echo 'Printful API Exception: ' . $e->getCode() . ' ' . $e->getMessage();
} catch (PrintfulException $e) { //API call failed
    echo 'Printful Exception: ' . $e->getMessage();
    var_export($pf->getLastResponseRaw());
}

?>
