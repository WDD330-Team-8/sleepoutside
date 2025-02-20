import {getLocalStorage, renderListWithTemplate } from './utils.mjs';

export default function shoppingCart() {
    const cartItems = getLocalStorage('so-cart');
    const outputE1 = document.querySelector('.product-list');
    if (!cartItems) {
        emptyCartMessage(outputE1);
    } else {
        renderListWithTemplate(outputE1, cartItems, cartItemTemplate);
    }
    
}

function cartItemTemplate(item) {
    const newItem = `<li class='cart-card divider'>
    <a href="#" class='cart-card__image'>
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
    </a>
    <a href='#'>
        <h2 class='card_name'>${item.Name}</h2>
    </a>
    <p class='cart-card__color'>Color: ${item.Colors[0].ColorName}</p>
    <p class='cart-card__quantity'>qty: 1</p>
    <p class='cart-card__price'>$${item.FinalPrice}</p>
    </li>`;

    return newItem;
}

function emptyCartMessage(parentElement){
    const emptyCartNotice = `<p>Your cart is empty.</p>`;
    parentElement.insertAdjacentHTML('afterbegin', emptyCartNotice);
}