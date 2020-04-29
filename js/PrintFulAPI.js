

// @param id: may function as an id or an entire object request
function apiCall(outDiv, callback, level="list", id=0) {
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
      parms = id;
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
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhttp.send(parms);
}
