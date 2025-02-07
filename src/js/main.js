import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import homeAlerts from "./alert.mjs";

loadHeaderFooter();
// console.log("Hello from main.js");
console.log(productList("tents", ".product-list"));

homeAlerts();
