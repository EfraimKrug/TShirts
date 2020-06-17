////////////////////////////////////////////////////////
// Description ...The code in this file builds the
// HTML page - setting up the products, and getting
// all the data from the API to the page.
//
/////////////////////////////////////////////////////////
//

//////////////////////////////////////////////////////////
// Product by Product - initial set up
// There is an HTML Template in HTMLTemplates - for the
// Product. Each prodect is a different shirt with
// variant colors and sizes...
//
//
///////////////////////////////////////////////////////////
//touchUp - now it is proper HTML we can fix it up...
//@param sfx: 3-digit suffix e.g. -01
//
function touchUp(sfx){
  var emptyBack = "./images/emptyBack.png";

  color = document.getElementById("Color-00"+sfx);
  if(!color) return;
  fileNameD = color.getAttribute("default"+sfx);
  fileNameF = color.getAttribute("preview"+sfx);
  fileNameB = color.getAttribute("back"+sfx);

  Fimg = document.getElementById("frontImg"+sfx);
  Bimg = document.getElementById("backImg"+sfx);
  Fimg.src = fileNameF ? fileNameF : fileNameD;
  Bimg.src = fileNameB ? fileNameB : emptyBack;
}

//////////////////////////////////////////////////////////
//keepProdID - dealing with file info...
//
function keepProdID(sfx, prodID, pSKEL){
  pSKEL = pSKEL.replace(/~prodNum~/g, prodID);
  return pSKEL;
}

//////////////////////////////////////////////////////////
//addTitle - dealing with file info...
//
function addTitle(sfx, newName, pSKEL){
  pSKEL = pSKEL.replace(/~name~/,newName);
  return pSKEL;
}

//////////////////////////////////////////////////////////
//addColors - dealing with file info...
//
function addColors(variantData, sfx, pSKEL){
  var newHTML = "";
  var colCount = 0;
  colorCollection = [];
  var iter = 0;
  for(var i=0; i < variantData.length; i++){
    sw = false;
    co = variantData[i]['name'].substring(variantData[i]['name']
                                .lastIndexOf('-')+1,variantData[i]['name']
                                .lastIndexOf('/')).trim();
    for(var j=0; j < colorCollection.length; j++){
      if(colorCollection[j] == co) sw = true;
      }
    if(sw) continue;
    // files for each color
    colorCollection.push(co);
    fileList = getFilesForColor(co.replace(/\s/g, "^"), variantData);
    colorHold = colorTemplate;
    if(fileList['default']) colorHold = colorHold.replace(/~defaultFile~/, fileList['default'][0]);
    if(fileList['back']) colorHold = colorHold.replace(/~backFile~/, fileList['back'][0]);
    if(fileList['preview']) colorHold = colorHold.replace(/~previewFile~/, fileList['preview'][0]);

    newHTML += colorHold.replace(/~sfx~/g, sfx)
                              .replace(/~color~/, co.replace(/\s/g, "^"))
                              .replace(/~iter~/g, getTwoDigits(iter))
                              .replace(/~rgb~/g, getRGB(co))
                              .replace(/~hex~/g,getHex(co))
                              .replace(/~col~/g,getSuffix(colCount))

                              .replace(/~defaultFile~/,'')
                              .replace(/~backFile~/,'')
                              .replace(/~previewFile~/,'');


    iter++;
    colCount++;
  }

  sizeListArray = getSizesForColor(co.replace(/\s/g, "^"), variantData);
  sizeList = sizeListArray[0];
  variantIDList = sizeListArray[1];
  newHTML = newHTML.replace(/~allSizes~/g,sizeList);
  newHTML = newHTML.replace(/~allVariantSizes~/g,variantIDList);
  pSKEL = pSKEL.replace(/~color~array~/, newHTML);

  return pSKEL;
}

///////////////////////////////////////////////////////////////////////
//getColorsForSize - the size element needs access to relevant colors
function getColorsForSize(sizeIN, variantData){
  colorCollection = [];
  for(var i=0; i < variantData.length; i++){
    color = variantData[i]['name'].substring(variantData[i]['name']
                                  .lastIndexOf('-')+1,variantData[i]['name']
                                  .lastIndexOf('/')).trim();
    size = variantData[i]['name'].substring(variantData[i]['name']
                                  .lastIndexOf('/')+1).trim();
    if(size == sizeIN){
      colorCollection.push(color);
    }
  }
  var s01 = new Set(colorCollection);
  var s = Array.from(s01);
  var str = "";
  for(var i=0; i < s.length; i++){
    str += "'" + s[i].replace(/ /g,"^") + "',";
  }
  var s = str.trim().replace(/.$/,'');
  return s;
}

///////////////////////////////////////////////////////////////////////
//getPriceForSize - the size element needs access to relevant colors
function getPriceForSize(sizeIN, variantData){
  price = "33.00";
  for(var i=0; i < variantData.length; i++){
    price = variantData[i]['retail_price'];
    size = variantData[i]['name'].substring(variantData[i]['name']
                                  .lastIndexOf('/')+1).trim();
    if(size == sizeIN){
      return price;
    }
  }
  return price;
}


