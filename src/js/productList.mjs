import { getProductsByCategory } from "./externalServices.mjs";
import { renderListWithTemplate } from "./utils.mjs";

export default async function productList(category, selector) {
  let data = await getProductsByCategory(category);
  const el = document.querySelector(selector);
  // console.log(data.length);
  renderListWithTemplate(el, data, productCardTemplate);
  document.querySelector(".title").innerHTML =
    category.charAt(0).toUpperCase() + category.slice(1);
}

function productCardTemplate(product) {
  // console.log(product);
  // console.log(product.Brand);

  return `
    <li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
        alt="${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">${product.ListPrice}</p></a
    >
  </li>
`;
}
