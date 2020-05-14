function getDesc(desc){
  var descData = desc;
  var DescFunk = {
    getProdIDs:function(){
        var arr=[];
        for(var i=0; i < descData.length;i++){
          arr.push(descData[i].ProdID);
        }
        return arr;
      },
      getProdName:function(prodID){
        var desc = "";
        for(var i=0; i < descData.length;i++){
          if(prodID == descData[i].ProdID){
            desc = descData[i].Name;
          }
        }
        return desc;
      },
      getProdMyName:function(prodID){
        var desc = "";
        for(var i=0; i < descData.length;i++){
          if(prodID == descData[i].ProdID){
            desc = descData[i].MyName;
          }
        }
        return desc;
      },
      getProdBullets:function(prodID){
        var arr = [];
        for(var i=0; i < descData.length;i++){
          if(prodID == descData[i].ProdID){
            arr = descData[i].Description.Bullets;
          }
        }
        return arr;
      },
    getProdDesc:function(prodID){
      var desc = "";
      for(var i=0; i < descData.length;i++){
        if(prodID == descData[i].ProdID){
          desc = descData[i].Description.Text;
        }
      }
      return desc;
    }
  };
  return DescFunk;
}
