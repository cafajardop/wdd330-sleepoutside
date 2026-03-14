import { getLocalStorage, setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cart = getLocalStorage('so-cart') || [];
    cart.push(this.product);
    setLocalStorage('so-cart', cart);
  }

  renderProductDetails() {
    const container = document.querySelector('.product-detail');

    container.innerHTML = `
      <img
        class="divider"
        src="${this.product.Images.PrimaryMedium}"
        alt="${this.product.NameWithoutBrand}"
      >
      <section class="product-detail__description">
        <h3 class="product-card__brand">${this.product.Brand.Name}</h3>
        <h2 class="product-detail__name">${this.product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${this.product.FinalPrice}</p>
        <p class="product__color">${this.product.Colors[0].ColorName}</p>
        <div class="product__description">${this.product.DescriptionHtmlSimple}</div>
        <button id="addToCart" class="btn-primary">Add to Cart</button>
      </section>
    `;
  }
}