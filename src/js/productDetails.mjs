import { findProductById } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage, loadHeaderFooter } from "./utils.mjs";

let product = {}; 


export default async function productDetails(productId){
    product = await findProductById(productId);
    renderProductDetails();
    document.getElementById("addToCart").addEventListener("click", addToCart);
    
    // update and focus on cart amount when adding to cart
    document.getElementById("addToCart").addEventListener("click", async () => { 
      await loadHeaderFooter(); // loading header updates cart amount
      document.getElementById("cart-count").focus();
      animateBackpack();
    });
}

function animateBackpack(){
  const cartE1 = document.querySelector(".cart");
  cartE1.style.transform = "scale(1.3)";
  setTimeout(() => {
    cartE1.style.transform = "scale(1)";
  }, 150);
}

function addToCart() {
    let cartContents = getLocalStorage("so-cart");
    if (!cartContents) {
      cartContents = [];
    }

    cartContents.push(product);
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
