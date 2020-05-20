function __doMail(type, email, callback) {
  // console.log([type, email, name, req]);
  var xhttp;
  var returnVal;
  var func = "";
  phpProg = "cgi-bin/email.php";

  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
      outData = this.responseText;
      // outDiv.innerHTML = outData;
      // this callback lets me fire two emails
      if(typeof(callback) == 'function'){
        callback(type, email);
      }
      returnVal = 0;
    }
    else
      returnVal = this.status;
  };

  xhttp.open("POST", phpProg, true);
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  if(typeof(callback) == 'function')
    xhttp.send("type=" + type + "&email=" + email);
  else
    xhttp.send("type=" + type + "&email=" + email + "&data=" + callback);
}

/////////////////////////////////////////////////////////
//@param type: 'thanks' or 'oops'
function doMail(type, email, callback){
  __doMail(type, email, callback);
}
