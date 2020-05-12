<?php

error_reporting(E_ALL ^ E_WARNING); 

$itemArr = [];

for($i=0; $i < 5; $i++){
    $itemArr[$i]->name = "day" . $i;
}

$obj->BigName = "Days";
$obj->Title = "Big Cheese";
$obj->Items = $itemArr;


echo json_encode($obj,JSON_PRETTY_PRINT);

?>
