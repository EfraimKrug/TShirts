function displayProductDescription(a){formatProdDesc(a);openDesc();placeMent()}function checkFields(a){a=getButtonList(a);for(i=0;i<a.length;i++)if(a[i]&&a[i].chosen)return a[i]}function calcShoppingCartTotal(a){document.getElementById("shoppingCart");for(var c=0,b=1;b<shoppingTable.rows.length;b++)c+=parseInt(100*shoppingTable.rows[b].cells[4].innerHTML);return a?"Total: $"+addDecimal(c/100):addDecimal(c/100)}var cartHeight=10;
function addLine(a,c,b,e,k,f){if(!PAYMENT_BEING_PROCESSED){var h=document.getElementById("shoppingTable"),l=document.getElementById("shoppingCart"),p=document.getElementById("total");l.style.visibility="visible";var d=h.insertRow(1),m=d.insertCell(0),q=d.insertCell(1),r=d.insertCell(2),t=d.insertCell(3),u=d.insertCell(4),g=d.insertCell(5);d=d.insertCell(6);d.style.display="none";e=e.replace("$","");var n=parseInt(e*c*100);n/=100;m.innerHTML="<span id=lineItem-"+h.rows.length+" class='decreaseCount' onclick=decreaseBuy("+
h.rows.length+")>"+a+"</span>";m.className="leftAlign";q.innerHTML=c;r.innerHTML=b;t.innerHTML=e;u.innerHTML=addDecimal(n);g.innerHTML=f;g.style.background="#"+getHex(f);g.style.color=getText(getHex(f));g.style.border="3px solid white";d.innerHTML=k;cartHeight+=24;34==cartHeight&&(cartHeight+=48);p.innerHTML=calcShoppingCartTotal(!0);l.style.height=cartHeight+"px";screenDim=getScreenDimenstions();600>screenDim[0]&&window.open("PDSBCart.html?type="+a.replace(/\s/g,"^")+"&count="+c+"&size="+b+"&price="+
e+"&prodID="+k+"&color="+f.replace(/\s/g,"^"),"_self")}}
function decreaseBuy(a){if(!PAYMENT_BEING_PROCESSED){document.getElementById("shoppingCart");a=shoppingTable.rows.length-a+1;var c=document.getElementById("total");0<shoppingTable.rows[a].cells[1].innerHTML&&(shoppingTable.rows[a].cells[1].innerHTML=parseInt(shoppingTable.rows[a].cells[1].innerHTML)-1,cost=100*shoppingTable.rows[a].cells[3].innerHTML,price=shoppingTable.rows[a].cells[1].innerHTML*cost,price/=100,shoppingTable.rows[a].cells[4].innerHTML=addDecimal(price));c.innerHTML=calcShoppingCartTotal(!0)}}
function submitForm(a,c){if(!PAYMENT_BEING_PROCESSED){var b=document.getElementById("payButton"),e=document.getElementById("sButton"+a);b.disabled=!1;if(c)document.getElementById("productNumber"+a);else{buttonR=checkFields(a);if(!buttonR)return;buttonR.getAttribute("prodID");size=buttonR.innerHTML;price=buttonR.getAttribute("price")}document.getElementById("externalID"+a);b=document.getElementById("color"+a);if(c=b.innerHTML){b=b.getAttribute("allvariantsizes");variantID=0;cHoldArray=eval(b);for(b=
0;b<cHoldArray.length;b++)cHoldArray[b][0]==size.trim()&&(variantID=cHoldArray[b][1]);productValues=getValues(a);parseInt(productValues[1])&&(addLine(productValues[0],productValues[1],size,price,variantID,c),e.classList.add("elementFade"),turnOffSizing())}}};