PRINTFUL_DATA = {};
FINAL_FUNCTION = "";
NUMBER_OF_PRODUCTS = 0;
//////////////////////////////////////////////////////////////
//addProductRow
//@param key: productID
//@param valsArr: array of 2-member arrays [key,value]
//
function addProductRow(key, valsArr){
    // var PRINTFUL_DATARow = {};
    // PRINTFUL_DATA["variants"] = {};
    rowArr = [];
    for (spot in valsArr){
      // PRINTFUL_DATARow[spot] = valsArr[spot];
      PRINTFUL_DATA[key][valsArr[spot][0]] = valsArr[spot][1];
    }
    // PRINTFUL_DATA[key] = PRINTFUL_DATARow;
}

function getProduct(){
  // if(NUMBER_OF_PRODUCTS < 0)return;
  var listJ = JSON.parse(OUT_DIV_2.innerHTML.trim());
  arr = [];
  var productID = listJ["sync_product"]["id"];
  PRINTFUL_DATA[productID]["other_info"] = [];
  var variant_counter = 0;
  for (variant in listJ["sync_variants"]){
    PRINTFUL_DATA[productID]["other_info"][variant_counter] = {};

    var short_name = listJ["sync_variants"][variant]["name"];
    var long_name = listJ["sync_variants"][variant]["product"]["name"];
    var name = short_name;
    // var name = long_name.substring(0,long_name.lastIndexOf("("));

    var size = long_name.substring(long_name.lastIndexOf("/")+1,long_name.lastIndexOf(")"));
    var color = long_name.substring(long_name.lastIndexOf("(")+1,long_name.lastIndexOf("/"));

    PRINTFUL_DATA[productID]["other_info"][variant_counter]["external_id"]=listJ["sync_variants"][variant]["external_id"];
    PRINTFUL_DATA[productID]["other_info"][variant_counter]["variant_id"]=listJ["sync_variants"][variant]["variant_id"];
    PRINTFUL_DATA[productID]["other_info"][variant_counter]["retail_price"]=listJ["sync_variants"][variant]["retail_price"];
    PRINTFUL_DATA[productID]["other_info"][variant_counter]["files"]=[];

    for (var i=0;i<listJ["sync_variants"][variant]["files"].length;i++){
      PRINTFUL_DATA[productID]["other_info"][variant_counter]["files"][i] = {};
      PRINTFUL_DATA[productID]["other_info"][variant_counter]["files"][i]["id"] = listJ["sync_variants"][variant]["files"][i]["id"];
      PRINTFUL_DATA[productID]["other_info"][variant_counter]["files"][i]["url"] = listJ["sync_variants"][variant]["files"][i]["preview_url"];
      PRINTFUL_DATA[productID]["other_info"][variant_counter]["files"][i]["type"] = listJ["sync_variants"][variant]["files"][i]["type"];
    }

    PRINTFUL_DATA[productID]["other_info"][variant_counter]["name"]= name;
    PRINTFUL_DATA[productID]["other_info"][variant_counter]["size"]= size;
    PRINTFUL_DATA[productID]["other_info"][variant_counter]["color"]= color;
    variant_counter++;
  }

  // console.log(NUMBER_OF_PRODUCTS);
  if(!NUMBER_OF_PRODUCTS) FINAL_FUNCTION();
  NUMBER_OF_PRODUCTS--;
  // console.log(PRINTFUL_DATA);
}


function getVariants(id){
  // var outDiv = document.getElementById("outDiv2");
  var CALLBACK_SWITCH = false;
  productIdList = Object.keys(PRINTFUL_DATA);
  apiCall(OUT_DIV_2, getProduct, "product", id);
}

// productKeys = [];
function getProductList(){
  var listJ = JSON.parse(OUT_DIV_1.innerHTML.trim());
  arr = [];
  for (product in listJ){
    arr = [];
    keyList = Object.keys(listJ[product]);
    PRINTFUL_DATA[listJ[product]["id"]] = {};
    //set measure for asyncronous return
    productList = Object.keys(listJ);
    NUMBER_OF_PRODUCTS = productList.length-1;
    for (key in keyList){
      arr.push([keyList[key], listJ[product][keyList[key]] ])
    }
    addProductRow(listJ[product]["id"], arr);
    getVariants(listJ[product]["id"]);
  }
}

var OUT_DIV_1 = "";
var OUT_DIV_2 = "";

function getPrintFulAPIData(outDiv1, outDiv2, finalFunction){
  OUT_DIV_1 = outDiv1;
  OUT_DIV_2 = outDiv2;
  FINAL_FUNCTION = finalFunction;
  apiCall(OUT_DIV_1, getProductList);
}
