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
              <div style='font-size:14px;color:maroon;width:500px;height:400px;padding:36px;'>
              Hi!
              <br><br>
              Thanks so much for ordering shirts from us!
              <br><br>
              We have sent the order to the warehouse, and they should start putting it together
              any moment!
              <br><br>
              We are currently looking for good stories about bridging the Physical distance
              gap and creating social bonding. If you have any, please share!
              <br><br>
              Best,
              <br><br>
              <a href='www.NameThatThing.site/PDSocialBonding.html'>Social Bonding</a><br><br>
              Efraim
              <!-- </center> -->
              </div>
              </body>
              </html>";

  $headers = "From: physicaldistancesocialbonding@gmail.com\r\n";
  $headers .= "Reply-To: physicaldistancesocialbonding@gmail.com\r\n";
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
              <div style='font-size:14px;color:maroon;width:500px;height:400px;padding:36px;'>
              Hi!
              <br><br>
              Thanks so much for ordering shirts from us!
              <br><br>
              Unfortuneately, something has gone wrong. Somehow the financials in your
              payment transaction did not match what we expected.
              <br><br>
              It's true computers have glitches, and make mistakes... if that is the case
              PLEASE call us or email us (hit reply) immediately to get this straightened out!
              <br><br>
              We are currently looking for good stories about bridging the Physical distance
              gap and creating social bonding. If you have any, please share!
              <br><br>
              Best,
              <br><br>
              <a href='www.NameThatThing.site/PDSocialBonding.html'>Social Bonding</a><br><br>
              Efraim
              <!-- </center> -->
              </div>
              </body>
              </html>";

  $headers = "From: physicaldistancesocialbonding@gmail.com\r\n";
  $headers .= "Reply-To: physicaldistancesocialbonding@gmail.com\r\n";
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

  if(mail($to, $subject, $message, $headers)){
    return true;
  } else{
    return false;
  }
}

function sendFollowUp01($email){
  $to = $email;
  $subject = "Social Bonding";
  $message = "<html class='no-js' lang='en' dir='ltr'><head><meta charset='utf-8'/></head>
              <body>
              <div style='font-size:14px;width:500px;height:400px;padding:36px;'>
              Hello!
              <br><br>
              Thanks so much for ordering shirts from us!
              <br><br>
              We are so delighted you have decided to take matters of Social Bondinginto your hands, and you have ordered a shirt.              I realize that you are hankering to get a shirt, and start wearing it andreaping the benefits of Social Bonding... but I do want to warn you that our order process has slowed down a little bit.
              <br><br>
              We have your order, and we are waiting for the warehouse to fullfill it. In the past, this process has taken about 10 days. Evidently,Shirts are not a high priority in this COVID stricken environment.
              <br><br>
              Again, thank you so much for your confidence,and we will keep you informed.
              <br><br>
              <a href='www.NameThatThing.site/PDSocialBonding.html'>Social Bonding</a><br><br>
              Best of the best,
              ~Efraim Krug
              <br><br>
              managing director
              <!-- </center> -->
              </div>
              </body>
              </html>";

  $headers = "From: physicaldistancesocialbonding@gmail.com\r\n";
  $headers .= "Reply-To: physicaldistancesocialbonding@gmail.com\r\n";
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

  if(mail($to, $subject, $message, $headers)){
    return true;
  } else{
    return false;
  }
}

function sendThanksEmail($SBMailFirst, $SBMailEmail){
  $to = $SBMailEmail;
  $subject = "Social Bonding (Mailing List)";
  $message = "<html class='no-js' lang='en' dir='ltr'><head><meta charset='utf-8'/></head>
              <body>
              <div style='font-size:14px;color:maroon;width:500px;height:400px;padding:36px;'>
              Hi $SBMailFirst,
              <br><br>
              Thanks so much for joining our mailing list!
              <br><br>
              As you may know, we are pretty enthusiastic about our website and
              what we are building. I hope you like it!
              <br><br>
              If you have any suggestions, thoughts, whatever... please share!
              <br><br>
              Oh, and if please click on this link to confirm that you are a real person!
              <br><a href='https://NameThatThing.site/cgi-bin/confirmEmail.php?email=$SBMailEmail'>Confirmation Link...</a>
              <br><br>
              Best of the best,
              <br><br>
              <a href='www.NameThatThing.site/PDSocialBonding.html'>Social Bonding</a><br><br>
              Efraim
              <!-- </center> -->
              </div>
              </body>
              </html>";

  $headers = "From: physicaldistancesocialbonding@gmail.com\r\n";
  $headers .= "Reply-To: physicaldistancesocialbonding@gmail.com\r\n";
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

if($type == "FUCOVID"){
  sendFollowUp01($email);
}

?>
