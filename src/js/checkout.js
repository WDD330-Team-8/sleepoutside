import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();

checkoutProcess.init("so-cart", "#orderSummary");

document.forms["checkout"].addEventListener("submit", function (event) {
  event.preventDefault();
  checkoutProcess.checkout(event.target);
});
