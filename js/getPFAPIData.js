///////////////////////////////////////////////////////////////////////////
//getOrderEstimate - api call to printful.com
//asynchronous process: put return into OUT_DIV_2
//@param outShipping - output area for data on html page
//@param data - formed post string e.g. id=1&var=2&...
//@param callback - where next?
//
//

function getPFApiData(finalFunc){
  var dataCollection = {};
  var productTotal = 0;
  var finalFunk = finalFunc;

  var APIFunk = {

    getOrderEstimate: function(data, callback){
      apiCall(callback, "estimate", data);
    },
    getEachProd:function(apiData){
        var listJ = JSON.parse(apiData.trim());
        dataCollection['ProductList'] = listJ;
        dataCollection['Products'] = [];
        productTotal = listJ.length;
        for (var i=0; i < listJ.length; i++){
          apiCall(APIFunk.getTheProd, "product", listJ[i]["id"]);
        }
      },

    getTheProd:function(apiData){
        var listJ = JSON.parse(apiData);
        dataCollection['Products'].push(listJ);
        productTotal--;
        if(!productTotal) finalFunk(dataCollection);
      },

    getProdList:function(){
        apiCall(APIFunk.getEachProd);
      }

  };
  return APIFunk;
}
