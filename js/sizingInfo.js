////////////////////////////////////////////////////////////
//There are three images the user may click through in
//order to display sizing info. This file is that.
//
//There are three images: first:  "click here for sizing"
//                        second: a picture how to measure, and
//                        third:  a chart of sizes - to measure
//
////////////////////////////////////////////////////////////

IMAGE_SHOWING = "label";
function openSizes(){
  changeBody();
  // body = document.getElementById("product-list");
  // body.onclick = closeAllSizing();
  if(IMAGE_SHOWING == "picture"){
    sizeChart = document.getElementById("sizeChart");
    sizeChart.style.visibility = 'visible';
    sizeChart.style.display = "block";
    IMAGE_SHOWING = "chart";
  }
  if(IMAGE_SHOWING == "label"){
    sizePic = document.getElementById("sizePic");
    sizePic.style.visibility = 'visible';
    sizePic.style.display = "block";
    labelPic = document.getElementById("labelPic");
    labelPic.style.visibility = 'hidden';
    IMAGE_SHOWING = "picture";
  }
  if(IMAGE_SHOWING == "pictureDown"){
    labelPic = document.getElementById("labelPic");
    labelPic.style.visibility = 'visible';
    labelPic.style.display = "block";
    sizePic = document.getElementById("sizePic");
    sizePic.style.visibility = 'hidden';
    IMAGE_SHOWING = "label";
  }
}

function closeSizes(){
  sizeChart = document.getElementById("sizeChart");
  sizeChart.style.visibility = 'hidden';
  IMAGE_SHOWING = "pictureDown";
}

function changeBody(){
  var body = document.getElementById('product-list');
  var sizingWork = document.getElementById('sizingWork');

  body.addEventListener("click", closeAllSizing);
  // body.addEventListener("click", function ELClose () {
  //   closeAllSizing();
  //   }, false);
  sizingWork.addEventListener("click", function (ev) {
    // alert("sizingWork");
    ev.stopPropagation(); //this is important! If removed, you'll get both alerts
    }, false);

}
/////////////////////////////////////////////////////////
//closeAllSizing
//@fired - from click on body - return to normal
//
function closeAllSizing(){
  IMAGE_SHOWING = "label";
  var body = document.getElementById('product-list');
  body.removeEventListener("click", closeAllSizing);
  // body.onclick = "";
  //
  sizeChart = document.getElementById("sizeChart");
  sizeChart.style.display = "none";

  sizePic = document.getElementById("sizePic");
  sizePic.style.display = "none";

  labelPic = document.getElementById("labelPic");
  labelPic.style.display = "block";
  labelPic.style.visibility = 'visible';
}
/////////////////////////////////////////////////////////////
//turnOffSizing
//
function turnOffSizing(){
  sizeChart = document.getElementById("sizeChart");
  sizeChart.style.display = "none";

  labelPic = document.getElementById("labelPic");
  labelPic.style.display = "none";

  sizePic = document.getElementById("sizePic");
  sizePic.style.display = "none";

}
