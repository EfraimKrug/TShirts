<?php
$data_array =  array(
   "amount" => (string)($lease['amount'] / $tenant_count)
);
$update_plan = callAPI('PUT', 'https://api.example.com/put_url/'.$lease['plan_id'], json_encode($data_array));
$response = json_decode($update_plan, true);
$errors = $response['response']['errors'];
$data = $response['response']['data'][0];
?>
