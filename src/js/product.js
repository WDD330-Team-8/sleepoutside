import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";
const productId = getParam("product");
productDetails(productId);
loadHeaderFooter();
quantityInput();

function quantityInput() {
  const quantityInput = document.querySelector("#productQty");
  const addAmount = document.querySelector("#productQtyPlus");
  const subtractAmount = document.querySelector("#productQtyMinus");

  addAmount.addEventListener("click", () => {
    quantityInput.value = parseInt(quantityInput.value) + 1;
  });

  subtractAmount.addEventListener("click", () => {
    if (quantityInput.value <= 1) {
      subtractAmount.value = 1;
    } else {
      quantityInput.value = parseInt(quantityInput.value) - 1;
    }
  });
}
