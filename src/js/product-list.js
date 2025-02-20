import productList from "./productList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();
const productParam = getParam("product");
productList(productParam, ".product-list");

// import productList from "./productList.mjs";
// import { getParam, loadHeaderFooter } from "./utils.mjs";

// loadHeaderFooter();
// const category = getParam("category");
// productList(category, ".product-list");
