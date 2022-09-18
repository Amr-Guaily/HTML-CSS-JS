// Selectors:
const cartBtn = document.querySelector('.cart-icon'),
  cart = document.querySelector('.cart'),
  closeBtn = cart.querySelector('.close-icon'),
  cartItems = cart.querySelector('.cart-items'),
  cartLength = cartBtn.querySelector('span'),
  totalPrice = cart.querySelector('.cart-footer span'),
  clearCartBtn = cart.querySelector('.cart-footer button'),
  productsContainer = document.querySelector('.products .container');

// & Global Variables:
let products = JSON.parse(localStorage.getItem('products')),
  cartProducts = JSON.parse(localStorage.getItem('cart')) || [];

// Functions:
// Fetch data from json file
async function fetchProducts() {
  res = await fetch('./products.json');
  data = await res.json();
  // error handling
  try {
    const { items } = data;

    const products = items.map((product) => {
      const { id } = product.sys;
      const { title, price } = product.fields;
      const { url: image } = product.fields.image.fields.file;
      product = { id, title, price, image };
      return product;
    });
    return products;
  } catch (err) {
    console.log(err);
  }
}

// Save & Render all products
function renderProducts(products) {
  localStorage.setItem('products', JSON.stringify(products));

  products.forEach(({ id, title, price, image }) => {
    productsContainer.innerHTML += `
      <div class="product-item">
            <div class="image">
                <img src="${image}" class="product-overlay" />
            </div>
            <div class="info">
                <h3>${title}</h3>
                <span>${price}</span>
            </div>
            <button onclick="addToCart(this.id)" id=${id}><i class="fas fa-shopping-cart"></i>Add To Cart</button>
        </div>`;
  });
}

// Add to cart
function addToCart(prodcutId) {
  // check if product is already exist in cart
  if (cartProducts.some((product) => product.id == prodcutId)) {
    alert('this product is already exist in cart');
  } else {
    const cartItem = {
      ...products.find((product) => product.id == prodcutId),
      quantity: 1,
    };
    cartProducts.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cartProducts));
    renderCart(cartItem);

    cart.classList.add('show');
    cartLength.innerText = cartProducts.length;

    // update total price
    setPrice();
  }
}

// Remove from cart
function removeFromCart(prodcutId, btn) {
  cartProducts = cartProducts.filter((product) => product.id !== prodcutId);
  localStorage.setItem('cart', JSON.stringify(cartProducts));

  btn.parentElement.parentElement.remove();
  cartLength.innerText = cartProducts.length;

  // update total price
  setPrice();
}

// Clear cart
function clearCart() {
  cartProducts = [];
  localStorage.setItem('cart', JSON.stringify(cartProducts));

  cartItems.innerHTML = '';
  cartLength.innerText = cartProducts.length;

  // update total price
  setPrice();
}

// ** change quantity
function changeQuantity(action, prodcutId) {
  cartProducts = cartProducts.map((prodcut) => {
    let quantity = prodcut.quantity;

    if (prodcut.id == prodcutId) {
      if (action === 'increment') {
        quantity++;
      } else if (action === 'decrement' && quantity > 1) {
        quantity--;
      }
    }
    return { ...prodcut, quantity };
  });

  // update cart
  localStorage.setItem('cart', JSON.stringify(cartProducts));
  cartItems.innerHTML = '';
  cartProducts.forEach((product) => renderCart(product));

  // update total price
  setPrice();
}

// Render cart items
function renderCart({ id, title, price, image, quantity }) {
  cartItems.innerHTML += `
    <li class="cart-item">
        <div class="image">
            <img src="${image}" />
        </div>
        <div class="info">
            <h4>${title}</h4>
            <h5>${price}</h5>
            <button id=${id} onclick="removeFromCart(this.id, this)">remove</button>
        </div>
        <div class="quantity">
            <i class="fas fa-chevron-up" onclick="changeQuantity('increment', this.id)" id=${id}></i>
            <span>${quantity}</span>
            <i class="fas fa-chevron-down" onclick="changeQuantity('decrement', this.id)" id=${id}></i>
        </div>
    </li>`;
}

// set total price
function setPrice() {
  let total = 0;

  cartProducts.forEach((product) => {
    total += product.price * product.quantity;
  });
  totalPrice.innerText = total.toFixed(2);
}

// Events:
document.addEventListener('DOMContentLoaded', () => {
  fetchProducts().then((products) => renderProducts(products));
  cartProducts.forEach((product) => renderCart(product));
  cartLength.innerText = cartProducts.length;
});

cartBtn.addEventListener('click', () => {
  cart.classList.add('show');
});
document.addEventListener('click', (e) => {
  if (e.target == cart.querySelector('.overlay')) {
    cart.classList.remove('show');
  }
});
closeBtn.addEventListener('click', () => {
  cart.classList.remove('show');
});

clearCartBtn.addEventListener('click', clearCart);
