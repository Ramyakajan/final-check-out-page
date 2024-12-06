document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('checkoutForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    
    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const zip = document.getElementById('zip').value;
    
    const cardName = document.getElementById('cardName').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;
    
    // Simple validation message
    if (name && email && address && city && zip && cardName && cardNumber && expiry && cvv) {
      alert(`Thank you for your order, ${name}!\nOrder details will be sent to ${email}.`);
    } else {
      alert("Please fill out all fields before submitting.");
    }
  });
});
