///////////////////////////////////////////////////////////////////
// The code in this file is triggered by user interation
// with the page...

///////////////////////////////////////////////////////////////////
//displayProductDescription - opens up the description
//@param prodID - the product number
//@triggered from the Description onclick...
//
function displayProductDescription(prodID){
  formatProdDesc(prodID);
  openDesc();
  placeMent();
}

//////////////////////////////////////////////////////////////
//checkFields - returns the size button that was clicked
//@param sfx - which instantiation of product... 0-9 (eg. "-01")
//
function checkFields(sfx){
  var buttonList = getButtonList(sfx);
  for(i=0; i < buttonList.length; i++){
    if (buttonList[i])
      if (buttonList[i].chosen){
        return buttonList[i];
      }
  }
}
//////////////////////////////////////////////////////////////
//                begin - shopping cart
//////////////////////////////////////////////////////////////
//calcShoppingCartTotal - adds line to the shopping cart
//@param formatFlag - true/false
//@return total amount from shopping cart
//
function calcShoppingCartTotal(formatFlag){
  var shoppingCart = document.getElementById("shoppingCart");
  var payTotal = 0.00;
  for (var r=1; r < shoppingTable.rows.length; r++){
    payTotal += parseInt(shoppingTable.rows[r].cells[4].innerHTML * 100);
  }

  if(formatFlag) return "Total: $" + addDecimal(payTotal/100);
  return addDecimal(payTotal/100);
}

//////////////////////////////////////////////////////////////
//addLine - adds line to the shopping cart
//@param type - short name of product
//@param count - number requested
//@param size - size -
//@param price - retail price -
//@param prodID - variant id -
//@param color - color...
//
var cartHeight = 10;
function addLine(type, count, size, price, prodID, color){
  console.log(['addline',type,count,size,price,prodID,color]);
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

  cell0.innerHTML = "<span id=lineItem-" + shoppingTable.rows.length + " class='decreaseCount' onclick=decreaseBuy(" + shoppingTable.rows.length + ")>" + type + "</span>";
  cell0.className = 'leftAlign';
  cell1.innerHTML = count;
  cell2.innerHTML = size;
  cell3.innerHTML = p;
  cell4.innerHTML = addDecimal(total);
  cell5.innerHTML = color;
  cell5.style.background = "#" + getHex(color);
  cell5.style.color = getText(getHex(color));
  cell5.style.border = "3px solid white";
  cell6.innerHTML = prodID;

  cartHeight += 24;
  if(cartHeight == 34){
    cartHeight += 48;
  }
  totalCart.innerHTML = calcShoppingCartTotal(true);
  shoppingCart.style.height = cartHeight + 'px';
}

///////////////////////////////////////////////////////////////////
//decreaseBuy - decreases shopping cart line quantity 1/click
//@param lineMark - table row 1 - table size
//@triggered from the "type" tag on the shopping cart...
//
function decreaseBuy(lineMark){
  if (PAYMENT_BEING_PROCESSED) return;
  var shoppingCart = document.getElementById("shoppingCart");
  var lineNum = shoppingTable.rows.length - lineMark + 1;
  var totalCart = document.getElementById("total");
  if (shoppingTable.rows[lineNum].cells[1].innerHTML > 0){
    shoppingTable.rows[lineNum].cells[1].innerHTML =
                    parseInt(shoppingTable.rows[lineNum].cells[1].innerHTML) - 1;
    cost = shoppingTable.rows[lineNum].cells[3].innerHTML * 100;
    price = shoppingTable.rows[lineNum].cells[1].innerHTML * cost;
    price /= 100;
    shoppingTable.rows[lineNum].cells[4].innerHTML = addDecimal(price);
  }
  totalCart.innerHTML = calcShoppingCartTotal(true);
}


//                end - shopping cart
///////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////
//submitForm - opens up the description
//@param sfx - which instantiation of product... 0-9 (eg. "-01")
//@triggered from the "pay now" button...
//
function submitForm(sfx, altSwitch){
  if(PAYMENT_BEING_PROCESSED) return;
  var payButton = document.getElementById("payButton");
  var submitButton = document.getElementById("sButton"+sfx);

  payButton.disabled = false;

  if(!altSwitch){
    buttonR = checkFields(sfx);
    if(!buttonR) return;
    var prodID = buttonR.getAttribute('prodID');
    size = buttonR.innerHTML;
    price = buttonR.getAttribute('price');
  } else {
    var prodID = document.getElementById("productNumber"+sfx);
  }

  var externalID = document.getElementById("externalID"+sfx).innerHTML;
  var colorElt = document.getElementById("color"+sfx);
  var color = colorElt.innerHTML;
  if(!color) return;
  var cHold = colorElt.getAttribute("allvariantsizes");
  variantID = 0;
  cHoldArray = eval(cHold);
  for(var i=0; i < cHoldArray.length; i++){
    if(cHoldArray[i][0] == size.trim()) variantID = cHoldArray[i][1];
  }
  productValues = getValues(sfx);

  if(parseInt(productValues[1])){
    addLine(productValues[0], productValues[1], size, price, variantID, color);
    submitButton.classList.add('elementFade');
    turnOffSizing();
  }
}
