////////////////////////////////////////////////////////////
//This code is presenting the form to accept name/email
//and then storing the info in the database. Then we
//present the paypal screen...
//

//////////////////////////////////////////////////////////////////////////
//getReadyForPayPal - submit form with customer info
//@param flag determines if form has been canceled or not.
//  flag => false: form is closed
//  flag => true: from is opened
//
function getReadyForPayPal(flag){
  //Form submit/cancel... freeze until order is complete
  if(PAYMENT_BEING_PROCESSED) return;

  var dataGather = document.getElementById("dataGather");
  var shoppingTable = document.getElementById("shoppingTable");

  var dGSubmit = document.getElementById("dGSubmit");
  var dGCancel = document.getElementById("dGCancel");

  if(!flag){
    dataGather.style.visibility = "hidden";
    return;
  }
  var merch = [];
  var dataVerified = true;

  var numberItems = 0;
  for (var r=1; r < shoppingTable.rows.length-1; r++){
    numberItems += parseInt(shoppingTable.rows[r].cells[1].innerHTML);

    itemName = shoppingTable.rows[r].cells[0].innerHTML;
    itemName = itemName.substring(itemName.indexOf(">")+1,itemName.lastIndexOf("<"));
    merch.push([itemName,shoppingTable.rows[r].cells[1].innerHTML,shoppingTable.rows[r].cells[2].innerHTML,shoppingTable.rows[r].cells[3].innerHTML,shoppingTable.rows[r].cells[6].innerHTML,shoppingTable.rows[r].cells[5].innerHTML]);
  }

  /////////////////////////// validate data ...
  var dGName = document.getElementById("dGName");
  var dGEMail = document.getElementById("dGEMail");
  var dGVerEMail = document.getElementById("dGVerEMail");

  dGName.style.border = "";
  if (!verifyNameData()){
    dGName.style.border = "2px solid red";
    dataVerified = false;
  }

  dGMName.style.border = "";
  dGEMail.style.border = "";
  dGVerEMail.style.border = "";

  if (!verifyEmailData()){
    dGEMail.style.border = "2px solid red";
    dGVerEMail.style.border = "2px solid red";
    dataVerified = false;
  }

  var dGAddress4 = document.getElementById("dGAddress4");
  var dGAddress5 = document.getElementById("dGAddress5");
  var dGAddress6 = document.getElementById("dGAddress6");
  var dGAddress7 = document.getElementById("dGAddress7");
  var dGAddress8 = document.getElementById("dGAddress8");

  dGAddress4.style.border = "";
  dGAddress5.style.border = "";
  dGAddress6.style.border = "";
  dGAddress7.style.border = "";
  dGAddress8.style.border = "";

  if (!verifyBillingData()){
    dGAddress4.style.border = "2px solid red";
    dGAddress5.style.border = "2px solid red";
    dGAddress6.style.border = "2px solid red";
    dGAddress7.style.border = "2px solid red";
    dGAddress8.style.border = "2px solid red";
    dataVerified = false;
  }

  /////////////////// data is validated and good...
  // get info and organize the order...
  //
  if (dataVerified){
    var totalCart = document.getElementById("total");
    var PPprice = document.getElementById("PPprice");
    var PPnumber = document.getElementById("PPnumber");
    var totalAmt = calcShoppingCartTotal(0);

    PPprice.innerHTML = "$" + totalAmt;
    PPnumber.innerHTML = " for " + numberItems + " items <br>Please check your email for verification.";
    // including shipping charges...
    otherCharges = getOtherCharges(dGEMail.value, merch, dGMName.value, dGAddress4.value, dGAddress5.value, dGAddress6.options[dGAddress6.selectedIndex].value, dGAddress7.value, dGAddress8.options[dGAddress8.selectedIndex].value, storeAndChargeF);
  }
}

////////////////////////////////////////////////////////////////////////sel.options[sel.selectedIndex].text
//storeAndChargeF - call back function from api call for order estimate
//
function storeAndChargeF(outShippingData){
  parms = storeAndChargePass;

  var outShipping = JSON.parse(outShippingData);
  var tax = outShipping.costs.tax;
  var shippingCharge = outShipping.costs.shipping;

  PAYMENT_BEING_PROCESSED = true;

  storeAccount(parms[0],parms[1],parms[2],parms[3],parms[4],parms[5],parms[6],parms[7],parms[8]);

  paypalElt = document.getElementById("paypalElt");
  paypalElt.style.display="block";
  var totalAmt = calcShoppingCartTotal(0);

  document.getElementById("PPsubTotal").innerHTML = " sub total: " + addDecimal(totalAmt) + " ";
  document.getElementById("PPshipping").innerHTML = " shipping: " + addDecimal(shippingCharge) + " ";
  document.getElementById("PPtax").innerHTML = " tax: " + addDecimal(tax) + " ";

  var grandTotal = ((totalAmt * 100) + (shippingCharge * 100) + (tax * 100))/100;
  setUpPayPal(grandTotal, parms[0]);
}

