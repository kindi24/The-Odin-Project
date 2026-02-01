    const menuItems = [
    {
        name: "Sandwich Gyros",
        photo: "../../assets/gyros.png",
        value: "3.50€"
    },
    {
        name: "Sandwich Souvlaki",
        photo: "../../assets/souvlaki.png",
        value: "3.20€"
    },
    {
        name: "Panseta portion",
        photo: "../../assets/panseta.png",
        value: "7.50€"
    },
    {
        name: "Mprizola portion",
        photo: "../../assets/mprizola.png",
        value: "7.50€"
    },
    {
        name: "Club Gyros",
        photo: "../../assets/club-gyros.png",
        value: "8.50€"
    },
    {
        name: "Club Chicken Fillet",
        photo: "../../assets/club-chicken-fillet.png",
        value: "8.00€"
    },
    {
        name: "Deluxe Giga Burger",
        photo: "../../assets/burger.png",
        value: "6.00€"
    },
    {
        name: "Kontosouvli (Pork or Chicken)",
        photo: "../../assets/kontosouvli.png",
        value: "10.00€"
    }
];

export function cardsContent(item) {
    return `
        <div class="menu-card">
            <img src="${item.photo}"" class="menu-photo">
            <div class="card-info">
                <h3 class="item-name">${item.name}</h3>
                <span class="item-value">${item.value}</span>
            </div>
        </div>
    `;
}

export function menuContent() {
    const cards = menuItems.map(cardsContent).join('');

    return `
        <section class="menu-section">
            <h2 class="section-title">Our Menu</h2>
            <div class="menu-grid">
                ${cards}
            </div>
        </section>
    `

}
