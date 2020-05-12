// var happyDoc = "happy ducks";
var productSkel = "<div class='large-12 cell'>      " +
 "<div class='grid-x grid-padding-x'>                " +
   "<div class='large-4 medium-4 cell'>              " +
     "<div class=priceBar>                           " +
      "<div id=productNumber~sfx~ class=productNumber>~prodNum~</div>     " +
       "<div id=shirtName~sfx~ class=shirtType>~name~</div>      " +
          "<div id=count~sfx~>                       " +
          "<select class=oneColumn id='select~sfx~'> " +
          "<option value='0' selected>0</option>     " +
          "<option value='1'>1</option>              " +
          "<option value='2'>2</option>              " +
          "<option value='3'>3</option>              " +
          "<option value='4'>4</option>              " +
          "<option value='5'>5</option>              " +
          "</select>                                 " +
          "</div>    " +
       "<div id=priceTag~sfx~> </div> <div id=size~sfx~> </div> <div id=color~sfx~> </div>     " +
     "</div>         " +
    "</div>          " +
  "</div>            " +
"" +
  "<div class='grid-x grid-padding-x'>               " +
    "<div class='large-8 medium-8 cell'>             " +
      "<div id=titleBar~sfx~>                        " +
        "<div class=sideBy></div>                    " +
          "~size~array~                              " +
        "</div>                                      " +
     "</div>                                         " +
     "<div class='large-8 medium-8 cell'>            " +
       "<div id=colorBar-00>                         " +
         "<div class=sideBy></div>                   " +
         "~color~array~                              " +
         "</div>                                     " +
      "</div>                                        " +
"" +
   "</div>                                           " +
"" +
   "<div class='grid-x grid-padding-x'>              " +
     "<div class='large-8 medium-8 cell'>            " +
       "<div id=showBar~sfx~>                        " +
          "<div class=sideBy>                        " +
             "<div class=sideBy onclick=\"showBack(1, '~sfx~')\" onmouseover=\"showBack(0, '~sfx~')\" onmouseout=\"hideBack('~sfx~')\">  " +
               "<img id=frontImg~sfx~ class=front src='~front~'/>                                           " +
             "</div>                                   " +
             "<div id=back~sfx~ class='sideBy noshow'> " +
                 "<img id=backImg~sfx~ class=back src='~back~'/>                                " +
             "</div>                                   " +
           "</div>                                     " +
       "</div>                                         " +
      "</div>                                          " +
    "</div>                                            " +
"" +
"" +
  "<div class='grid-x grid-padding-x'>                  " +
      "<div class='large-4 medium-4 small-4 cell'>      " +
      "</div>                                           " +
      "<div class='large-4 medium-4 small-4 cell'>      " +
      "</div>                                           " +
    "</div>                                             " +
    "<div class='grid-x grid-padding-x'>                " +
      "<div class='large-4 medium-4 small-4 cell'>      " +
      "</div>                                           " +
    "</div>                                             " +
   "<div class='grid-x grid-padding-x'>                 " +
       "<div class='large-4 medium-4 small-4 cell'>     " +
         "<div id=sButton~sfx~ class=submitButton onclick=\"submitForm('~sfx~');\">Add to Cart</div>   " +
       "</div>                                          " +
    "</div>                                             " +
  "</div>";