//////////////////////////////////////////////////////////
//addSizes - dealing with file info...
//
function addSizes(variantData, sfx, pSKEL){
    sizeButtons = "";
    sizeCollection = [];
    for(var i=0; i < variantData.length; i++){
      sw = false;
      sz = variantData[i]['name'].substring(variantData[i]['name']
                                  .lastIndexOf('/')+1).trim();
      for(var j=0; j < sizeCollection.length; j++){
        if(sizeCollection[j] == sz) sw = true;
        }
      if(sw) continue;
      sizeCollection.push(sz);
      }
      sizeCollectionSorted = sortSizes(sizeCollection);
      for(var i=0; i < sizeCollectionSorted.length; i++){
        colorList = getColorsForSize(sizeCollectionSorted[i], variantData);
        price = getPriceForSize(sizeCollectionSorted[i], variantData);
        sizeButtons += sizeTemplate.replace(/~size~/g, sizeCollectionSorted[i])
                                  .replace(/~sfx~/g, sfx)
                                  .replace(/~price~/g, addDecimal(price))
                                  .replace(/~allColors~/g, colorList);
        }
    pSKEL = pSKEL.replace("~size~array~",sizeButtons);
    return pSKEL;
}

///////////////////////////////////////////////////////////////////////
//getSizesForColor - the color element needs access to relevant sizes
function getSizesForColor(colorIN, variantData){
  sizeCollection = [];
  for(var i=0; i < variantData.length; i++){
    color = variantData[i]['name'].substring(variantData[i]['name']
                                  .lastIndexOf('-')+1,variantData[i]['name']
                                  .lastIndexOf('/')).trim();
    size = variantData[i]['name'].substring(variantData[i]['name']
                                  .lastIndexOf('/')+1).trim();
    variantID = variantData[i]['id'];
    if(color == colorIN.replace("\^",' ')){
      sizeCollection.push([size, variantID]);
    }
  }
  var s01 = new Set(sizeCollection);
  var s = Array.from(s01);
  var str1 = "";
  var str2 = "";
  for(var i=0; i < s.length; i++){
    if(str1) str1 += ",";
    str1 += "'" + s[i][0] + "'"
    if(str2) str2 += ",";
    str2 += "['" + s[i][0].trim() + "','" + s[i][1] + "']";
  }
  // console.log(str2);
  return [str1, '\"[' + str2 + ']\"'];
}

///////////////////////////////////////////////////////////////////////
//getSizesForColor - the color element needs access to relevant sizes
function getFilesForColor(colorIN, variantData){
  // fileCollection = [];
  fileCollection = {};
  for(var i=0; i < variantData.length; i++){
    color = variantData[i]['name'].substring(variantData[i]['name']
                                  .lastIndexOf('-')+1,variantData[i]['name']
                                  .lastIndexOf('/')).trim();
    for(var j=0; j < variantData[i]['files'].length; j++){
      fileCollection[variantData[i]['files'][j]['type']] = [variantData[i]['files'][j]['preview_url'],variantData[i]['files'][j]['thumbnail_url']];
    }
    if(!colorIN) colorIN = "White";
    if(color == colorIN.replace(/\^/g,' ')){
      // fileCollection.push(file);
      break;
    }
  }

  return fileCollection;
}


//////////////////////////////////////////////////////////
//changeImages - dealing with file info...
//
function changeImages(sfx, files, pSKEL){
  // console.log(files);
  var emptyBack = "./images/emptyBack.png";
  defaultFile = files['default'][0] ? files['default'][0] : "";
  var frontI = '~front~'+sfx;
  var backI = '~back~'+sfx;
  var defaultI = '~default~'+sfx;

  pSKEL = files['preview'] ? pSKEL.replace(frontI, files['preview'][0]) : pSKEL.replace(frontI, defaultFile);
  pSKEL = files['back'] ? pSKEL.replace(backI, files['back'][0]) : pSKEL.replace(backI, emptyBack);
  pSKEL = files['default'] ? pSKEL.replace(defaultI, files['default'][0]) : pSKEL.replace(defaultI, defaultFile);
  return pSKEL;
}


//////////////////////////////////////////////////////////
//createNewProduct - edit the SKEL for each product
//
function createNewProduct(sfx, side, data, variantData){
  var pSKEL = productSkel.replace(/~sfx~/g, sfx);
  var product = document.getElementById("product" + sfx);
  if(side){
    product.classList.remove('product');
    product.classList.add('product2');
  } else {
    product.classList.remove('product2');
    product.classList.add('product');
  }

  pSKEL = addSizes(variantData, sfx, pSKEL);
  pSKEL = addColors(variantData, sfx, pSKEL);
  pSKEL = addTitle(sfx, data['name'], pSKEL);
  pSKEL = keepProdID(sfx, data['id'], pSKEL);

  pSKEL = changeImages(sfx, getFilesForColor("", variantData), pSKEL);
  product.innerHTML = pSKEL;
  work = document.getElementById("product-list");
  work.appendChild(product);
}


//////////////////////////////////////////////////////////
//getVariantData
//

function getVariantData(apiData, prod){
    for(var i=0; i < apiData['Products'].length; i++){
      if(apiData['Products'][i]['sync_product']['id'] == prod){
        return apiData['Products'][i]['sync_variants'];
      }
    }
}
//////////////////////////////////////////////////////////
//buildPage
//

var PAGE_MAX = 9;
function buildPage(apiData){
  dropList = [170109245];
  // dropList = [169150005,170108821];

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
    getVariantData(apiData, apiData['ProductList'][j]['id'])
    createNewProduct(sfx,
              leftSide,
              apiData['ProductList'][j],
              getVariantData(apiData, apiData['ProductList'][j]['id'])
            );

    leftSide = flipSide(leftSide);
    if(count > PAGE_MAX) break;
  }
  // see dataCollection for details...
  // get list of countries/States
  // console.log("getting country info...");
  countryList = document.getElementById("countryList");
  apiCall(moveCountryData, "countries");
}
