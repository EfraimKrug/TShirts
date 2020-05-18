//////////////////////////////////////////////////////////////
//Utility functions...
//////////////////////////////////////////////////////////////
//addDecimal - make sure then number is a string /
//             and is a decimal to 2 places
//@param num -
//@return string...
//
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
//////////////////////////////////////////////////////////////
//getButtonList - gets all the size buttons in effect for
// this particular instance
//@param sfx - which instantiation of product... 0-9 (eg. "-01")
//
function getButtonList(sfx){
  var buttonList = [];
  sizeArray = ['XS','S','M','L','XL','2XL','3XL','4XL','5XL'];
  for(size in sizeArray){
    if(document.getElementById(sizeArray[size]+sfx))
      buttonList.push(document.getElementById(sizeArray[size]+sfx));
  }
  return buttonList;
}

///////////////////////////////////////////////////////////////////////////////
//getValues - gets three values back from product this particular instance
//            name, number, and price...
//
//@param sfx - which instantiation of product... 0-9 (eg. "-01")
//@return array [name, number, price]
//
function getValues(sfx){
  var sName = "shirtName" + sfx;
  var sCount = "select" + sfx;
  var sPrice = "priceTag" + sfx;

  var eName = document.getElementById(sName);
  var eCount = document.getElementById(sCount);
  var ePrice = document.getElementById(sPrice);

  return [eName.innerHTML, eCount.options[eCount.selectedIndex].text, ePrice.innerHTML];
}

/////////////////////////////////////////////////////
//sortSizes - some sizes come back out of order!
//@param size_array - an array of sizes...
//@return sorted_array - same sizes - sorted
//
function sortSizes(size_array){
  sorted_array = [];
  for(sz in size_array) {if(size_array[sz] == "XS") sorted_array.push("XS");}
  for(sz in size_array) {if(size_array[sz] == "S")  sorted_array.push("S");}
  for(sz in size_array) {if(size_array[sz] == "M")  sorted_array.push("M");}
  for(sz in size_array) {if(size_array[sz] == "L")  sorted_array.push("L");}
  for(sz in size_array) {if(size_array[sz] == "XL") sorted_array.push("XL");}
  for(sz in size_array) {if(size_array[sz] == "2XL")sorted_array.push("2XL");}
  for(sz in size_array) {if(size_array[sz] == "3XL")sorted_array.push("3XL");}
  for(sz in size_array) {if(size_array[sz] == "4XL")sorted_array.push("4XL");}
  for(sz in size_array) {if(size_array[sz] == "5XL")sorted_array.push("5XL") ;}

  return sorted_array;
}

////////////////////////////////////////////////////////////////////////////
//getSuffix - returns proper suffix -00, -01 etc
//@param i - int.. usually iterating through the page
//
function getSuffix(i){
  if(i < 10) return "-0" + i;
  if(i < 100) return "-" + i;
}


function flipSide(side){
  return !side;
}

function getScreenDimenstions(){
    var width  = window.innerWidth  || document.documentElement.clientWidth  || document.body.clientWidth;
    var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    return [width, height];
}
