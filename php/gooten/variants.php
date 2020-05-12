<?php
$recipeID = "24b1fa99-6941-4a41-a003-a400be82ecc9";
//all products
$url001 = "https://api.print.io/api/v/5/source/api/products/?recipeid=".$recipeID."&languageCode=en&countryCode=US&all=true";
//all variants for productID
// $url002 = "https://api.print.io/api/v/5/source/api/productvariants/?recipeid=".$recipeID."&countryCode=US&productId=57&version=5&source=api&all=false&languageCode=en&currencyCode=USD";
$url002 = "https://api.print.io/api/v/5/source/api/productvariants/?recipeid=".$recipeID."&countryCode=US&productId=4122598991&version=5&source=api&all=false&languageCode=en&currencyCode=USD";
//listing of my product... but not much info.
$url003 = "https://api.print.io/api/v/5/source/api/prpproducts/?recipeid=".$recipeID."&page=1";
//didn't work!
$utl004 = "https://api.print.io/api/v/5/source/api/producttemplates/?recipeid=".$recipeID."&languageCode=en&sku=Apparel-DTG-Hoodie-Gildan-18500-2XL-Ash-Mens-CFCB";
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => $url001,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
    "content-type: application/json"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

echo "<h1>Testing api work... and more</h1>";
if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
