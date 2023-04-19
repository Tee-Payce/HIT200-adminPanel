// Require in the Paynow class
import { Paynow } from "paynow";

// Create instance of Paynow class
let paynow = new Paynow("15818", "42f98635-9e26-41f5-bd7c-8937aab1b4c7");

// Set return and result urls

// Create a new payment
let payment = paynow.createPayment("Invoice 35", "ryantjena@gmail.com");

// Add items to the payment list passing in the name of the item and it's price
payment.add("Bananas", 2.5);
payment.add("Apples", 3.4);

// Send off the payment to Paynow
paynow
  .sendMobile(
    // The payment to send to Paynow
    payment,

    // The phone number making payment
    "0781802783",

    // The mobile money method to use.
    "ecocash"
  )
  .then(function (response) {
    if (response.success) {
      // These are the instructions to show the user.
      // Instruction for how the user can make payment
      let instructions = response.instructions; // Get Payment instructions for the selected mobile money method

      // Get poll url for the transaction. This is the url used to check the status of the transaction.
      // You might want to save this, we recommend you do it
      let pollUrl = response.pollUrl;

      console.log(instructions);
    } else {
      console.log(response.error);
    }
  })
  .catch((ex) => {
    // Ahhhhhhhhhhhhhhh
    // *freak out*
    console.log("Your application has broken an axle", ex);
  });
// Check the status of the transaction with the specified pollUrl
// Now you see why you need to save that url ;-)
let status = paynow.pollTransaction(pollUrl);

if (status.paid()) {
  // Yay! Transaction was paid for
} else {
  console.log("Why you no pay?");
}
