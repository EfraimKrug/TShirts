////////////////////////////////////////////////////////////////
// Required HTML:
// <div id=pdsbDesc0 onclick="closeDesc();">
// <div id=pdsbDesc1></div>
// <div id=pdsbDesc2></div>
// <div id=pdsbDesc3></div>
// </div>
////////////////////////////////////////////////////////////////
//layoutDesc
//@param name: printful name of product as they sell it
//@param myname: what i call it on my website
//@param bullets: descripton bullet points
//@param desc: short description of product
//
function layoutDesc(name,myname,bullets,desc){
    var pdsbDesc0 = document.getElementById("pdsbDesc0");
    var pdsbDesc1 = document.getElementById("pdsbDesc1");
    var pdsbDesc2 = document.getElementById("pdsbDesc2");
    var pdsbDesc3 = document.getElementById("pdsbDesc3");

    pdsbDesc1.innerHTML = name + " (" + myname + ")";
    pdsbDesc2.innerHTML = desc;
    pdsbDesc3.innerHTML = "<ul>";
    for(var i=0; i < bullets.length; i++){
      pdsbDesc3.innerHTML += "<li>" + bullets[i] + "</li>";
    }
    pdsbDesc3.innerHTML += "</ul>";
}

////////////////////////////////////////////////////////////////
//formatProdDesc
//@param prodID: product id - for all variants
//
function formatProdDesc(prodID){
  var name = _$Desc.getProdName(prodID);
  var myname = _$Desc.getProdMyName(prodID);
  var bullets = _$Desc.getProdBullets(prodID);
  var desc = _$Desc.getProdDesc(prodID);
  layoutDesc(name,myname,bullets,desc);
}

////////////////////////////////////////////////////////////////
//closeDesc - closes description window...
//
function closeDesc(){
  var pdsbDesc0 = document.getElementById("pdsbDesc0");
  pdsbDesc0.style.display = 'none';
}

///////////////////////////////////////////////////////////////////
//openDesc - opens description window... called from click source
//
function openDesc(){
  var pdsbDesc0 = document.getElementById("pdsbDesc0");
  pdsbDesc0.style.display = 'block';
}

///////////////////////////////////////////////////////////////////
//placeMent - places description window...
//
function placeMent(){
  var pdsbDesc0 = document.getElementById("pdsbDesc0");
  pdsbDesc0.style.top = "10%";
  pdsbDesc0.style.left = "10%";
}
