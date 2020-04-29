//<!-- shopping cart manipulation -->

function calcShoppingCartTotal(formatFlag){
  var shoppingCart = document.getElementById("shoppingCart");
  var payTotal = 0.00;
  for (var r=1; r < shoppingTable.rows.length; r++){
    payTotal += parseInt(shoppingTable.rows[r].cells[4].innerHTML * 100);
  }

  if(formatFlag) return "Total: $" + addDecimal(payTotal/100);
  return addDecimal(payTotal/100);
}

function decreaseBuy(lineMark){
  if (PAYMENT_BEING_PROCESSED) return;
  var shoppingCart = document.getElementById("shoppingCart");
  var lineNum = shoppingTable.rows.length - lineMark + 1;
  var totalCart = document.getElementById("total");
  // alert(lineNum);
  if (shoppingTable.rows[lineNum].cells[1].innerHTML > 0){
    shoppingTable.rows[lineNum].cells[1].innerHTML = parseInt(shoppingTable.rows[lineNum].cells[1].innerHTML) - 1;
    cost = shoppingTable.rows[lineNum].cells[3].innerHTML * 100;
    price = shoppingTable.rows[lineNum].cells[1].innerHTML * cost;
    price /= 100;
    shoppingTable.rows[lineNum].cells[4].innerHTML = addDecimal(price);
  }
  // alert(shoppingTable.rows[lineNum].cells[1].innerHTML);
  totalCart.innerHTML = calcShoppingCartTotal(true);
  // var payTotal = calcShoppingCartTotal();
  // totalCart.innerHTML = "Total: $" + addDecimal(payTotal/100);
}

function addDecimal(num){
  s = "" + num;
  if(s.indexOf(".") < 0){
    s = s + ".00";
  } else {
    if(s.substring(s.indexOf(".")).length < 3){
      s = s + "0";
    }
  }
return s;
}

var cartHeight = 10;
function addLine(type, count, size, price, prodID, color){
  if(PAYMENT_BEING_PROCESSED) return;
  var shoppingTable = document.getElementById("shoppingTable");
  var shoppingCart = document.getElementById("shoppingCart");
  var totalCart = document.getElementById("total");
  shoppingCart.style.visibility = "visible";

  var row = shoppingTable.insertRow(1);
  var cell0 = row.insertCell(0);
  var cell1 = row.insertCell(1);
  var cell2 = row.insertCell(2);
  var cell3 = row.insertCell(3);
  var cell4 = row.insertCell(4);
  var cell5 = row.insertCell(5);
  var cell6 = row.insertCell(6);

  cell6.style.visibility = 'hidden';

  var p = price.replace("$","");
  var total = p * count;
  total *= 100;
  total = parseInt(total);
  total /= 100;


  //cell0.innerHTML = "<i id=lineItem-" + shoppingTable.rows.length + " class='material-icons' onclick=decreaseBuy(" + shoppingTable.rows.length + ")></i> " + type;
  cell0.innerHTML = "<span id=lineItem-" + shoppingTable.rows.length + " class='decreaseCount' onclick=decreaseBuy(" + shoppingTable.rows.length + ")>" + type + "</span>";
  cell0.className = 'leftAlign';
  cell1.innerHTML = count;
  cell2.innerHTML = size;
  cell3.innerHTML = p;
  cell4.innerHTML = addDecimal(total);
  cell5.innerHTML = color;
  cell5.style.background = "#" + getHex(color);
  cell5.style.border = "3px solid white";
  cell6.innerHTML = prodID;

  cartHeight += 24;
  if(cartHeight == 34){
    cartHeight += 48;
  }

  // var payTotal = calcShoppingCartTotal();
  // var payTotal = 0.00;
  // for (var r=1; r < shoppingTable.rows.length; r++){
  //   payTotal += parseInt(shoppingTable.rows[r].cells[4].innerHTML * 100);
  // }
  totalCart.innerHTML = calcShoppingCartTotal(true);
  // totalCart.innerHTML = "Total: $" + addDecimal(payTotal/100);

  shoppingCart.style.height = cartHeight + 'px';

}

// for(var i=0; i<22; i++)
//   addLine("T-Shirt", 3, "2XL", "59.88");
function getValues(sfx){
  var sName = "shirtName" + sfx;
  var sCount = "select" + sfx;
  var sPrice = "priceTag" + sfx;
  // alert([sName,sCount,sPrice]);
  var eName = document.getElementById(sName);
  var eCount = document.getElementById(sCount);
  var ePrice = document.getElementById(sPrice);
  // console.log(ePrice.innerHTML)
  return [eName.innerHTML, eCount.options[eCount.selectedIndex].text, ePrice.innerHTML];
}


