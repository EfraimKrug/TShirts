function querystring(key) {
  var re=new RegExp('(?:\\?|&)'+key+'=(.*?)(?=&|$)','gi');
  var r=[], m;
  while ((m=re.exec(document.location.search)) != null) r[r.length]=m[1];
  return String(r);
}

var cartHeight = 10;
function addLine2(type, count, size, price, prodID, color){
  if(PAYMENT_BEING_PROCESSED) return;
  var shoppingTable = document.getElementById("shoppingTable");
  var shoppingCart = document.getElementById("shoppingCart");
  var totalCart = document.getElementById("total");
  shoppingCart.style.visibility = "visible";

  shoppingCart.style.top = "15%";
  shoppingCart.style.left = "5%";
  shoppingCart.style.padding = "2%";
  shoppingTable.style.border = "4px solid maroon";

  var splashScreen = document.getElementById("splashScreen");
  splashScreen.style.top = "15%";
  splashScreen.style.left = "15%";
  splashScreen.style.height = "75%";
  splashScreen.style.width = "75%";
  splashScreen.style.border = "";
  splashScreen.style.opacity = "0.2";

  var row = shoppingTable.insertRow(1);
  var cell0 = row.insertCell(0);
  var cell1 = row.insertCell(1);
  var cell2 = row.insertCell(2);
  var cell3 = row.insertCell(3);
  var cell4 = row.insertCell(4);
  var cell5 = row.insertCell(5);
  var cell6 = row.insertCell(6);

  cell6.style.display = 'none';

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

  screenDim = getScreenDimenstions();
}

var type = querystring('type');
type = type.replace(/\^/g," ").replace(/\%20/g," ");
var count = querystring('count');
count = count.replace(/\^/g," ").replace(/\%20/g," ");
var size = querystring('size');
size = size.replace(/\^/g," ").replace(/\%20/g," ");
var price = querystring('price');
price = price.replace(/\^/g," ").replace(/\%20/g," ");
var prodID = querystring('prodID');
prodID = prodID.replace(/\^/g," ").replace(/\%20/g," ");
var color = querystring('color');
color = color.replace(/\^/g," ").replace(/\%20/g," ");

addLine2(type,count,size,price,prodID,color);

countryList = document.getElementById("countryList");
apiCall(moveCountryData, "countries");
