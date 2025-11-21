import { homeContent } from "./modules/home.js";
import { menuContent } from "./modules/menu.js";
import { contactContent } from "./modules/contact.js";

const contentDiv = document.getElementById('content');
const homeBtn = document.getElementById('home');
const menuBtn = document.getElementById('menu');
const contactBtn = document.getElementById('contact');

export function loadContent(contentFunction) {
    contentDiv.innerHTML = contentFunction();
}

homeBtn.addEventListener('click', () => {
    loadContent(homeContent);
});

menuBtn.addEventListener('click', () => {
    loadContent(menuContent);
});

contactBtn.addEventListener('click', () => {
    loadContent(contactContent);
});

document.addEventListener('DOMContentLoaded', () => {
    loadContent(homeContent);
})