function submitForm(sfx){
  if(PAYMENT_BEING_PROCESSED) return;
  var payButton = document.getElementById("payButton");
  var submitButton = document.getElementById("sButton"+sfx);


  payButton.disabled = false;

  buttonR = checkFields(sfx);
  if(!buttonR) return;
  var prodID = buttonR.getAttribute('prodID');
  var externalID = document.getElementById("externalID"+sfx).innerHTML;
  var color = document.getElementById("color"+sfx).innerHTML;
  // console.log(prodID);
  productValues = getValues(sfx);
  // console.log(buttonR.innerHTML);
  // price = getPrice(buttonR.innerHTML, sfx);
  price = productValues[2].replace("$","");
  size = buttonR.innerHTML;
  // console.log(parseInt(productValues[1]));

  if(parseInt(productValues[1])){
    addLine(productValues[0], productValues[1], size, price, externalID, color);
    submitButton.classList.add('elementFade');
  }
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

  // var dGAddress1 = document.getElementById("dGAddress1");
  // var dGAddress2 = document.getElementById("dGAddress2");
  // var dGAddress3 = document.getElementById("dGAddress3");
  var dGMName = document.getElementById("dGMName");
  var dGAddress4 = document.getElementById("dGAddress4");
  var dGAddress5 = document.getElementById("dGAddress5");
  var dGAddress6 = document.getElementById("dGAddress6");
  var dGAddress7 = document.getElementById("dGAddress7");
  var dGAddress8 = document.getElementById("dGAddress8");

  dGName.value = "";
  dGEMail.value = "";
  dGVerEMail.value = "";

  // dGAddress1.value = "";
  // dGAddress2.value = "";
  // dGAddress3.value = "";
  dGMName.value = "";
  dGAddress4.value = "";
  dGAddress5.value = "";
  dGAddress6.value = "";
  dGAddress7.value = "";
  dGAddress8.value = "";

  payButton.disabled = true;
  payButton.style.visible = "hidden";
}

function verifyNameData(){
  var dGName = document.getElementById("dGName");
  var dGMName = document.getElementById("dGMName");
  if (dGMName.value.length < 1 && dGName.value.length > 0){
    dGMName.value = dGName.value;
  }
  if (dGName.value.length > 0) return true;
  return false;
}

function verifyEmailData(){
  var dGEMail = document.getElementById("dGEMail");
  var dGVerEMail = document.getElementById("dGVerEMail");
  if (dGEMail.value.toLowerCase() == dGVerEMail.value.toLowerCase() && dGEMail.value.length > 0) return true;
  return false;
}

function verifyBillingData(){
  var dGAddress4 = document.getElementById("dGAddress4");
  var dGAddress5 = document.getElementById("dGAddress5");
  var dGAddress6 = document.getElementById("dGAddress6");
  var dGAddress7 = document.getElementById("dGAddress7");
  var dGAddress8 = document.getElementById("dGAddress8");

  if (dGAddress4.value.length > 0 &&
      dGAddress5.value.length > 0 &&
      dGAddress6.value.length > 0 &&
      dGAddress7.value.length > 0 &&
      dGAddress8.value.length > 0 ) return true;

  return false;

}

//
// first store data - and get primary key - done
// pass primary key/amount to goToPayPal
// accept payment
// if payment works and everything is good
//  mark the record paid (with date)
// send record to T-Shirt web site... (api) - this is next...
// need better background for order page...
//

var merchPass = [];
function storeOrder(){
  var outDiv = document.getElementById("outdiv");
  var info = JSON.parse(outDiv.innerHTML);
  // console.log(info);
  for (var row=0; row < merchPass.length; row++){
    sendString = formatOrder(info.accountID,info.targetID,merchPass[row][4],merchPass[row][5],merchPass[row][2],merchPass[row][1],merchPass[row][3],"false");
    dbOrder("insert", outDiv, sendString.replace(/\s/g,""), function(){})
  }
}

function storeAccount(email, merch, flag, name, street, city, state, zip, country){
  var outDiv = document.getElementById("outdiv");
  merchPass = merch;
  var parms = formatAccount(email, name, street, city, state, zip, country);
  dbAccount("insert", outDiv, parms, storeOrder);
}

