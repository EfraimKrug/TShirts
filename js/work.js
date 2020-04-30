<html>
<head>
</head>
<body>
<h1>Working... </h1>
<div id=outDiv></div>
<script>


function apiCall(outDiv, callback, level="list", id=0) {
  // console.log("apiCall:" + level);
  // console.log(id);
  headerParam = "application/x-www-form-urlencoded";
  if(level == "variants") return;
  var phpProg = "";
  var parms = "";
  if(level == "list") phpProg = "cgi-bin/apiProductList.php";
  if(level == "product"){
      phpProg = "cgi-bin/apiProduct.php";
      parms = "ID=" + id;
    }
  if(level == "variant"){
      phpProg = "cgi-bin/apiVariant.php";
      parms = "ID=" + id;
    }
  if(level == "files"){
      phpProg = "cgi-bin/apiETC.php";
      parms = "path=files&ID=" + id;
    }
  if(level == "estimate"){
      phpProg = "cgi-bin/apiOrderEstimate.php";
      // headerParam = "application/json;charset=UTF-8";
      parms = JSON.stringify(id);
      parms = '[~"recipient":[~"name":"Becky Ashland","address1":"1928 Sickamore Road","city":"Lawrence","state_code":"KS","country_code":"US","zip":"66044"~],"items":[[~"sync_variant_id":1846018106,"quantity":4~],[~"sync_variant_id":1845887351,"quantity":3~],[~"sync_variant_id":1844711751,"quantity":2~]]~]';
      parms = parms.replace(/{/g, "[~").replace(/}/g,"~]");
    }
  if(level == "countries"){
      phpProg = "cgi-bin/apiCountries.php";
      parms = "";
    }


  var xhttp;
  var returnVal;
  var outData = "";
  var func = "";

  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
      outData = this.responseText;
      outDiv.innerHTML = outData;
      if (outData.indexOf("Exception") < 0){
        if(typeof(callback) == 'function'){
          callback(outData);
        }
      }
      returnVal = 0;
    }
    else
      returnVal = this.status;
  };

  xhttp.open("POST", phpProg, true);
  xhttp.setRequestHeader("Content-Type", headerParam);
  console.log(parms);
  xhttp.send(parms);
}

var p = '[~"recipient":[~"name":"Becky Ashland","address1":"1928 Sickamore Road","city":"Lawrence","state_code":"KS","country_code":"US","zip":"66044"~],"items":[[~"sync_variant_id":1846018106,"quantity":4~],[~"sync_variant_id":1845887351,"quantity":3~],[~"sync_variant_id":1844711751,"quantity":2~]]~]';
outDiv = document.getElementById("outDiv");
