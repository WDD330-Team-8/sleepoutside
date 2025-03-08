import {
  getLocalStorage,
  setLocalStorage,
  alertMessage,
  removeAllAlerts,
} from "./utils.mjs";
import { checkout } from "./externalServices.mjs";

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

const checkoutProcess = {
  key: "",
  outputSelector: "",
  list: [],
  itemTotal: 0,
  shipping: 0,
  tax: 0,
  orderTotal: 0,
  init: function (key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = getLocalStorage(key);
    this.calculateItemSummary();
    this.calculateOrdertotal();
  },
  calculateItemSummary: function () {
    const summaryElement = document.querySelector(
      this.outputSelector + " #cartTotal"
    );
    const itemNumElement = document.querySelector(
      this.outputSelector + " #num-items"
    );
    itemNumElement.innerText = this.list.reduce(
      (total, item) => total + item.Quantity,
      0
    );
    // calculate the total of all the items in the cart
    const amounts = this.list.map((item) => item.FinalPrice * item.Quantity);
    this.itemTotal = amounts.reduce((sum, item) => sum + item);
    summaryElement.innerText = "$" + this.itemTotal.toFixed(2);
  },
  calculateOrdertotal: function () {
    this.shipping =
      10 +
      (this.list.reduce((total, item) => total + item.Quantity, 0) - 1) * 2;
    this.tax = (this.itemTotal * 0.06).toFixed(2);
    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.shipping) +
      parseFloat(this.tax)
    ).toFixed(2);
    this.displayOrderTotals();
  },
  displayOrderTotals: function () {
    const shipping = document.querySelector(this.outputSelector + " #shipping");
    const tax = document.querySelector(this.outputSelector + " #tax");
    const orderTotal = document.querySelector(
      this.outputSelector + " #orderTotal"
    );
    shipping.innerText = "$" + this.shipping;
    tax.innerText = "$" + this.tax;
    orderTotal.innerText = "$" + this.orderTotal;
  },
  checkout: async function (form) {
    // const json = formDataToJSON(form);
    // // add totals, and item details
    // json.orderDate = new Date().toISOString();
    // json.orderTotal = this.orderTotal;
    // json.tax = this.tax;
    // json.shipping = this.shipping;
    // json.items = packageItems(this.list);
    // console.log("order format:");
    // console.log(json);

    const formData = formDataToJSON(form);

    // Transform the cart items into the required format
    const formattedItems = this.list.map((item) => ({
      id: item.id || "Unknown",
      name: item.name || "Unknown Item",
      price: parseFloat(item.FinalPrice || 0).toFixed(2), // Ensure price is formatted correctly
      quantity: item.Quantity || 1, // Default quantity to 1 if missing
    }));

    // Construct the payload
    const payload = {
      orderDate: new Date().toISOString(),
      fname: formData.fname,
      lname: formData.lname,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      cardNumber: formData.cardNumber,
      expiration: formData.expiration,
      code: formData.code,
      items: formattedItems,
      orderTotal: this.orderTotal, // This is already a string
      shipping: this.shipping, // Keep as number
      tax: this.tax, // This is already formatted correctly
    };
    try {
      const res = await checkout(payload);
      console.log(res);
      setLocalStorage("so-cart", []);
      location.assign("/checkout/success.html");
    } catch (err) {
      removeAllAlerts();
      for (let message in err.message) {
        alertMessage(err.message[message]);
      }

      console.log(err);
    }
  },
};

export default checkoutProcess;
