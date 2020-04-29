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

function actionAfterPayment(total, email, details){
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
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: USDamount
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details_return) {
                var details = JSON.parse(details_return);
                var obj = extractData({}, "amtPaid",details.purchase_units[0].payments.captures[0].amount.value);
                    obj = extractData(obj,"pmtStatus",details.purchase_units[0].payments.captures[0].status);
                    obj = extractData(obj,"firstName", details.payer.name.given_name);
                    obj = extractData(obj,"lastName", details.payer.name.surname);
                    obj = extractData(obj,"email", details.payer.email_address);
                    obj = extractData(obj,"address_line_1", details.purchase_units[0].shipping.address.address_line_1);
                    obj = extractData(obj,"address_line_2", details.purchase_units[0].shipping.address.address_line_2);
                    obj = extractData(obj,"city", details.purchase_units[0].shipping.address.admin_area_2);
                    obj = extractData(obj,"state", details.purchase_units[0].shipping.address.admin_area_1);
                    obj = extractData(obj,"postal_code", details.purchase_units[0].shipping.address.postal_code);
                    obj = extractData(obj,"country_code", details.purchase_units[0].shipping.address.country_code);
                    obj = extractData(obj,"reference_id", details.purchase_units[0].reference_id);
                    obj = extractData(obj,"id", details.id);

                actionAfterPayment(USDamount, total, email, obj);
                //output.innerHTML = "[" + details.payer.name.given_name + "][" + details.purchase_units[0].payments.captures[0].amount.value  + "][" + details.purchase_units[0].payments.captures[0].amount.currency_code + "]";
                //window.open("https://NameThatThing.site/paidDonation.html?AMOUNT=" + USDamount + "&PID=" + pid + "&OID=" + oid + "&YahrID=" + yid, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
            });
        }
    }).render('#paypal-button-container');

}
