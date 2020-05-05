////////////////////////////////////////////////////////////////////
//logPayment - store all the payment details in my database
//@param total - total amount with tax and shipping
//@param email - as reported by user
//@param details - response data from paypal...
//
function logPayment(total, email, details){
      // console.log("logPayment");
      var sendString =  "amtPaid=" + details["amtPaid"] +
                        "&pmtStatus=" + details["pmtStatus"] +
                        "&firstName=" + details["firstName"].replace(/\s/g,"*") +
                        "&lastName=" + details["lastName"].replace(/\s/g,"*") +
                        "&email=" + details["email"].replace(/\s/g,"*") +
                        "&address_line_1=" + details["address_line_1"].replace(/\s/g,"*") +
                        "&address_line_2=" + details["address_line_2"].replace(/\s/g,"*") +
                        "&city=" + details["city"].replace(/\s/g,"*") +
                        "&state=" + details["state"].replace(/\s/g,"*") +
                        "&postal_code=" + details["postal_code"].replace(/\s/g,"*") +
                        "&country_code=" + details["country_code"].replace(/\s/g,"*") +
                        "&reference_id=" + details["reference_id"] +
                        "&id=" + details["id"] +
                        "&totalCharged=" + total +
                        "&oldEmail=" + email;

        // var orderKeys = getOrderKeys();
        // console.log(orderKeys);
        ppLog("insert", outDiv, sendString.replace(/\s/g,""), function(){});
        // for(var i=0; i < orderKeys.length; i++){
        //   console.log("update: " + i);
        markOrderPaid(total, email, details.amtPaid);
        // }
}

//////////////////////////////////////////////////////////////////////////////
//markOrderPaid - kicks off a 3 function series of callbacks
//@param email - email supplied by user on dataentry form
//@param amtPaid - total amount paid from paypal
//@param total - amount paid with out tax or shipping costs
//
var orderTotal = 0;
var emailPass = "";
function markOrderPaid(total, email, amtPaid){
  // console.log("markOrderPaid");
  // console.log(outDiv.innerHTML);
  // get last accountID by email
  // get orders by accountID
  // add up totals ... check amounts... mark paid
  emailPass = email;
  orderTotal = total;
  dbAccount("select", outDiv, "email=" + email, getOrders);
}

function getOrders(){
  // console.log(outDiv.innerHTML);
  // var outDiv = document.getElementById("outdiv");
  accountData = outDiv.innerHTML;
  // console.log("accountID=" + accountData);
  dbOrder("select", outDiv, "accountID=" + accountData, updateOrders);
}

function updateOrders(){
  // var outDiv = document.getElementById("outdiv");
  // console.log(outDiv.innerHTML);
  orderData = JSON.parse(outDiv.innerHTML);
  totalDue = 0;
  for (i=0; i < orderData.length; i++){
    totalDue += (parseInt(orderData[i]['price']) * parseInt(orderData[i]['Number']));
  }
  // console.log("total: " + totalDue + ":db-total:" + orderTotal);
  if (totalDue > orderTotal){
    // alert("something went wrong with the payment!");
    doMail("oops", emailPass, function(){});
    console.log("something went wrong with the payment amount");
  } else {
    doMail("thanks", emailPass, function(){});
  }

  for (i=0; i < orderData.length; i++){
    // console.log("updating: " + orderData[i]['orderID']);
    dbOrder("update", outDiv, "orderID=" + orderData[i]['orderID'] + "&paidFlag=1", function(){});
  }
}

////////////////////////////////////////////////////////////////////
//cancelAction - user canceled out of payment
//
function cancelAction(){
  PAYMENT_BEING_PROCESSED = false;
  getReadyForPayPal(0); //close data collection form
  paypalElt = document.getElementById("paypalElt"); // close paypal buttons
  paypalElt.style.display="none";
}

