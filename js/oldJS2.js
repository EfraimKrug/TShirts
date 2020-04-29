function getSize(idS){
  if (idS == 'XS') return "Extra Small";
  if (idS == 'S') return "Small";
  if (idS == 'M') return "Medium";
  if (idS == 'L') return "Large";
  if (idS == 'XL') return "Extra Large";
  if (idS == '2XL') return "Double Extra Large";
  if (idS == '3XL') return "Triple Extra Large";
  if (idS == '4XL') return "Four Times Extra Large";
  if (idS == '5XL') return "Five Times Extra Large";
}

function getPriceArray(sfx){
  var priceArray = [0,0,0,0,0,0,0,0,0];
  if(sfx == '-00') priceArray = ["$31.50","$31.50","$31.50","$31.50","$31.50","$33.50","",""];
  if(sfx == '-01') priceArray = ["","$37.50","$37.50","$37.50","$37.50","$39.50","$41.50","$43.50"];
  if(sfx == '-02') priceArray = ["$31.50","$31.50","$31.50","$31.50","$31.50","$33.50","",""];
  if(sfx == '-03') priceArray = ["$26.50","$26.50","$26.50","$26.50","$26.50","$28.50","$30.00","$33.00"];
  if(sfx == '-04') priceArray = ["","$44.50","$44.50","$44.50","$44.50","$47.50","",""];
  if(sfx == '-05') priceArray = ["$26.50","$26.50","$26.50","$26.50","$26.50","$28.50","$30.00","$33.00"];
  if(sfx == '-06') priceArray = ["","$33.00","$33.00","$33.00","$33.00","$35.00","",""];
  return priceArray;
}

function getPrice(ids,sfx){
  priceArray = getPriceArray(sfx);
  ids = ids.trim();
  if (ids == 'XS') return priceArray[0];
  if (ids == 'S') return priceArray[1];
  if (ids == 'M') return priceArray[2];
  if (ids == 'L') return priceArray[3];
  if (ids == 'XL') return priceArray[4];
  if (ids == '2XL') return priceArray[5];
  if (ids == '3XL') return priceArray[6];
  if (ids == '4XL') return priceArray[7];
}

function getTwoDigits(i){
  if(i < 10) return "0" + i;
  return "" + i;
}
// some of these array entries will be udefined
function getColorButtonList(sfx){
  var buttonList = [];
  // var pattern = "Color01-00";

  for(var i=0; i<50; i++){
    if(document.getElementById("Color" + getSuffix(i) + sfx)){
      var button = document.getElementById("Color" + getSuffix(i) + sfx);
      button.style.background
      buttonList.push(button);
    } else {
      break;
    }
  }

  return buttonList;
}

function colorAllButtons(sfx){
    bList = getColorButtonList(sfx);
    for(i=0; i < bList.length; i++){
      if(!bList[i])continue;

      bList[i].style.background = '#' + bList[i].getAttribute('hexVAL');
      bList[i].style.color = '#' + bList[i].getAttribute('hexVAL');
      bList[i].style.border = "2px solid black";
      bList[i].chosen = false;
    }
}

//////////////////////////////////////////////////////////////
//scoreColorButton - fires when color is clicked
//@param id: 'Color~col~~sfx~' "Color" + 2-digit index + 2-digit suffix
//            e.g. Color-05-02 (fifth color for 2nd product)
//@param clr: the color in English - with "*" in for spaces...
//
function scoreColorButton(id, clr){
    var idS = id.substring(0,id.length-3);
    var sfx = id.substring(id.length-3,id.length);
    colorAllButtons(sfx);

    var button = document.getElementById(id);
    button.style.background = '#' + button.getAttribute('hexVAL');
    button.style.color = '#' + button.getAttribute('hexVAL');
    button.style.border = "4px solid white";
    button.chosen = true;
    var color = document.getElementById("color"+sfx);
    color.innerHTML = clr.replace(/\*/g, " ");

    var prod = document.getElementById("productNumber"+sfx);
    var prodID = prod.innerHTML;
    var frontImg = document.getElementById("frontImg"+sfx);
    frontImg.src = extractVariantFile(clr.replace(/\*/g, " "), PRINTFUL_DATA[prodID]);
    frontImg.style.background = '#' + button.getAttribute('hexVAL');
}

// some of these array entries will be udefined
function getButtonList(sfx){
  var buttonList = [];
  sizeArray = ['XS','S','M','L','XL','2XL','3XL','4XL','5XL'];
  for(size in sizeArray){
    if(document.getElementById(sizeArray[size]+sfx))
      buttonList.push(document.getElementById(sizeArray[size]+sfx));
  }
  return buttonList;
}

function setPricing(idS, sfx){
  var prodID = getCurrentProduct(sfx);
  var priceTag = document.getElementById("priceTag"+sfx);
  priceTag.innerHTML = "$" + extractVariantPrice(idS, PRINTFUL_DATA[prodID]);
}

function getCurrentProduct(sfx){
  var prod = document.getElementById("productNumber"+sfx);
  var prodID = prod.innerHTML;
  return prodID;
}

function scoreButton(id){
    var idS = id.substring(0,id.length-3);
    var sfx = id.substring(id.length-3,id.length);
    var buttonList = getButtonList(sfx);
    var size = document.getElementById("size"+sfx);

    for(i=0; i < buttonList.length; i++){
      if(!buttonList[i])continue;
      buttonList[i].style.background = "white";
      buttonList[i].style.color = "black";
      buttonList[i].chosen = false;
    }

    var button = document.getElementById(id);
    button.style.background = "black";
    button.style.color = "white";
    button.chosen = true;
    size.innerHTML = getSize(idS);
    // priceTag.innerHTML = getPrice(idS,sfx);
    setPricing(idS, sfx);
}

BACK_CLICK = [false,false,false,false,false,false,false,false,false];

function showBack(sw, sfx){
  var i = parseInt(sfx.substring(1));
  BACK_CLICK[i] = false;
  if(sw){
    BACK_CLICK[i] = true;
    var prodID = getCurrentProduct(sfx);
    var frontImage = extractData("thumbnail_url", PRINTFUL_DATA[prodID]);
    imageData = extractVariantData("files", PRINTFUL_DATA[prodID]);
    for(var i=0; i < imageData.length; i++){
      if(imageData[i]["type"] == "preview"){
        frontImage = imageData[i]["url"];
        fImage = document.getElementById("frontImg"+sfx);
        fImage.src = frontImage;
      }
    }
  }
  // alert(opps);
  //get the color from the front...
  var frontImg = document.getElementById("frontImg"+sfx);

  var back = document.getElementById("back"+sfx);
  var backImg = document.getElementById("backImg"+sfx);
  back.style.background = frontImg.style.background;
  backImg.style.background = frontImg.style.background;
  if(back.classList.contains("noshow")){
      back.classList.remove("noshow");
    }
}

function hideBack(sfx){
  var i = parseInt(sfx.substring(1));
  if(BACK_CLICK[i]) return;
  var back = document.getElementById("back"+sfx);
  back.classList.add("noshow");
}

function checkFields(sfx){
  var buttonList = getButtonList(sfx);
  // console.log(buttonList);
  for(i=0; i < buttonList.length; i++){
    if (buttonList[i])
      if (buttonList[i].chosen){
        var str = buttonList[i].innerHTML;
        return buttonList[i];
      }
  }
}