/////////////////////////////////////////////////////////////
//stateExclude - serves to filter states
//@param code - 2 letter state code
//@return true/false
//
function stateExclude(code){
    var excludeList = ["AA","AE","AP","AS","FM","GU"];
    for(var i=0; i < excludeList.length; i++){
      if(code == excludeList[i]) return true;
    }
    return false;
}

/////////////////////////////////////////////////////////////
//moveCountryData - serves to filter states
//@param code - 2 letter state code
//@return true/false
//
function moveCountryData(countryData){
  countryList = JSON.parse(countryData);
  dGAddress6 = document.getElementById("dGAddress6");
  dGAddress8 = document.getElementById("dGAddress8");
  var us_index = 0;
  for(var i=0; i < countryList.length; i++){
    if(countryList[i]["code"] == "US"){
      us_index = i;
      break;
    }
  }

  for(var i=0; i < countryList[us_index]["states"].length; i++){
    if(stateExclude(countryList[us_index]["states"][i]["code"])) continue;
    var option = document.createElement("option");
    option.text = countryList[us_index]["states"][i]["name"];
    option.value = countryList[us_index]["states"][i]["code"];
    dGAddress6.add(option);
  }

  CountryInclude = [{"country":"United States", "code":"US"}, {"country":"Israel", "code":"IS"}];
  for(var i=0; i < CountryInclude.length; i++){
    option = document.createElement("option");
    option.text = CountryInclude[i]["country"];
    option.value = CountryInclude[i]["code"];
    dGAddress8.add(option);
  }

  dGAddress6.selectedIndex = 0;
  dGAddress8.selectedIndex = 0;
}


////////////////////////////////////////////////////////////////////
//getCustomerInfo - open form to get name/email info
//form click launches dataGather process...getReadyForPayPal()
function getCustomerInfo(){
  if (!calcShoppingCartTotal()) return;
  var totalCart = document.getElementById("total");
  var dataGather = document.getElementById("dataGather");
  var payButton = document.getElementById("payButton");

  var totalPay = totalCart.innerHTML;
  dataGather.style.visibility = "visible";

  var dGName = document.getElementById("dGName");
  var dGEMail = document.getElementById("dGEMail");
  var dGVerEMail = document.getElementById("dGVerEMail");

  var dGMName = document.getElementById("dGMName");
  var dGAddress4 = document.getElementById("dGAddress4");
  var dGAddress5 = document.getElementById("dGAddress5");
  var dGAddress6 = document.getElementById("dGAddress6");
  var dGAddress7 = document.getElementById("dGAddress7");
  var dGAddress8 = document.getElementById("dGAddress8");

  dGName.value = "";
  dGEMail.value = "";
  dGVerEMail.value = "";

  dGMName.value = "";
  dGAddress4.value = "";
  dGAddress5.value = "";
  dGAddress6.value = "";
  dGAddress7.value = "";
  dGAddress8.value = "";

  payButton.disabled = true;
  payButton.style.visible = "hidden";
}

