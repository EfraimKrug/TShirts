

var holdOrderForLater = "";
function apiCall(callback, level="list", id=0) {
  headerParam = "application/x-www-form-urlencoded";
  if(level == "variants") return;
  var phpProg = "";
  var parms = "";
  if(level == "list") phpProg = "cgi-bin/apiProductListStuff.php";
  if(level == "product"){
      phpProg = "cgi-bin/apiProductStuff.php";
      parms = "ID=" + id;
    }
  if(level == "variant"){
      phpProg = "cgi-bin/apiVariantStuff.php";
      parms = "ID=" + id;
    }
  if(level == "files"){
      phpProg = "cgi-bin/apiETCStuff.php";
      parms = "path=files&ID=" + id;
    }
  if(level == "estimate"){
      phpProg = "cgi-bin/apiOrderEstimateStuff.php";
      parms = JSON.stringify(id);
      parms = parms.replace(/{/g, "[~").replace(/}/g,"~]");
      holdOrderForLater = parms;
    }
  if(level == "order"){
      phpProg = "cgi-bin/apiOrderStuff.php";
      if(holdOrderForLater){
        parms = holdOrderForLater;
        holdOrderForLater = "";
      }
    }
  if(level == "countries"){
      phpProg = "cgi-bin/apiCountriesStuff.php";
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
  xhttp.send(parms);
}
