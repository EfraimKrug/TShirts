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

function getVariantID(externalID, color, size){
  for(p in PRINTFUL_DATA){
      if(PRINTFUL_DATA[p]["other_info"][0]["external_id"].trim() == externalID.substring(1).trim()){
        for(var i=0; i < PRINTFUL_DATA[p]["other_info"].length; i++){
          var name = PRINTFUL_DATA[p]["other_info"][i]["name"];
          if(name.substring(name.lastIndexOf("-")+1,name.lastIndexOf("/")).trim() == color.trim() ){
            if(PRINTFUL_DATA[p]["other_info"][i]["size"].trim() == size.trim() ){
              return PRINTFUL_DATA[p]["other_info"][i]['id'];
            }
          }
        }

      }
    }
  return 0;
}

function getColorArray(prodExternalID, size){
  colorArray = [];
  for(var i=0; i < PRINTFUL_DATA[prodExternalID]["other_info"].length; i++){
      if(PRINTFUL_DATA[prodExternalID]["other_info"][i]["size"].trim() == size.trim() ){
          colorArray.push(PRINTFUL_DATA[prodExternalID]["other_info"][i]['color'].trim());
    }
  }
  return colorArray;
}

function loadColorArray(colorArray, sfx){
  var colorBar = document.getElementById("colorBar"+sfx);
  var colorSpotDiv = document.getElementById("color"+sfx)
  var colorSpot = colorSpotDiv.innerHTML.trim();
  var colorStillHere = false;

  while (colorBar.hasChildNodes()) {
      colorBar.removeChild(colorBar.lastChild);
  }

  var pattern = "<div id='Color-~iter~~sfx~' class='colorButton'" +
  " onclick=\"scoreColorButton('Color-~iter~~sfx~','~color~');\" " +
  " hexval=#~hex~ prodid='#5e9ca2eb6aa6f5' " +
  " style='background:~rgb~ " +
  " none repeat scroll 0% 0%; color: ~rgb~ ;" +
  " border: 2px solid ~brdColor~; padding: 3px;'>Co</div>";

  for (var i=0; i < colorArray.length; i++){
    line = pattern.replace(/~iter~/g, getTwoDigits(i));
    if(colorSpot == colorArray[i].trim()){
      colorStillHere = true;
      line = line.replace(/~brdColor~/g, "white");
    } else {
      line = line.replace(/~brdColor~/g, "black");
    }
    line = line.replace(/~sfx~/g, sfx);
    line = line.replace(/~color~/g, colorArray[i]);
    line = line.replace(/~hex~/g, getHex(colorArray[i]));
    line = line.replace(/~rgb~/g, getRGB(colorArray[i]));
    colorBar.innerHTML += line;
  }
  if(!colorStillHere){colorSpotDiv.innerHTML = ""; }
}

function getSizeArray(prodExternalID, color){
  sizeArray = [];
  for(var i=0; i < PRINTFUL_DATA[prodExternalID]["other_info"].length; i++){
      if(PRINTFUL_DATA[prodExternalID]["other_info"][i]["color"].trim() == color.trim() ){
          sizeArray.push(PRINTFUL_DATA[prodExternalID]["other_info"][i]['size'].trim());
    }
  }
  return sizeArray;
}

