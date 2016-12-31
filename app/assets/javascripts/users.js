/* global $, Stripe */

// Document ready
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-signup-btn');
// Set our Stripe public key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
// When users clicks submit button we''l prevent it from submitting and collect credit card fields, 
//and send it of to Stripe, then Stripe will send us a "card token", then we need to 
//inject the "card token" as hidden field in form, then submit form'
  submitBtn.click(function(event){
  event.preventDefault();
//grey's out submit btn while it processes stripe token
  submitBtn.val("Processimg").prop('disabled', true);
  
//credit crad fields
  var ccNum = $('#card_number').val(),
      cvcNum =  $('#card_code').val(),
      expMonth = $('#card_month').val(),
      expYear = $('#card_year').val();
      
//check stripe for errors
    var error = false;
    
//validate cc nunber using stripe js    
    if (!Stripe.card.validateCardNumber(ccNum)) {
      error = true;
      alert("The credit card seems to be invalid.");
    }
    
//validate cvc nunber using stripe js    
    if (!Stripe.card.validateCVC(cvcNum)) {
      error = true;
      alert("The CVC seems to be invalid.");
    }
    
//validate exp Date using stripe js    
    if (!Stripe.card.validateExpiry(expMonth, expYear)) {
      error = true;
      alert("The exp Date seems to be invalid.");
    }

//if any errors dont sen to stripe
   if (error) {
     submitBtn.prop('disabled', false).val("Sign Up");
   } else {
//send to stripe
      Stripe.createToken({
      number: ccNum,
      cvc: cvcNum,
      exp_month: expMonth,
      exp_year: expYear
    }, stripeResponseHandler);
   }   
   
 return false;
  });
  
  function stripeResponseHandler(status, response) {
// get token from response
    var token = response.id;
// inject token into hidden field    
    theForm.append($('<input type="hidden" name="user[stripe_card_token]">').val(token) );
//submit to form
    theForm.get(0).submit();
  }

});