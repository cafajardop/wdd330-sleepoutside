import { getLocalStorage, setLocalStorage, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

function removeFromCart(productId) {
  const cartItems = getLocalStorage('so-cart') || [];
  const updated = cartItems.filter((item) => item.Id !== productId);
  setLocalStorage('so-cart', updated);
  renderCartContents();
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="cart-remove" data-id="${item.Id}" aria-label="Remove ${item.Name} from cart">&#x2715;</button>
</li>`;
}

function updateCartTotal(cartItems) {
  const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
  document.querySelector('.cart-total').innerHTML = `<p>Order Total: <strong>$${total.toFixed(2)}</strong></p>`;
}

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  const list = document.querySelector('.product-list');

  if (!cartItems || cartItems.length === 0) {
    list.innerHTML = '<li class="cart-empty">Your cart is empty.</li>';
    document.querySelector('.cart-total').innerHTML = '';
    return;
  }

  list.innerHTML = cartItems.map(cartItemTemplate).join('');
  updateCartTotal(cartItems);

  list.addEventListener('click', (e) => {
    if (e.target.classList.contains('cart-remove')) {
      removeFromCart(e.target.dataset.id);
    }
  }, { once: true });
}

renderCartContents();
