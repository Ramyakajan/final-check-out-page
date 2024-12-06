// Select elements
const medicines = document.querySelectorAll('.quantity-input');
const orderTableBody = document.getElementById('order-table-body');
const totalPriceEl = document.getElementById('total-price');
const addToFavouritesBtn = document.getElementById('add-to-favourites');
const applyFavouritesBtn = document.getElementById('apply-favourites');
const buyNowBtn = document.getElementById('buy-now');

// Initialize favourites storage
let favourites = [];

// Function to update the order summary table
function updateOrderSummary() {
  let total = 0;
  orderTableBody.innerHTML = ''; // Clear previous table rows

  medicines.forEach((input) => {
    const quantity = parseInt(input.value);
    if (quantity > 0) {
      const name = input.dataset.name;
      const price = parseFloat(input.dataset.price);
      const itemTotal = quantity * price;
      total += itemTotal;

      // Add row to the table
      const row = `
        <tr>
          <td>${name}</td>
          <td>${quantity}</td>
          <td>Rs ${itemTotal.toFixed(2)}</td>
        </tr>
      `;
      orderTableBody.insertAdjacentHTML('beforeend', row);
    }
  });

  // Update the total price
  totalPriceEl.textContent = `Rs ${total.toFixed(2)}`;
}

// Attach input event listener to medicine inputs
medicines.forEach((input) => input.addEventListener('input', updateOrderSummary));

// Save order to favourites
addToFavouritesBtn.addEventListener('click', () => {
  // Collect selected medicines
  favourites = Array.from(medicines)
    .filter((input) => input.value > 0)
    .map((input) => ({
      name: input.dataset.name,
      price: parseFloat(input.dataset.price),
      quantity: parseInt(input.value),
    }));

  // Save to local storage
  localStorage.setItem('favourites', JSON.stringify(favourites));
  alert('Order saved as favourite!');
});

// Apply favourites to the form and table
applyFavouritesBtn.addEventListener('click', () => {
  const savedFavourites = JSON.parse(localStorage.getItem('favourites'));

  if (savedFavourites && savedFavourites.length > 0) {
    // Apply favourites to the input fields
    medicines.forEach((input) => {
      const favItem = savedFavourites.find((item) => item.name === input.dataset.name);
      input.value = favItem ? favItem.quantity : 0;
    });

    // Update the order summary
    updateOrderSummary();
    alert('Favourites applied to your order!');
  } else {
    alert('No favourites found.');
  }
});

// Handle "Buy Now" button click
buyNowBtn.addEventListener('click', () => {
  // Collect selected items
  const selectedItems = Array.from(medicines)
    .filter((input) => input.value > 0)
    .map((input) => ({
      name: input.dataset.name,
      quantity: parseInt(input.value),
      price: parseFloat(input.dataset.price),
    }));

  if (selectedItems.length === 0) {
    alert('Your cart is empty. Please select medicines to proceed.');
    return;
  }

  // Display order confirmation and ask for user details
  const name = prompt('Enter your name:');
  const address = prompt('Enter your delivery address:');
  const paymentMethod = prompt('Enter your payment method (e.g., Credit Card, PayPal):');

  if (name && address && paymentMethod) {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5); // 5-day delivery time

    alert(`
      Thank you, ${name}, for your purchase!
      Your order will be delivered to:
      ${address}
      Delivery Date: ${deliveryDate.toDateString()}
    `);

    // Reset the form and order summary
    medicines.forEach((input) => (input.value = 0));
    updateOrderSummary();
  } else {
    alert('Please complete all fields to place your order.');
  }
});
