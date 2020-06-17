
menuBar = document.getElementById("menuBar");
if(menuBar){
  menuBar.style.visibility = 'visible';
  menuBar.style.display = 'block';
}

function scrollPage(){
  var scrollDownMsg = document.getElementById("scrollDownMsg");
  scrollDownMsg.innerHTML = "Scroll!";
  scrollscrollDownMsg.style.color = "red";
}


function getChart(){
    var altMenuTable = document.getElementById("altMenuTable");
    if(altMenuTable.rows.length > 1){
      altMenuTable.deleteRow(1);
      altMenuTable.deleteRow(0);
    }
    altMenuTable.style.display = "block";
    altMenuTable.style.left = "20%";
    altMenuTable.style.width = "10%";
    row0 = altMenuTable.insertRow(0);
    cell0 = row0.insertCell(0);
    cell0.innerHTML = "<a href=charts.html>United States</a>";
    row1 = altMenuTable.insertRow(1);
    cell1 = row1.insertCell(0);
    cell1.innerHTML = "<a href=chartsWorld.html>World</a>";
}

function getMerch(){
    var altMenuTable = document.getElementById("altMenuTable");
    if(altMenuTable.rows.length > 1){
      altMenuTable.deleteRow(1);
      altMenuTable.deleteRow(0);
    }
    altMenuTable.style.display = "block";
    altMenuTable.style.left = "30%";
    altMenuTable.style.width = "10%";
    row0 = altMenuTable.insertRow(0);
    cell0 = row0.insertCell(0);
    cell0.innerHTML = "<a href=PDSocialBonding.html>Shirts</a>";
    row1 = altMenuTable.insertRow(1);
    cell1 = row1.insertCell(0);
    cell1.innerHTML = "<a href=newPDSocialBonding.html>Other Stuff</a>";
}
