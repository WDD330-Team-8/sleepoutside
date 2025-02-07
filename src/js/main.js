import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
// console.log("Hello from main.js");
console.log(productList("tents", ".product-list"));
