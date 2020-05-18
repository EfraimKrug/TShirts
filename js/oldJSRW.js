//<!-- shopping cart manipulation -->



// var cartHeight = 10;
// function addLine(type, count, size, price, prodID, color){
//   if(PAYMENT_BEING_PROCESSED) return;
//   var shoppingTable = document.getElementById("shoppingTable");
//   var shoppingCart = document.getElementById("shoppingCart");
//   var totalCart = document.getElementById("total");
//   shoppingCart.style.visibility = "visible";
//
//   var row = shoppingTable.insertRow(1);
//   var cell0 = row.insertCell(0);
//   var cell1 = row.insertCell(1);
//   var cell2 = row.insertCell(2);
//   var cell3 = row.insertCell(3);
//   var cell4 = row.insertCell(4);
//   var cell5 = row.insertCell(5);
//   var cell6 = row.insertCell(6);
//
//   cell6.style.visibility = 'hidden';
//
//   var p = price.replace("$","");
//   var total = p * count;
//   total *= 100;
//   total = parseInt(total);
//   total /= 100;
//
//
//   //cell0.innerHTML = "<i id=lineItem-" + shoppingTable.rows.length + " class='material-icons' onclick=decreaseBuy(" + shoppingTable.rows.length + ")></i> " + type;
//   cell0.innerHTML = "<span id=lineItem-" + shoppingTable.rows.length + " class='decreaseCount' onclick=decreaseBuy(" + shoppingTable.rows.length + ")>" + type + "</span>";
//   cell0.className = 'leftAlign';
//   cell1.innerHTML = count;
//   cell2.innerHTML = size;
//   cell3.innerHTML = p;
//   cell4.innerHTML = addDecimal(total);
//   cell5.innerHTML = color;
//   cell5.style.background = "#" + getHex(color);
//   cell5.style.border = "3px solid white";
//   cell6.innerHTML = prodID;
//
//   cartHeight += 24;
//   if(cartHeight == 34){
//     cartHeight += 48;
//   }
//
//   // var payTotal = calcShoppingCartTotal();
//   // var payTotal = 0.00;
//   // for (var r=1; r < shoppingTable.rows.length; r++){
//   //   payTotal += parseInt(shoppingTable.rows[r].cells[4].innerHTML * 100);
//   // }
//   totalCart.innerHTML = calcShoppingCartTotal(true);
//   // totalCart.innerHTML = "Total: $" + addDecimal(payTotal/100);
//
//   shoppingCart.style.height = cartHeight + 'px';
//
// }
//
// // for(var i=0; i<22; i++)
// //   addLine("T-Shirt", 3, "2XL", "59.88");
// function getValues(sfx){
//   var sName = "shirtName" + sfx;
//   var sCount = "select" + sfx;
//   var sPrice = "priceTag" + sfx;
//   // alert([sName,sCount,sPrice]);
//   var eName = document.getElementById(sName);
//   var eCount = document.getElementById(sCount);
//   var ePrice = document.getElementById(sPrice);
//   // console.log(ePrice.innerHTML)
//   return [eName.innerHTML, eCount.options[eCount.selectedIndex].text, ePrice.innerHTML];
// }

function __getVariantID(externalID, color, size){
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

function __getColorArray(prodExternalID, size){
  colorArray = [];
  for(var i=0; i < PRINTFUL_DATA[prodExternalID]["other_info"].length; i++){
      if(PRINTFUL_DATA[prodExternalID]["other_info"][i]["size"].trim() == size.trim() ){
          colorArray.push(PRINTFUL_DATA[prodExternalID]["other_info"][i]['color'].trim());
    }
  }
  return colorArray;
}

function __loadColorArray(colorArray, sfx){
  console.log(colorArray);
  var colorBar = document.getElementById("colorBar"+sfx);
  var colorSpotDiv = document.getElementById("color"+sfx)
  var colorSpot = colorSpotDiv.innerHTML.trim();
  var colorStillHere = false;

  while (colorBar.hasChildNodes()) {
      colorBar.removeChild(colorBar.lastChild);
  }

  for (var i=0; i < colorArray.length; i++){
    line = colorTemplate.replace(/~iter~/g, getTwoDigits(i));
    colorArrayHold = colorArray[i].replace(/\^/g," ").trim();
    if(colorSpot == colorArrayHold){
      colorStillHere = true;
      line = line.replace(/~brdColor~/g, "black");
    } else {
      line = line.replace(/~brdColor~/g, "orange");
    }
    line = line.replace(/~sfx~/g, sfx);
    line = line.replace(/~color~/g, colorArrayHold);
    line = line.replace(/~hex~/g, getHex(colorArrayHold));
    line = line.replace(/~rgb~/g, getRGB(colorArrayHold));
    colorBar.innerHTML += line;
  }
  if(!colorStillHere){colorSpotDiv.innerHTML = ""; }
}

function __getSizeArray(prodExternalID, color){
  sizeArray = [];
  for(var i=0; i < PRINTFUL_DATA[prodExternalID]["other_info"].length; i++){
      if(PRINTFUL_DATA[prodExternalID]["other_info"][i]["color"].trim() == color.trim() ){
          sizeArray.push(PRINTFUL_DATA[prodExternalID]["other_info"][i]['size'].trim());
    }
  }
  return sizeArray;
}

function __loadSizeArray(sizeArray, sfx){
  var currentSize = "";
  var sizeStillHere = false;
  var size = document.getElementById("size"+sfx).innerHTML;
  var sizeCode = getSizeCode(size);
  var titleBar = document.getElementById("titleBar"+sfx);
  while (titleBar.hasChildNodes()) {
      titleBar.removeChild(titleBar.lastChild);
  }

  for (var i=0; i < sizeArray.length; i++){
    line = sizeTemplate.replace(/~sfx~/g, sfx);
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
