function dbGo(TableName, type, outDiv, parms, callback) {
  var phpProg = "";
  // console.log(TableName + "//" + type);
  if(type.toLowerCase() == "insert") phpProg = "cgi-bin/insert" + TableName + ".php";
  if(type.toLowerCase() == "update") phpProg = "cgi-bin/update" + TableName + ".php";
  if(type.toLowerCase() == "delete") phpProg = "cgi-bin/delete" + TableName + ".php";
  if(type.toLowerCase() == "select") phpProg = "cgi-bin/select" + TableName + ".php";
  // console.log([type, outDiv, parms, phpProg]);
  var xhttp;
  var returnVal;
  var outData = "";
  var func = "";

  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
      outData = this.responseText;
      outDiv.innerHTML = outData;
      if(typeof(callback) == 'function'){
        callback(outData);
      }
      returnVal = 0;
    }
    else
      returnVal = this.status;
  };

  // switch(TableName){
  //   case "SBOrders":          func = formatOrder; break;
  //   case "SBAccounts":        func = formatAccount; break;
  //   default:                  func = doNothing; break;
  // }
  // console.log(["before POST", type, outDiv, parms, phpProg]);
  // console.log(phpProg + "?" + parms);
  xhttp.open("POST", phpProg, true);
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhttp.send("S0c1al=B0nd1ng&" + parms);
}

//Cycle:
// Post order record (paidFlag = FALSE)
// Get OK from PayPal, post paidFlag = TRUE

// id is the primary key to the delivery address...
function formatOrder(accountID,targetID,shirtID,color,size,number,price,flag){
  var str = "accountID=" + accountID + "&targetID=" + targetID + "&shirtID=" + shirtID.replace("#","") + "&color=" + color.replace(" ","*") + "&size=" + size + "&number=" + number + "&price=" + price + "&flag=" + flag;
  return str;
}

function formatAccount(email, name, street, city, state, zip, country){
  var str = "email=" + email + "&name=" + name + "&street=" + street + "&city=" + city + "&state=" + state + "&zip=" + zip + "&country=" + country;
  return str;
}

function dbOrder(type, outDiv, parms, callback) {
  // console.log(parms);
  dbGo("SBOrders", type, outDiv, parms, callback);
}

// store two records - account (if necessary) and target (address)
function dbAccount(type, outDiv, parms, callback) {
  // console.log(parms);
  dbGo("SBAccounts", type, outDiv, parms, callback);
}

function ppLog(type, outDiv, parms, callback){
  // console.log([type, outDiv, parms]);
  dbGo("SBPayPal", type, outDiv, parms, callback);
}

function dbMail(type, outDiv, parms, callback){
  dbGo("SBMail", type, outDiv, parms, callback);
}
