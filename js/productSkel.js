var productSkel = "<!-- begin product~sfx~ -->" +
"<div  id='product~sfx~' class='large-8 medium-8 cell'>" +
"<div class='grid-x grid-padding-x'>" +
"  <div class='large-5 medium-5 cell'>" +
"    <div class='primary callout'>" +
"      <!-- this is where the product goes -->" +
"      <!-- start copy here -->" +
"              <div  id='product~sfx~' class='large-12 medium-12 cell'>" +
"                <div id=colorBar~sfx~><!-- id should be 'colorBar~sfx~' -->" +
"                       ~color~array~                      " +
"                </div>" +
"                <div id=titleBar~sfx~><!-- id should be 'titleBar~sfx~' -->" +
"                       ~size~array~                        " +
"                </div>" +
"              <div class='grid-x grid-padding-x'>" +
"                <div class='large-8 cell'>" +
"                  <div class='primary callout'>" +
"" +
"                    <div id=productNumber~sfx~ class=productNumber>~prodNum~</div>" +
"                    <div id=size~sfx~> </div>" +
"                    <div id=priceTag~sfx~> </div>" +
"                    <div id=shirtName~sfx~ class=shirtType> ~name~ </div>" +
"                    <div id=externalID~sfx~ class=externalID>#~externalID~ </div>" +
"                  </div>" +
"                </div>" +
"" +
"                <div class='large-4 cell'>" +
"                  <div id=color~sfx~> </div>" +
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
"              </div>" +
"              <!-- beginning of the picture and order button section -->" +
 "           <div class='grid-x grid-padding-x'>  <div class='large-8 medium-8 cell sideBy'> " +
"                    <div class=sideBy onclick='showBack(1, \"~sfx~\")' onmouseover='showBack(0, \"~sfx~\")' onmouseout='hideBack(\"~sfx~\")'>" +
"                      <img id=frontImg~sfx~ src='~front~'/>" +
"                    </div>" +
 "              </div>  " +
 "              <div class='large-4 medium-4 cell sideBy'>" +
 "              <div id=back~sfx~ class='sideBy noshow'>" +
 "                <img id=backImg~sfx~ class=back src='~back~'/>" +
 "              </div><span id=shirtBack~sfx~ class='shirtBack noshow'>(Back)</span>" +
 "              </div>" +
 "              </div>" +
 "              </div>" +
 "              </div>" +
 "              </div>" +
 "              </div>" +
"              <div id=sButton~sfx~ class=submitButton onclick='submitForm(\"~sfx~\");'>Add to Cart</div>" +
"              <!-- end of the picture and order button section -->" +
"" +
"" +
"<hr />" +
"</div><!-- end product~sfx~ -->'";
