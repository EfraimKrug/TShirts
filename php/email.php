<?php

$type = "";
$email = "";

if(array_key_exists('type', $_REQUEST)) $type = urldecode($_REQUEST['type']);
if(array_key_exists('email', $_REQUEST)) $email = urldecode($_REQUEST['email']);


function sendThanks($email){
  $to = $email;
  $subject = "Social Bonding";
  $message = "<html class='no-js' lang='en' dir='ltr'><head><meta charset='utf-8'/></head>
              <body>
              <div style='font-size:14px;background-color:#f98e3f;color:#87605c;width:500px;height:400px;padding:36px;'>
              Hi!
              <br>
              Thanks so much for ordering shirts from us!
              <br>
              We have sent the order to the warehouse, and they should start putting it together
              any moment!
              <br>
              We are currently looking for good stories about bridging the Physical distance
              gap and creating social bonding. If you have any, please share!
              <br>
              Best,
              <br>
              Efraim
              <!-- </center> -->
              </div>
              </body>
              </html>";

  $headers = "From: EfraimMKrug@GMail.com\r\n";
  $headers .= "Reply-To: EfraimMKrug@GMail.com\r\n";
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

  if(mail($to, $subject, $message, $headers)){
    return true;
  } else{
    return false;
  }
}


function sendOops($email){
  $to = $email;
  $subject = "Social Bonding";
  $message = "<html class='no-js' lang='en' dir='ltr'><head><meta charset='utf-8'/></head>
              <body>
              <div style='font-size:14px;background-color:#f98e3f;color:#87605c;width:500px;height:400px;padding:36px;'>
              Hi!
              <br>
              Thanks so much for ordering shirts from us!
              <br>
              Unfortuneately, something has gone wrong. Somehow the financials in your
              payment transaction did not match what we expected.
              <br>
              It's true computers have glitches, and make mistakes... if that is the case
              PLEASE call us or email us (hit reply) immediately to get this straightened out!
              <br>
              We are currently looking for good stories about bridging the Physical distance
              gap and creating social bonding. If you have any, please share!
              <br>
              Best,
              <br>
              Efraim
              <!-- </center> -->
              </div>
              </body>
              </html>";

  $headers = "From: EfraimMKrug@GMail.com\r\n";
  $headers .= "Reply-To: EfraimMKrug@GMail.com\r\n";
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

  if(mail($to, $subject, $message, $headers)){
    return true;
  } else{
    return false;
  }
}

if($type == "thanks"){
  sendThanks($email);
}

if($type == "oops"){
  sendOops($email);
}
?>
