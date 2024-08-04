document.addEventListener("DOMContentLoaded", () => {
  const products = document.querySelectorAll(".product");
  const cartItemsContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");
  // totalElement.style.backgroundColor="aqua";
  let cart = {};
  products.forEach((product) => {
    const minusButton = product.querySelector(".minus");
    const plusButton = product.querySelector(".plus");
    const quantityElement = product.querySelector(".quantity");
    const price = parseInt(product.getAttribute("data-price"));
    const productName = product.querySelector("span").textContent;
    let quantity = 0;
    minusButton.addEventListener("click", () => {
      if (quantity > 0) {
        quantity--;
        quantityElement.textContent = quantity;
        updateCart(productName, price, quantity);
      }
    });
    plusButton.addEventListener("click", () => {
      quantity++;
      quantityElement.textContent = quantity;
      updateCart(productName, price, quantity);
    });
  });
  function updateCart(productName, price, quantity) {
    if (quantity === 0) {
      delete cart[productName];
    } else {
      cart[productName] = { price, quantity };
    }
    renderCart();
    calculateTotal();
  }
  function renderCart() {
    cartItemsContainer.innerHTML = "";
    for (let item in cart) {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      // cartItem.innerHTML = `${item} ${
      // cart[item].quantity * cart[item].price
      // }`;
      cartItem.innerHTML = `
          <span>${item}</span>
          <span>${cart[item].price}</span>
      `;
      cartItemsContainer.appendChild(cartItem);
    }
  }
  function calculateTotal() {
    let total = 0;
    for (let item in cart) {
      total += cart[item].quantity * cart[item].price;
    }
    totalElement.textContent = total;
  }
});