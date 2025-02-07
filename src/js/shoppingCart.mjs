import {getLocalStorage, renderListWithTemplate } from './utils.mjs';

export default function shoppingCart() {
    const cartItems = getLocalStorage('so-cart');
    const outputE1 = document.querySelector('.product-list')
    renderListWithTemplate(outputE1, cartItems, cartItemTemplate);
}

function cartItemTemplate(item) {
    const newItem = `<li class='cart-card divider'>
    <a href="#" class='cart-card__image'>
    <img src='${item.Image}' alt='${item.Name}'/>
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