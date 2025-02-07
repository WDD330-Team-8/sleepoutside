import { getData } from './productData.mjs';
import { renderListWithTemplate } from './utils.mjs';

const approvedProducts = ["880RR", "985RF", "985PR", "344YJ"];

export default async function productList(category, selector) {
    let data = await getData(category);
    data = data.filter(product => approvedProducts.includes(product.Id));
    const el = document.querySelector(selector);
    // console.log(data.length);
    renderListWithTemplate(el, data, productCardTemplate);
}



function productCardTemplate (product) {
    // console.log(product);
    // console.log(product.Brand);

    return `
    <li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Image}"
        alt="${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">${product.ListPrice}</p></a
    >
  </li>
`;
}

