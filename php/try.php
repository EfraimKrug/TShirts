<?php

$returnVar = '{"id":36042292,"external_id":null,"store":4481704,"status":"draft","error":null,"errorCode":0,"shipping":"STANDARD","shipping_service_name":"Flat Rate (3-4 business days after fulfillment)","created":1590932400,"updated":1590932400,"recipient":{"name":"Wayne London","company":null,"address1":"26 Embassy Rd","address2":null,"city":"Brighton","state_code":"MA","state_name":"Massachusetts","country_code":"US","country_name":"United States","zip":"02135","phone":null,"email":null},"notes":null,"items":[{"id":20354100,"external_id":null,"variant_id":565,"sync_variant_id":1934687135,"external_variant_id":"5ebac657e2f3c1","quantity":1,"price":"7.95","retail_price":null,"name":"Short-Sleeve Unisex T-Shirt - Sport Grey \/ L","product":{"variant_id":565,"product_id":12,"image":"https:\/\/files.cdn.printful.com\/products\/12\/565_1538549641.jpg","name":"Gildan 64000 Unisex Softstyle T-Shirt with Tear Away (Sport Grey \/ L)"},"files":[{"id":191418978,"type":"default","hash":"11a753954bafe6e8b3ae4e57b7d01ad0","url":null,"filename":"4Lines0006.png","mime_type":"image\/png","size":87254,"width":3608,"height":2788,"dpi":225,"status":"ok","created":1587581703,"thumbnail_url":"https:\/\/files.cdn.printful.com\/files\/11a\/11a753954bafe6e8b3ae4e57b7d01ad0_thumb.png","preview_url":"https:\/\/files.cdn.printful.com\/files\/11a\/11a753954bafe6e8b3ae4e57b7d01ad0_preview.png","visible":true},{"id":205625280,"type":"preview","hash":"fd71139c5bf75e6a35a46769fa2f2fa9","url":null,"filename":"mockup-eeb0afd3.png","mime_type":"image\/png","size":834067,"width":1000,"height":1000,"dpi":null,"status":"ok","created":1590608290,"thumbnail_url":"https:\/\/files.cdn.printful.com\/files\/fd7\/fd71139c5bf75e6a35a46769fa2f2fa9_thumb.png","preview_url":"https:\/\/files.cdn.printful.com\/files\/fd7\/fd71139c5bf75e6a35a46769fa2f2fa9_preview.png","visible":false}],"options":[{"id":"embroidery_type","value":"flat"},{"id":"thread_colors","value":[]},{"id":"text_thread_colors","value":[]},{"id":"thread_colors_3d","value":[]},{"id":"thread_colors_chest_left","value":[]},{"id":"text_thread_colors_chest_left","value":[]},{"id":"thread_colors_chest_center","value":[]},{"id":"text_thread_colors_chest_center","value":[]}],"sku":null,"discontinued":false,"out_of_stock_eu":false,"out_of_stock":false}],"incomplete_items":[],"is_sample":false,"needs_approval":false,"not_synced":false,"has_discontinued_items":false,"can_change_hold":false,"costs":{"currency":"USD","subtotal":"7.95","discount":"0.00","shipping":"3.99","digitization":"0.00","additional_fee":"0.00","fulfillment_fee":"0.00","tax":"0.00","vat":"0.00","total":"11.94"},"retail_costs":{"currency":"USD","subtotal":null,"discount":null,"shipping":null,"tax":null,"vat":null,"total":null},"shipments":[],"gift":null,"packing_slip":null,"dashboard_url":"https:\/\/www.printful.com\/dashboard?order_id=36042292"}';

$jsonReturnVal = json_decode($returnVar);

// if(array_key_exists('amtPaid', $_REQUEST)) $amtPaid = $_REQUEST['amtPaid'];
// if(array_key_exists('pmtStatus', $_REQUEST)) $pmtStatus = $_REQUEST['pmtStatus'];
// if(array_key_exists('firstName', $_REQUEST)) $firstName = $_REQUEST['firstName'];
// if(array_key_exists('lastName', $_REQUEST)) $lastName = $_REQUEST['lastName'];
// if(array_key_exists('email', $_REQUEST)) $email = $_REQUEST['email'];
// if(array_key_exists('address_line_1', $_REQUEST)) $address_line_1 = $_REQUEST['address_line_1'];
// if(array_key_exists('address_line_2', $_REQUEST)) $address_line_2 = $_REQUEST['address_line_2'];
// if(array_key_exists('city', $_REQUEST)) $city = $_REQUEST['city'];
// if(array_key_exists('state', $_REQUEST)) $state = $_REQUEST['state'];
// if(array_key_exists('postal_code', $_REQUEST)) $postal_code = $_REQUEST['postal_code'];
// if(array_key_exists('country_code', $_REQUEST)) $country_code = $_REQUEST['country_code'];
// if(array_key_exists('reference_id', $_REQUEST)) $reference_id = $_REQUEST['reference_id'];
// if(array_key_exists('id', $_REQUEST)) $id = $_REQUEST['id'];
// if(array_key_exists('totalCharged', $_REQUEST)) $totalCharged = $_REQUEST['totalCharged'];
// if(array_key_exists('oldEmail', $_REQUEST)) $oldEmail = $_REQUEST['oldEmail'];

// foreach ($jsonReturnVal as $val){
  echo("\n\n===>");
  echo ("\n" . $jsonReturnVal->id);
  echo ("\n" . $jsonReturnVal->status);
  echo ("\n" . $jsonReturnVal->recipient->name);
  echo ("\n" . $jsonReturnVal->recipient->address1);
  echo ("\n" . $jsonReturnVal->recipient->city);
  echo ("\n" . $jsonReturnVal->recipient->state_code);
  echo ("\n" . $jsonReturnVal->recipient->country_code);
  echo ("\n" . $jsonReturnVal->recipient->zip);
  echo ("\n>" . $jsonReturnVal->recipient->city);
  echo ("\n" . $jsonReturnVal->costs->total);

  echo("<pre>");
  print_r($jsonReturnVal);
  echo("</pre>");

// }

?>
