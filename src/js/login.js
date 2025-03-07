import { login } from "./auth.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

window.onload = console.log("login.js loaded");

loadHeaderFooter();

const redirect = getParam('redirect');

document.querySelector('#loginButton').addEventListener('click', (e) => {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    console.log("accessed loginButton");
    login({ email, password }, redirect);
    console.log("successfully logged in");
});
