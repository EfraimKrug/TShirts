////////////////////////////////////////////////////////////////////
//logPayment - store all the payment details in my database
//@param total - total amount with tax and shipping 
//@param email - as reported by user
//@param details - response data from paypal...
//
function logPayment(total, email, details){

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

        ppLog("insert", outDiv, sendString.replace(/\s/g,""), function(){});
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

////////////////////////////////////////////////////////////////////
//actionAfterPayment - paid and done...
//@param USDamount -
//@param total - amount billed
//@param email - as sent in from order form
//@param details - response data from paypal...
//@side effect - throws user to new window...
//
function actionAfterPayment(USDamount, total, email, details){
  PAYMENT_BEING_PROCESSED = false;
  getReadyForPayPal(0); //close data collection form
  paypalElt = document.getElementById("paypalElt"); // close paypal buttons
  paypalElt.style.display="none";
  if(detail.amtPaid >= total){
    logPayment(total, email, details);
    window.open("https://NameThatThing.site/paidThanks.html?AMOUNT=" + total + "&email" + email + "_blank", "resizable=yes");
  } else {
    window.open("https://NameThatThing.site/paidOops.html?AMOUNT=" + total + "&email" + email + "_blank", "resizable=yes");
  }
}

function __setUpPayPal(total, email){
  actionAfterPayment(total, email);
}

function extractData(obj, key, value){
    obj[key] = value;
    return obj;
}

function setUpPayPal(total, email){
    // console.log("setUpPayPal:");
    // console.log([total,email]);
    var output = document.getElementById("output");
    var USDamount = total ? total : '18.00';

    paypal.Buttons({
        style: {
            shape: 'pill',
            color: 'gold',
            layout: 'horizontal',
            label: 'pay',

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
        }
         onCancel: function (data) {
                cancelAction();
        }
    }).render('#paypal-button-container');

}
