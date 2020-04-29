<?php
require 'apiBase.php';
$FILE_NAME = "./api/countries.api";

$apiKey = 'aj8lew54-qdnh-aam0:cswl-uizia5v89ov4';
$pf = new PrintfulApiClient($apiKey);


try {

    $countries = $pf->get('countries');
    echo json_encode($countries);
    file_put_contents($FILE_NAME, json_encode($countries));

} catch (PrintfulApiException $e) { //API response status code was not successful
    echo 'Printful API Exception: ' . $e->getCode() . ' ' . $e->getMessage();
} catch (PrintfulException $e) { //API call failed
    echo 'Printful Exception: ' . $e->getMessage();
    var_export($pf->getLastResponseRaw());
}

?>
