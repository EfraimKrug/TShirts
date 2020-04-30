<?php
$obj = array(
        "recipient" => array(
                "name" => "Joe Goon",
                "address1" => "12 Cummings Road",
                "city" => "Brighton",
                "state_code" => "MA",
                "country_code" => "US",
                "zip" => "02134"
              ),
        "items" => array (
            array (
              "sync_variant_id" => 1845887351,
              "quantity" => 3
            ),
            array (
              "sync_variant_id" => 1844711751,
              "quantity" => 2
              )
      )
  );

echo $obj["recipient"]["name"] . "\n";
echo $obj["recipient"]["country_code"] . "\n";
echo $obj["items"][0]["sync_variant_id"] . "\n";

// echo json_encode($obj);
// print_r($obj);
?>
