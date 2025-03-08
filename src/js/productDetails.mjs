import { findProductById } from "./externalServices.mjs";
import {
  setLocalStorage,
  getLocalStorage,
  loadHeaderFooter,
} from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  product = await findProductById(productId);
  renderProductDetails();
  document.getElementById("addToCart").addEventListener("click", addToCart);

  // update and focus on cart amount when adding to cart
  document.getElementById("addToCart").addEventListener("click", async () => {
    await loadHeaderFooter(); // loading header updates cart amount
    document.getElementById("cart-count").focus();
  });
}

function addToCart() {
  let cartContents = getLocalStorage("so-cart");
  if (!cartContents) {
    cartContents = [];
  }

  setQuantity(product, cartContents);

  setLocalStorage("so-cart", cartContents);
}

function renderProductDetails() {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Images.PrimaryLarge;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}

function setQuantity(product, cartItems) {
  const amountToAdd = parseInt(document.querySelector("#productQty").value);

  if (cartItems == null) {
    // if cart is empty
    product.Quantity = amountToAdd || 1; // set quantity to user input, default to 1
    cartItems.push(product);
    return;
  }

  const found = cartItems.find((cartItem) => cartItem.Id === product.Id); // find if item is already in cart
  if (found) {
    // if item is already in cart
    product.Quantity += amountToAdd || 1; // increment quantity by user input amount, default to 1
    cartItems.splice(cartItems.indexOf(found), 1, product);
  } else {
    // if item is not in cart
    product.Quantity = amountToAdd || 1; // set quantity to user input, default to 1
    cartItems.push(product);
  }
}
