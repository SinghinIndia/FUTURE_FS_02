import { cart, addToCart, getCartQuantity } from '../data/cart.js';
import { products } from '../data/products.js';

/* ---------------- INITIAL SETUP ---------------- */
renderProductsGrid(products);
updateCartQuantity();
setupCategoryNavbar();

/* ---------------- CATEGORY NAVBAR ---------------- */
function setupCategoryNavbar() {
  const categories = ["All", ...new Set(products.map(p => p.category || "Other"))];

  const navbarContainer = document.querySelector('.filter-container');
  if (!navbarContainer) return;

  let navbarHTML = '<div class="category-navbar">';
  categories.forEach(category => {
    navbarHTML += `<button class="category-btn ${category === "All" ? "active" : ""}" data-category="${category}">${category}</button>`;
  });
  navbarHTML += '</div>';

  navbarContainer.innerHTML = navbarHTML;

  document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', () => {
      const selectedCategory = button.dataset.category;

      document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      if (selectedCategory === 'All') {
        renderProductsGrid(products);
      } else {
        const filteredProducts = products.filter(p => (p.category || "Other") === selectedCategory);
        renderProductsGrid(filteredProducts);
      }
    });
  });
}

/* ---------------- RENDER PRODUCTS ---------------- */
function renderProductsGrid(productsToRender) {
  let productsHTML = '';

  productsToRender.forEach(product => {
    productsHTML += `
      <div class="product-container js-product-container-${product.id}">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ₹${product.priceINR}
        </div>

        <div class="product-quantity-container">
          <select class="js-select-quantity-${product.id}">
            ${[...Array(10)].map((_, i) => `<option value="${i + 1}" ${i === 0 ? 'selected' : ''}>${i + 1}</option>`).join('')}
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-button" data-product-id="${product.id}">
          Add to Cart
        </button>
        <div class="added-to-cart-message-container js-message-container-${product.id}"></div>
      </div>`;
  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML;
}

/* ---------------- ADD TO CART (EVENT DELEGATION) ---------------- */
document.querySelector('.js-products-grid').addEventListener('click', e => {
  if (e.target.classList.contains('js-add-button')) {
    const productId = e.target.dataset.productId;
    const quantitySelect = document.querySelector(`.js-select-quantity-${productId}`);
    const quantity = Number(quantitySelect.value);

    addToCart(productId, quantity);
    updateCartQuantity();
    quantitySelect.value = 1;

    showAddedMessage(productId);
  }
});

/* ---------------- CART QUANTITY ---------------- */
function updateCartQuantity() {
  const cartQuantity = getCartQuantity();
  const cartQuantityElem = document.querySelector('.js-cart-quantity');
  if (cartQuantityElem) {
    cartQuantityElem.innerHTML = cartQuantity;
  }
}

/* ---------------- ADDED MESSAGE ---------------- */
function showAddedMessage(productId) {
  const container = document.querySelector(`.js-message-container-${productId}`);
  if (!container) return;

  container.innerHTML = '';
  const message = document.createElement('p');
  message.className = 'added-to-cart-message';
  message.textContent = 'Added to cart';
  container.appendChild(message);

  setTimeout(() => {
    message.classList.add('fade-out');
  }, 1000);

  message.addEventListener('transitionend', () => {
    message.remove();
  });
}
