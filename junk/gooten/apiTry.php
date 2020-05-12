<?php
// gets a whole lot of product... like everything they have!
        echo "<h1>API to Gooten...</h1>";
        $recipeID = "24b1fa99-6941-4a41-a003-a400be82ecc9";
        // create curl resource
        $ch = curl_init();

        // set url
        curl_setopt($ch, CURLOPT_URL, "https://api.print.io/api/v/5/source/api/products/?recipeid=".$recipeID."&languageCode=en&countryCode=US&all=true");
        curl_setopt($ch, CURLOPT_HEADER, 'content-type: application/json');
        //return the transfer as a string
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        // $output contains the output string
        $output = curl_exec($ch);
        $json = json_decode($output);
        // foreach($json as $product){
        //   echo $output[$product];
        // }
        // $x = $json->Products[0]->UId;
        $x = $json->Products[0];
        echo "<pre>";
        // var_dump($x);
        echo "</pre>";
        foreach($json->Products[0] as $key => $value ){
          if(is_object($value)){
            echo "<br> ~~~ $key ~~~~ ";
            foreach ($value as $k => $v){
              echo "<br> ====== > " . $k . " -> " . $v;
            }
          } else {
            if(is_array($value)){
                echo "<br> ~~~ $key ~~~~ ";
                foreach ($value as $obj){
                  foreach ($obj as $ky => $vl){
                    echo "<br> ====== > (" . $ky . ") " . $vl;
                  }
                }
            } else {
            echo "<br>" . $key . " => " . $value;
          }
        }
      }
        // foreach($json->Products[0] as $key => $value ){
        //   echo "<br>" . $key . " => " . $value;
        // }

        // close curl resource to free up system resources
        curl_close($ch);
?>