function goToPayPal(){
  // setUpPayPal(amount, pid, oid, yid, X, Y, type, rid);
}
///////////////////////////////////////////////////////
//formatOrderAPI
//data - merch data
//
function formatOrderAPI(data){
  var shippingData ={};
  var gather = [];
  var merch = data[1];
  for(entry in merch){
    var external_id = merch[entry][4];
    for(product in PRINTFUL_DATA){
        for(var i=0; i < PRINTFUL_DATA[product]["other_info"].length; i++){
          pexternal_id = "#" + PRINTFUL_DATA[product]["other_info"][i]["external_id"].trim();
          if(external_id.trim() == pexternal_id){
            console.log(PRINTFUL_DATA[product]["other_info"][i]);
            var fileArr = [];
            for(var j=0; j < PRINTFUL_DATA[product]["other_info"][i]["files"].length; j++){
              fileArr.push({
                "type":PRINTFUL_DATA[product]["other_info"][i]["files"][j]["type"],
                "url":PRINTFUL_DATA[product]["other_info"][i]["files"][j]["url"],
              });
            }
            gather.push ({
                  "variant_id":PRINTFUL_DATA[product]["other_info"][i]["variant_id"],
                  "files":fileArr,
                  "quantity":merch[entry][1],
              });
            }
          }
        }
      }
  // [email,merch,false,toName,street,city,state,zip,country,subTotal,shippingCharge,tax]
  shippingData.items = [];
  for(variant in gather){
      shippingData.items.push({
          "variant_id":gather[variant]["variant_id"],
          "quantity":gather[variant]["quantity"],
          "files":gather[variant]["files"]
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
console.log(shippingData);
return shippingData;
}

/////////////////////////////////////////////////////////////////////////
//this variable is only used between this function and "storeAndCharge"
var storeAndChargePass = [];
/////////////////////////////////////////////////////////////////////////
//getOtherCharges organizes all the charges to present to customer
//@param -
//final call: getOrderEstimate - shipping data - and then callback:storeAndCharge()
//
function getOtherCharges(email,merch,toName,street,city,state,zip,country,callback){
  //storeAndChargePass = [email,merch,false,toName,street,city,state,zip,country,subTotal,shippingCharge,tax];
  storeAndChargePass = [email,merch,false,toName,street,city,state,zip,country];
  data = formatOrderAPI(storeAndChargePass);
  getOrderEstimate(outShipping, data, callback)
}

//////////////////////////////////////////////////////////////////////////
//getReadyForPayPal - submit form with customer info
//@param flag determines if form has been canceled or not.
//  flag => false: form is closed
//  flag => true: from is opened
//
function getReadyForPayPal(flag){
  if(PAYMENT_BEING_PROCESSED) return;
  var dataGather = document.getElementById("dataGather");
  var shoppingTable = document.getElementById("shoppingTable");
  //Form submit/cancel... freeze until order is complete
  var dGSubmit = document.getElementById("dGSubmit");
  var dGCancel = document.getElementById("dGCancel");

  if(!flag){
    dataGather.style.visibility = "hidden";
    return;
  }
  var merch = [];
  var dataVerified = true;

  //first row is title/last row is total... skip both
  var numberItems = 0;
  for (var r=1; r < shoppingTable.rows.length-1; r++){
    //Item Name, Count, Size, Cost, ProductID
    // shoppingTable.rows[r].cells[6].style.visibility = "visible";
    numberItems += parseInt(shoppingTable.rows[r].cells[1].innerHTML);

    itemName = shoppingTable.rows[r].cells[0].innerHTML;
    itemName = itemName.substring(itemName.indexOf(">")+1,itemName.lastIndexOf("<"));
    merch.push([itemName,shoppingTable.rows[r].cells[1].innerHTML,shoppingTable.rows[r].cells[2].innerHTML,shoppingTable.rows[r].cells[3].innerHTML,shoppingTable.rows[r].cells[6].innerHTML,shoppingTable.rows[r].cells[5].innerHTML]);
    // shoppingTable.rows[r].cells[6].style.visibility = "hidden";
    // payTotal += parseInt(shoppingTable.rows[r].cells[4].innerHTML * 100);
  }

  /////////////////////////// validate data ...
  // console.log(merch);
  // console.log(PRINTFUL_DATA);
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

  // var dGAddress1 = document.getElementById("dGAddress1");
  // var dGAddress2 = document.getElementById("dGAddress2");
  // var dGAddress3 = document.getElementById("dGAddress3");
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
    //numberItems - number of items ordered from merch processing above
    PPnumber.innerHTML = " for " + numberItems + " items <br>Please check your email for verification.";
    // including shipping charges...
    otherCharges = getOtherCharges(dGEMail.value, merch, dGMName.value, dGAddress4.value, dGAddress5.value, dGAddress6.value, dGAddress7.value, dGAddress8.value, storeAndCharge);
  }
}

function storeAndCharge(){
  parms = storeAndChargePass;
  var outShipping = JSON.parse(document.getElementById("outShipping").innerHTML);

  var subTotal = outShipping.result.costs.subtotal;
  var tax = outShipping.result.costs.tax;
  var shippingCharge = outShipping.result.costs.shipping;

  PAYMENT_BEING_PROCESSED = true;

  storeAccount(parms[0],parms[1],parms[2],parms[3],parms[4],parms[5],parms[6],parms[7],parms[8]);
  // storeAccount(dGEMail.value, merch, false, dGMName.value, dGAddress4.value, dGAddress5.value, dGAddress6.value, dGAddress7.value, dGAddress8.value);
  paypalElt = document.getElementById("paypalElt");
  paypalElt.style.display="block";

  document.getElementById("PPsubTotal").innerHTML = " sub total: " + subTotal;
  document.getElementById("PPshipping").innerHTML = " shipping: " + shippingCharge;
  document.getElementById("PPtax").innerHTML = " tax: " + tax;

  var totalAmt = calcShoppingCartTotal(0);
  var grandTotal = totalAmt + shippingCharge + tax;

  // console.log([totalAmt,parms[0]])
  setUpPayPal(grandTotal, parms[0]);
}
