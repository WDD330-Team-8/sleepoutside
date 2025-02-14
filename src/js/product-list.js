import productList from "./productList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();
const productParam = getParam("product");
productList(productParam, ".product-list");
