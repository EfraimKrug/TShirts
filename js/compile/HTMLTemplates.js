var productSkel = "<!-- begin product~sfx~ -->" +
"      <!-- this is where the product goes -->" +
"      <!-- start copy here -->" +
"              <div  id='product~sfx~'>" +
"                <div id=colorBar~sfx~><!-- id should be 'colorBar~sfx~' -->" +
"                       ~color~array~                      " +
"                </div>" +
"                <div id=titleBar~sfx~><!-- id should be 'titleBar~sfx~' -->" +
"                       ~size~array~                        " +
"                </div>" +
"                  <div>" +
"                    <div id=productNumber~sfx~ class=productNumber>~prodNum~</div>" +
"                    <div id=size~sfx~> </div>" +
"                    <div id=priceTag~sfx~> </div>" +
"                    <div id=shirtName~sfx~ class=shirtType> ~name~ </div>" +
"                    <div id=externalID~sfx~ class=externalID onclick='displayProductDescription(~prodNum~)'>Description</div>" +
"                  </div>" +
"" +
"                <div>" +
"                  <div id=color~sfx~ allVariantSizes=> </div>" +
"                  <label>How many?</label>" +
"                  <select id='select~sfx~'>" +
"                    <option value='0'>0</option>" +
"                    <option value='1'>1</option>" +
"                    <option value='2'>2</option>" +
"                    <option value='3'>3</option>" +
"                    <option value='4'>4</option>" +
"                    <option value='5'>5</option>" +
"                  </select>" +
"                </div>" +
"              <!-- beginning of the picture and order button section -->" +
 "           <div>  <div class=bgblack class='sideBy'> " +
"                    <!-- <div class=sideBy onclick='showBack(1, \"~sfx~\")' onmouseover='showBack(0, \"~sfx~\")' onmouseout='hideBack(\"~sfx~\")'> -->" +
"                    <div id=front~sfx~ class=sideBy onclick='font2back(\"~sfx~\")' >" +
"                      <img id=frontImg~sfx~ src='~front~~sfx~'/>" +
"                    </div>" +
"" +
"                     <div id=back~sfx~ class='sideBy noshow'  onclick='font2back(\"~sfx~\")' >" +
"                        <img id=backImg~sfx~ class=back src='~back~~sfx~'/>" +
"                        <span id=shirtBack~sfx~ class='shirtBack noshow'>(Back)</span>" +
"                     </div>" +
"                     </div>" +
"" +
"              </div>" +
 "              </div>  " +
"              <div id=sButton~sfx~ class=submitButton onclick='submitForm(\"~sfx~\", false);'>Add to Cart</div>" +
"              <!-- end of the picture and order button section -->" +
"" +
"" +
"<!-- end product~sfx~ -->'" +
"<div id=bigPicture~sfx~></div>";

var colorTemplate = "<div id='Color-~iter~~sfx~' class='colorButton'" +
" onclick=\"scoreColorButton('Color~col~~sfx~','~color~',[~allSizes~]); \" " +
" hexval=#~hex~ prodid='#5e9ca2eb6aa6f5' default~sfx~='~defaultFile~' back~sfx~='~backFile~' preview~sfx~='~previewFile~' " +
" allVariantSizes=~allVariantSizes~ style='background:~rgb~ " +
" none repeat scroll 0% 0%; color: ~rgb~ ;" +
" border: 2px solid ~brdColor~; padding: 3px;'>Co</div>";

var sizeTemplate = "<div id='~size~~sfx~' class='sizeButton'" +
" onclick=\"scoreButton('~size~~sfx~',[~allColors~]);\" " +
" prodid='#5e9ca2eb6aa6f5' price='~price~' " +
" style='background: ~bgcolor~ none repeat scroll 0% 0%; color: ~color~;'>~size~ </div>";
