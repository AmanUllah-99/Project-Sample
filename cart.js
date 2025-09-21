let cart = [];

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  renderCart();
}

function renderCart() {
  const cartBody = document.getElementById("cart-body");
  const grandTotalEl = document.getElementById("grand-total");
  cartBody.innerHTML = "";

  let grandTotal = 0;

  cart.forEach((item, index) => {
    const total = item.price * item.quantity;
    grandTotal += total;

    cartBody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>
          <input type="number" value="${item.quantity}" min="1" 
                 onchange="updateQuantity(${index}, this.value)">
        </td>
        <td>${total}</td>
        <td><button onclick="removeItem(${index})">❌</button></td>
      </tr>
    `;
  });

  grandTotalEl.innerText = `Grand Total: Rs. ${grandTotal}`;
}

function updateQuantity(index, quantity) {
  cart[index].quantity = parseInt(quantity);
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}