function loadSizeArray(sizeArray, sfx){
  var currentSize = "";
  var sizeStillHere = false;
  var size = document.getElementById("size"+sfx).innerHTML;
  var sizeCode = getSizeCode(size);
  var titleBar = document.getElementById("titleBar"+sfx);
  while (titleBar.hasChildNodes()) {
      titleBar.removeChild(titleBar.lastChild);
  }

  var pattern = "<div id='~size~~sfx~' class='sizeButton' onclick=\"scoreButton('~size~~sfx~');\" prodid='#5e9ca2eb6aa6f5' style='background: ~bgcolor~ none repeat scroll 0% 0%; color: ~color~;'>~size~ </div>";

  for (var i=0; i < sizeArray.length; i++){
    line = pattern.replace(/~sfx~/g, sfx);
    if(sizeArray[i] == sizeCode){
      sizeStillHere = true;
      line = line.replace(/~bgcolor~/g, "black");
      line = line.replace(/~color~/g, "white");
      currentSize = sizeArray[i] + sfx;
    } else {
      line = line.replace(/~bgcolor~/g, "white");
      line = line.replace(/~color~/g, "black");
    }
    line = line.replace(/~size~/g, sizeArray[i]);
    titleBar.innerHTML += line;
  }
  if(currentSize){
    button = document.getElementById(currentSize);
    button.chosen = true;
  }

  if(!sizeStillHere) size = "";
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
  var variantID = getVariantID(externalID, color, size);
  // console.log(variantID);
  // console.log(parseInt(productValues[1]));

  if(parseInt(productValues[1])){
    addLine(productValues[0], productValues[1], size, price, variantID, color);
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
      dGAddress6.selectedIndex > 0 &&
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

// var orderIDCollection = [];
// function collectOrderID(){
//   var orderWork = document.getElementById("orderWork");
//   console.log("collectOrderID: " + outDiv.innerHTML);
//   orderIDCollection.push(outDiv.innerHTML);
// }

var merchPass = [];
function storeOrder(){
  var outDiv = document.getElementById("outdiv");
  var orderWork = document.getElementById("orderWork");
  var info = JSON.parse(outDiv.innerHTML);
  orderIDCollection = [];
  // console.log(info);
  for (var row=0; row < merchPass.length; row++){
    sendString = formatOrder(info.accountID,info.targetID,merchPass[row][4],merchPass[row][5],merchPass[row][2],merchPass[row][1],merchPass[row][3],"false");
    dbOrder("insert", orderWork, sendString.replace(/\s/g,""), function(){});
  }
}

function storeAccount(email, merch, flag, name, street, city, state, zip, country){
  var outDiv = document.getElementById("outdiv");
  merchPass = merch;
  var parms = formatAccount(email, name, street, city, state, zip, country);
  dbAccount("insert", outDiv, parms, storeOrder);
}
//
// function goToPayPal(){
//   // setUpPayPal(amount, pid, oid, yid, X, Y, type, rid);
// }
///////////////////////////////////////////////////////
//formatOrderAPI
//data - merch data
//
// {
//     "recipient": {
//         "name": "John Doe",
//         "address1": "19749 Dearborn St",
//         "city": "Chatsworth",
//         "state_code": "CA",
//         "country_code": "US",
//         "zip": "91311"
//     },
//     "items": [
//         {
//             "sync_variant_id": 1844711751,
//             "quantity": 1
//         }
//     ]
// }
function formatOrderAPI(data){
  var shippingData ={};
  var gather = [];
  var merch = data[1];
  /////////////////////////////////////////////////////////////////////////
  for(entry in merch){
    var id = merch[entry][4];
    // for(product in PRINTFUL_DATA){
        // for(var i=0; i < PRINTFUL_DATA[product]["other_info"].length; i++){
          // pexternal_id = "#" + PRINTFUL_DATA[product]["other_info"][i]["external_id"].trim();
          // if(external_id.trim() == pexternal_id){
            // console.log(PRINTFUL_DATA[product]["other_info"][i]);
            // console.log([merch[entry][1], id]);
            gather.push ({
                  "sync_variant_id":id,
                  "quantity":parseInt(merch[entry][1]),
              });
            // }
          // }
        // }
      }

  // for(entry in merch){
  //   var external_id = merch[entry][4];
  //   for(product in PRINTFUL_DATA){
  //       for(var i=0; i < PRINTFUL_DATA[product]["other_info"].length; i++){
  //         pexternal_id = "#" + PRINTFUL_DATA[product]["other_info"][i]["external_id"].trim();
  //         if(external_id.trim() == pexternal_id){
  //           // console.log(PRINTFUL_DATA[product]["other_info"][i]);
  //           gather.push ({
  //                 "sync_variant_id":PRINTFUL_DATA[product]["other_info"][i]["id"],
  //                 "quantity":parseInt(merch[entry][1]),
  //             });
  //           }
  //         }
  //       }
  //     }
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
  // console.log(data);
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
  // console.log(dataString);
  return dataString;
}
/////////////////////////////////////////////////////////////////////////
//this variable is only used between this function and "storeAndChargeF"
var storeAndChargePass = [];
/////////////////////////////////////////////////////////////////////////
//getOtherCharges organizes all the charges to present to customer
//@param -
//final call: getOrderEstimate - shipping data - and then callback:storeAndChargeF()
//
function getOtherCharges(email,merch,toName,street,city,state,zip,country,callback){
  // console.log("getOtherCharges");
  //storeAndChargePass = [email,merch,false,toName,street,city,state,zip,country,subTotal,shippingCharge,tax];
  storeAndChargePass = [email,merch,false,toName,street,city,state,zip,country];
  data = formatOrderAPI(storeAndChargePass);
  // console.log(data);
  dataString = fromOrderString(data);

  getOrderEstimate(outShipping, dataString, callback)
}

//////////////////////////////////////////////////////////////////////////
//getReadyForPayPal - submit form with customer info
//@param flag determines if form has been canceled or not.
//  flag => false: form is closed
//  flag => true: from is opened
//
function getReadyForPayPal(flag){
  if(PAYMENT_BEING_PROCESSED) return;
  // console.log("getReadyForPayPal");
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
    otherCharges = getOtherCharges(dGEMail.value, merch, dGMName.value, dGAddress4.value, dGAddress5.value, dGAddress6.options[dGAddress6.selectedIndex].value, dGAddress7.value, dGAddress8.options[dGAddress8.selectedIndex].value, storeAndChargeF);
  }
}

////////////////////////////////////////////////////////////////////////sel.options[sel.selectedIndex].text
//storeAndChargeF - call back function from api call for order estimate
//
function storeAndChargeF(){
  // console.log("storeAndChargeF (call back from orderestimate)");
  parms = storeAndChargePass;
  var outShipping = JSON.parse(document.getElementById("outShipping").innerHTML);
  // console.log(outShipping);

  // var subTotal = outShipping.costs.subtotal; // oops! this is cost...
  var tax = outShipping.costs.tax;
  var shippingCharge = outShipping.costs.shipping;

  PAYMENT_BEING_PROCESSED = true;

  storeAccount(parms[0],parms[1],parms[2],parms[3],parms[4],parms[5],parms[6],parms[7],parms[8]);
  // storeAccount(dGEMail.value, merch, false, dGMName.value, dGAddress4.value, dGAddress5.value, dGAddress6.value, dGAddress7.value, dGAddress8.value);
  paypalElt = document.getElementById("paypalElt");
  paypalElt.style.display="block";
  var totalAmt = calcShoppingCartTotal(0);
  // console.log(totalAmt);
  document.getElementById("PPsubTotal").innerHTML = " sub total: " + addDecimal(totalAmt) + " ";
  document.getElementById("PPshipping").innerHTML = " shipping: " + addDecimal(shippingCharge) + " ";
  document.getElementById("PPtax").innerHTML = " tax: " + addDecimal(tax) + " ";

  // console.log([totalAmt, shippingCharge, tax]);
  var grandTotal = ((totalAmt * 100) + (shippingCharge * 100) + (tax * 100))/100;
  // console.log(grandTotal);
  // console.log([totalAmt,parms[0]])
  setUpPayPal(grandTotal, parms[0]);
}
