<?php
error_reporting(E_ALL ^ E_WARNING); 

$day1->name = "Mon";
$day2->name = "Tues";
$day3->name = "Wed";

$myObj->name = "John";
$myObj->size = 19283;
$myObj->days = [$day1,$day2,$day3];

$day4->name = "Thursday";
$myObj->days[] = $day4;

$day4->name = "Friday";

echo "Following... is the answer\n";
$str = json_encode($myObj);
echo $str;


?>