///////////////////////////////////////////////////////////////////
// This is the side-effect from storeOrder
//@return the database key to the users order
//now we need to mark it paid (if it is indeed paid)
//
// function getOrderKeys(){
//   // var outDiv = document.getElementById("outdiv");
//   // orderKey = outDiv.innerHTML;
//   return orderIDCollection;
// }
////////////////////////////////////////////////////////////////////
//actionAfterPayment - paid and done...
//@param USDamount -
//@param total - amount billed
//@param email - as sent in from order form
//@param details - response data from paypal...
//@side effect - throws user to new window...
//
function actionAfterPayment(USDamount, total, email, details){
  // console.log("actionAfterPayment");
  PAYMENT_BEING_PROCESSED = false;
  getReadyForPayPal(0); //close data collection form
  paypalElt = document.getElementById("paypalElt"); // close paypal buttons
  paypalElt.style.display="none";
  if(details.amtPaid >= total){
    apiCall(outDiv, function(){}, "order", 0);
    logPayment(total, email, details);
    window.open("https://NameThatThing.site/paidThanks.html?AMOUNT=" + total + "&email" + email + "_blank,resizable=yes");
  } else {
    window.open("https://NameThatThing.site/paidOops.html?AMOUNT=" + total + "&email" + email + "_blank,resizable=yes");
  }
}

function setUpPayPal(total, email){
  details = {};
  details.amtPaid = total;
  details.pmtStatus = "TESTSTATUS";
  details.firstName = "Efraim";
  details.lastName = "Krug";
  details.email = "TestEmail@gmail.com";
  details.address_line_1 = "323 Test address";
  details.address_line_2 = "Building #3/4";
  details.city = "Los Angeles";
  details.state = "CA";
  details.postal_code = "90003";
  details.country_code = "US";
  details.reference_id =  "Very-Long-Reference-ID";
  details.id =  "999999999";

  actionAfterPayment(0, total, email, details);
}

function extractData(obj, key, value){
    obj[key] = value;
    return obj;
}

function __setUpPayPal(total, email){
    // console.log("setUpPayPal:");
    // console.log([total,email]);
    var output = document.getElementById("output");
    var USDamount = total ? total : '18.00';

    paypal.Buttons({
        style: {
            shape: 'pill',
            color: 'blue',
            layout: 'horizontal',
            label: 'paypal',
            tagline: 'true'
        },
        createOrder: function(data, actions) {
            // console.log(data);
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: USDamount
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            // console.log(data);
            return actions.order.capture().then(function(details) {
                var detailsJSON = JSON.parse(details);
                var obj = extractData({}, "amtPaid",detailsJSON.purchase_units[0].payments.captures[0].amount.value);
                    obj = extractData(obj,"pmtStatus",detailsJSON.purchase_units[0].payments.captures[0].status);
                    obj = extractData(obj,"firstName", detailsJSON.payer.name.given_name);
                    obj = extractData(obj,"lastName", detailsJSON.payer.name.surname);
                    obj = extractData(obj,"email", detailsJSON.payer.email_address);
                    obj = extractData(obj,"address_line_1", detailsJSON.purchase_units[0].shipping.address.address_line_1);
                    obj = extractData(obj,"address_line_2", detailsJSON.purchase_units[0].shipping.address.address_line_2);
                    obj = extractData(obj,"city", detailsJSON.purchase_units[0].shipping.address.admin_area_2);
                    obj = extractData(obj,"state", detailsJSON.purchase_units[0].shipping.address.admin_area_1);
                    obj = extractData(obj,"postal_code", detailsJSON.purchase_units[0].shipping.address.postal_code);
                    obj = extractData(obj,"country_code", detailsJSON.purchase_units[0].shipping.address.country_code);
                    obj = extractData(obj,"reference_id", detailsJSON.purchase_units[0].reference_id);
                    obj = extractData(obj,"id", detailsJSON.id);

                actionAfterPayment(USDamount, total, email, obj);
                //output.innerHTML = "[" + details.payer.name.given_name + "][" + details.purchase_units[0].payments.captures[0].amount.value  + "][" + details.purchase_units[0].payments.captures[0].amount.currency_code + "]";
                //window.open("https://NameThatThing.site/paidDonation.html?AMOUNT=" + USDamount + "&PID=" + pid + "&OID=" + oid + "&YahrID=" + yid, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
            });
        },
         onCancel: function (data) {
                cancelAction();
        }
    }).render('#paypal-button-container');

}