//////////////////////////////////////////////////////////////////
//Data Verification - from form...
//Mostly we need to make sure the emails work...
//
//////////////////////////////////////////////////////////////////
//verifyNameData
function verifyNameData(){
  var dGName = document.getElementById("dGName");
  var dGMName = document.getElementById("dGMName");
  if (dGMName.value.length < 1 && dGName.value.length > 0){
    dGMName.value = dGName.value;
  }
  if (dGName.value.length > 0) return true;
  return false;
}
//////////////////////////////////////////////////////////////////
//verifyEmailData
function verifyEmailData(){
  var dGEMail = document.getElementById("dGEMail");
  var dGVerEMail = document.getElementById("dGVerEMail");
  if (dGEMail.value.toLowerCase() == dGVerEMail.value.toLowerCase() && dGEMail.value.length > 0) return true;
  return false;
}
//////////////////////////////////////////////////////////////////
//verifyBillingData
function verifyBillingData(){
  var dGAddress4 = document.getElementById("dGAddress4");
  var dGAddress5 = document.getElementById("dGAddress5");
  var dGAddress6 = document.getElementById("dGAddress6");
  var dGAddress7 = document.getElementById("dGAddress7");
  var dGAddress8 = document.getElementById("dGAddress8");

  if (dGAddress4.value.length > 0 &&
      dGAddress5.value.length > 0 &&
      dGAddress6.selectedIndex > 0 &&
      dGAddress7.value.length > 0 &&
      dGAddress8.value.length > 0 ) return true;

  return false;

}
//////////////////////////////////////////////////////////////////
// first store data - and get primary key - done
// pass primary key/amount to goToPayPal
// accept payment
// if payment works and everything is good
//  mark the record paid (with date)
// send record to T-Shirt web site... (api) - this is next...
// need better background for order page...
//////////////////////////////////////////////////////////////////////////
// database work - storing the customer info and the order info
// every customer is their own account
//
//////////////////////////////////////////////////////////////////////////
//storeOrder
// takes order info from the shopping cart and stores it in the database
//
var merchPass = [];
function storeOrder(){
  var outDiv = document.getElementById("outdiv");
  var orderWork = document.getElementById("orderWork");
  var info = JSON.parse(outDiv.innerHTML);
  orderIDCollection = [];
  for (var row=0; row < merchPass.length; row++){
    sendString = formatOrder(info.accountID,info.targetID,merchPass[row][4],merchPass[row][5],merchPass[row][2],merchPass[row][1],merchPass[row][3],"false");
    dbOrder("insert", orderWork, sendString.replace(/\s/g,""), function(){});
  }
}

//////////////////////////////////////////////////////////////////////////
//storeAccount
// takes account info from the shopping cart and stores it in the database
//
function storeAccount(email, merch, flag, name, street, city, state, zip, country){
  var outDiv = document.getElementById("outdiv");
  merchPass = merch;
  var parms = formatAccount(email, name, street, city, state, zip, country);
  dbAccount("insert", outDiv, parms, storeOrder);
}

//////////////////////////////////////////////////////////////////////////
//formatOrderAPI
//@param data - information from the shopping cart
//@return - information formulated for PrintFul API
//
function formatOrderAPI(data){
  var shippingData ={};
  var gather = [];
  var merch = data[1];

  for(entry in merch){
    var id = merch[entry][4];
        gather.push ({
              "sync_variant_id":id,
              "quantity":parseInt(merch[entry][1]),
          });
      }

  shippingData.recipient = {
        "name":storeAndChargePass[3],
        "address1":storeAndChargePass[4],
        "city":storeAndChargePass[5],
        "state_code":storeAndChargePass[6],
        "country_code":storeAndChargePass[8],
        "zip":storeAndChargePass[7]
    };

  shippingData.items = gather;

  return shippingData;
}

/////////////////////////////////////////////////////////////////////////
//fromOrderString
//@param data - returned object from formatOrderAPI above
//@return string - ready to pass to php as a $_POST string
//                  I am passing this to php as a flat string...
//                  In php it is built back into an object
function fromOrderString(data){
  var dataString = "name=" + data.recipient.name;
  dataString += "&address1=" + data.recipient.address1;
  dataString += "&city=" + data.recipient.city;
  dataString += "&state_code=" + data.recipient.state_code;
  dataString += "&country_code=" + data.recipient.country_code;
  dataString += "&zip=" + data.recipient.zip;
  for (var i=0; i < data.items.length; i++){
    if(!i){
      dataString += "&sync_variant_id=" + data.items[0].sync_variant_id;
      dataString += "&quantity=" + data.items[0].quantity;
    } else {
      dataString += "&sync_variant_id" + i + "=" + data.items[i].sync_variant_id;
      dataString += "&quantity" + i + "=" + data.items[i].quantity;
    }
  }
  return dataString;
}
/////////////////////////////////////////////////////////////////////////
//this variable is only used between this function and "storeAndChargeF"
/////////////////////////////////////////////////////////////////////////
//getOtherCharges organizes all the charges to present to customer
//@param -
//final call: getOrderEstimate - shipping data - and then callback:storeAndChargeF()
//
var storeAndChargePass = [];
function getOtherCharges(email,merch,toName,street,city,state,zip,country,callback){
  // console.log("getOtherCharges");
  //storeAndChargePass = [email,merch,false,toName,street,city,state,zip,country,subTotal,shippingCharge,tax];
  storeAndChargePass = [email,merch,false,toName,street,city,state,zip,country];
  data = formatOrderAPI(storeAndChargePass);
  // console.log(data);
  dataString = fromOrderString(data);
  getPFApiData(function(){}).getOrderEstimate(dataString, callback);
}
