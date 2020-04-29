<?php
// sending headers...
function callAPI($method, $url, $data, $headers = false){
   $curl = curl_init();
   switch ($method){
      ...
   }
   // OPTIONS:
   curl_setopt($curl, CURLOPT_URL, $url);
   if(!$headers){
       curl_setopt($curl, CURLOPT_HTTPHEADER, array(
          'APIKEY: 111111111111111111111',
          'Content-Type: application/json',
       ));
   }else{
       curl_setopt($curl, CURLOPT_HTTPHEADER, array(
          'APIKEY: 111111111111111111111',
          'Content-Type: application/json',
          $headers
       ));
   }
   curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
   curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
   // EXECUTE:
   ...
}

$one_month_ago = date("Y-m-d", strtotime(date("Y-m-d", strtotime(date("Y-m-d"))) . "-1 month"));
$rent_header = 'Search: and[][created][greater]=' . $one_month_ago . '%and[][created][less]=' . date('Y-m-d') . '%';
//the actual call with custom search header
$make_call = callAPI('GET', 'https://api.example.com/get_url/', false, $rent_header);
?>
