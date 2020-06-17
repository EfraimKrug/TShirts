//
//new shop...
//
var PAGE_MAX = 9;
function newBuildPage(apiData){
  dropList = [169150005,170108821];

  count = 0;
  leftSide = false;
  continueSw = false;
  console.log(apiData);
  for (var j=0; j < apiData['ProductList'].length; j++){
    for(var i=0; i<dropList.length; i++)
        if(dropList[i] == apiData['ProductList'][j]['id']) continueSw = true;

    if(continueSw){
      continueSw = false;
      continue;
    }

    sfx = getSuffix(count);
    count++;
    variantData = getVariantData(apiData, apiData['ProductList'][j]['id']);
    product = {};
    names = [];
    console.log(variantData);
    for(var k=0; k < variantData.length; k++){
      product.id = variantData[k]['id'];
      files = [];
      for(var m=0; m < variantData[k]['files'].length; m++){
        files.push({'type':variantData[k]['files'][m]['type'], 'preview_url':variantData[k]['files'][m]['preview_url']})
      }
      names.push([variantData[k]['variant_id'],variantData[k]['name'].trim(),variantData[k]['retail_price'],files,variantData[k]['id']]);
    }

    cutOff = 0;
    nameSame = "";
    nameDiff = "";
    // console.log(names);
    if(names.length < 2) nameSame = names[0][1];
    else
      for(n=0; n<names[0][1].length;n++){
        if(names[0][1][n] == names[1][1][n]){
          cutOff = n;
        } else { break; }
      }

    if(cutOff) nameSame = names[0][1].substring(0,cutOff);
    product.name = nameSame;
    // product.types = [];
    for(var n=0; n < names.length; n++){
      nameDiff = names[n][1].substring(cutOff);
      names[n][1] = nameDiff;
      // product.types.push(nameDiff.trim());
    }
    product.names = names;
    // console.log(product);
    // console.log(newPackageUp(product,j));
    productList = document.getElementById("product-list");
    div = document.createElement("DIV");
    div.id = "product" + sfx;

    div.innerHTML = newPackageUp(product,j);
    productList.appendChild(div);
    s = getSuffix(j);
    getOption('productVariations' + s, s);

    leftSide = flipSide(leftSide);
    if(count > PAGE_MAX) break;
  }
  // see dataCollection for details...
  // get list of countries/States
  console.log("getting country info...");
  countryList = document.getElementById("countryList");
  apiCall(moveCountryData, "countries");
}

function newPackageUp(product,i){
  var html = "<div id=productX" + getSuffix(i) + " class=productBlock>";
  html += "<div id=productID" + getSuffix(i) + " class='noshow'>" + product.id + "</div><div id=id" + getSuffix(i) + " class=noshow></div>";
  html += "<div id=picture" + getSuffix(i) + ">";
  html += "<img src='~showFile~'/></div>";
  html += "</div>";
  nm = product.name; nm = nm.replace("-","").trim();
  html += "<div class=infoBox><div id=productName" + getSuffix(i) + " class='productType'>" + nm + " </div><div id=price" + getSuffix(i) + " class='productPrice'></div>";
  html += "<div id=name" + getSuffix(i) + " class='variantName'></div>";
  html += "<select id=productVariations" + getSuffix(i) + " class='productSelect' onchange=getOption('productVariations" + getSuffix(i) + "','" + getSuffix(i) + "')>";
  for(var j=0; j < product.names.length; j++){
    html += "<option ";
    for(var k=0; k < product.names[j][3].length; k++){
      html += " fileName" + getSuffix(i) + "-" + product.names[j][3][k]['type'] + "=" + product.names[j][3][k]['preview_url'] + " ";
      showFile = product.names[j][3][k]['preview_url'];
    }
    console.log(product);
    html += "variantID=" + product.names[j][4] + " price=" + product.names[j][2] + ">"+ product.names[j][1] + "</option>";
  }
  html += "</select>";
  html += "<label>How many?</label><select id='select" + getSuffix(i) + "'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option></select>";
  html += "</div>";
  html += "<div id=sButton" + getSuffix(i) + " class=submitButton onclick=newSubmitForm('" + getSuffix(i).trim() + "',false);>Add to Cart</div></div>";
  html = html.replace("~showFile~",showFile);
  return html;
}

function getOption(id, sfx){
  select = document.getElementById(id);
  idx = select.selectedIndex;
  data = {};
  data.name = select.options[idx].text;
  data.variant_id = select.options[idx].getAttribute('variantID');
  data.retail_price = select.options[idx].getAttribute('price');
  if(select.options[idx].getAttribute('fileName'+sfx+'-default'))
    data.default = select.options[idx].getAttribute('fileName'+sfx+'-default');
  if(select.options[idx].getAttribute('fileName'+sfx+'-preview'))
    data.preview = select.options[idx].getAttribute('fileName'+sfx+'-preview');

  data.nameSpot = "name"+sfx;
  data.idSpot = "id"+sfx;
  data.priceSpot = "price"+sfx;
  data.fileSpot = "picture"+sfx;
  // console.log(data);
  exposeSelection(data);
}

function exposeSelection(data){
  // console.log(data);
  elt = document.getElementById(data.nameSpot);
  elt.innerHTML = " " + data.name.replace("-"," ");
  elt = document.getElementById(data.idSpot);
  elt.innerHTML = data.variant_id;
  elt = document.getElementById(data.priceSpot);
  elt.innerHTML = "$" + data.retail_price;
  // elt = document.getElementById(data.fileSpot);
  // elt.innerHTML = "file: " + data.preview;
}

function newSubmitForm(sfx, altSwitch){
  if(PAYMENT_BEING_PROCESSED) return;

  var payButton = document.getElementById("payButton");
  var submitButton = document.getElementById("sButton"+sfx);
  // var productX = document.getElementById("productX"+sfx);
  var productID = document.getElementById("productID"+sfx).innerHTML;
  var id = document.getElementById("id"+sfx).innerHTML;
  var productName = document.getElementById("productName"+sfx).innerHTML;
  var name = document.getElementById("name"+sfx).innerHTML;

  var select = document.getElementById("productVariations"+sfx);
  var numberSelect = document.getElementById("select"+sfx);

  if(!select) return;
  var variant_id = select.options[select.selectedIndex].getAttribute('variantID');
  var retail_price = select.options[select.selectedIndex].getAttribute('price');
  var number = numberSelect.options[numberSelect.selectedIndex].value;

  payButton.disabled = false;

  // if(parseInt(productValues[1])){
  addLine(productName, number, "reg", retail_price, variant_id, name);
  submitButton.classList.add('elementFade');
  turnOffSizing();
  // }
}
