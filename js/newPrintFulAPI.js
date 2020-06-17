/////////////////////////////////////////////////////////////////
//apiCall
//callback - is the function to call back to at the end...
//           this function must accommodate the data return
//@param level - guides the program
//@param id - usually an id, for 'orders' it is an object
//
//usage:
//x = doApiCall(callback, "level", "id").setupCall();
//x.xhttpSend();
//
function doApiCall(callback, level="list", idInk=0, prefix=""){
    console.log("doApiCall");
    var APIFunk = {
      headerParam:"application/x-www-form-urlencoded",
      holdOrderForLater:"",
      phpProg:"",
      parms:"",

      xhttp:"",
      returnVal:"",
      outData:"",
      idIn:idInk,
      prefx:prefix,
      setupCall: function(){
        switch(level){
          case "list":      APIFunk.setParms("apiProductList", "");
                            break;
          case "product":   APIFunk.setParms("apiProduct", "ID=" + this.idIn);
                            break;
          case "variant":   APIFunk.setParms("apiVariant", "ID=" + this.idIn);
                            break;
          case "files":     APIFunk.setParms("apiETC", "path=files&ID=" + this.idIn);
                            break;
          case "estimate":  APIFunk.setParms("apiOrderEstimate", JSON.stringify(this.idIn).replace(/{/g, "[~").replace(/}/g,"~]"));
                            this.holdOrderForLater = this.parms;
                            break;
          case "order":     APIFunk.setParms("apiOrder", this.holdOrderForLater);
                            this.holdOrderForLater = "";
                            break;
          case "countries": APIFunk.setParms("apiCountries", "");
                            break;
                      };
                    },
          setParms:function(phpP, parmsIN){
              if(this.prefx) phpP = this.prefx + phpP.substring(0,1).toUpperCase() + phpP.substring(1);
              this.phpProg = "cgi-bin/" + phpP + ".php";
              console.log(this.phpProg);
              this.parms = parmsIN;
              console.log(this.parms);
            },
          xhttpSend:function(){
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200){
                this.outData = this.responseText;
                if (this.outData.indexOf("Exception") < 0)
                  if(typeof(callback) == 'function'){ callback(this.outData); }
                returnVal = 0;
              }
              else
                returnVal = this.status;
            };
            xhttp.open("POST", this.phpProg, true);
            xhttp.setRequestHeader("Content-Type", this.headerParam);
            xhttp.send(this.parms);
            }
          };
  return APIFunk;
}

function apiCall(callback, level="list", id=0, prefix="new"){
  console.log("apiCall");
  var apiC = doApiCall(callback, level, id, prefix);
  apiC.setupCall();
  apiC.xhttpSend();
}
