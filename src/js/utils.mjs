import { doc } from "prettier";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  parentElement,
  list,
  template,
  position = "afterbegin",
  clear = true
) {
  // console.log(list);

  if (clear) {
    parentElement.innerHTML = "";
  }

  const htmlStrings = list.map(template);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}
export async function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  callback,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);
  if (callback) {
    callback(data);
  }
}
function loadTemplate(path) {
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}
export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  const headerE1 = document.querySelector("#main-header");
  const footerE1 = document.querySelector("#main-footer");
  await renderWithTemplate(headerTemplateFn, headerE1);
  await renderWithTemplate(footerTemplateFn, footerE1);
  cartSuperscript(); // render cart count
}

async function cartSuperscript() {
  const cartItems = await getLocalStorage("so-cart");
  const cartE1 = document.querySelector(".cart");
  let countEl = document.createElement("a");
  countEl.id = "cart-count";
  countEl.href = "/cart/index.html";

  if (cartItems == null) {
    countEl.style.display = "none";
  } else {
    const count = cartItems.reduce((total, item) => total + item.Quantity, 0);
    if (count >= 99) {
      countEl.textContent = "99+";
    } else {
      countEl.textContent = count;
    }
  }

  countEl.tabIndex = 0;

  cartE1.prepend(countEl);
}

export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);

  // left this here to show how you could remove the alert automatically after a certain amount of time.
  // setTimeout(function () {
  //   main.removeChild(alert);
  // }, duration);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}
