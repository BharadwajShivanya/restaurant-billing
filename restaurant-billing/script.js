// Sample Menu Items
const menu = [
    { id: 1, name: "Burger", price: 100 },
    { id: 2, name: "Pizza", price: 250 },
    { id: 3, name: "Pasta", price: 150 },
    { id: 4, name: "French Fries", price: 80 },
    { id: 5, name: "Coke", price: 50 }
];

let cart = [];

// Display Menu
function loadMenu() {
    const menuContainer = document.getElementById("menu-items");
    menuContainer.innerHTML = "";
    menu.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("menu-item");
        div.innerHTML = `
            <span>${item.name} - ₹${item.price}</span>
            <button onclick="addToCart(${item.id})">Add</button>
        `;
        menuContainer.appendChild(div);
    });
}

// Add to Cart
function addToCart(id) {
    const item = menu.find(i => i.id === id);
    cart.push(item);
    updateCart();
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Update Cart UI
function updateCart() {
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <span>${item.name} - ₹${item.price}</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartContainer.appendChild(div);
    });

    document.getElementById("total").innerText = total;
    updateTotal();
}

// Show Billing Section
function showBilling() {
    document.getElementById("billing-section").style.display = "block";
    updateTotal();
}

// Update Total with Tax & Discount
function updateTotal() {
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    let discount = Number(document.getElementById("discount").value);
    let tax = (total * 5) / 100;
    let finalTotal = total + tax - discount;

    document.getElementById("tax").innerText = tax.toFixed(2);
    document.getElementById("final-total").innerText = finalTotal.toFixed(2);
}

// Generate Receipt
function generateReceipt() {
    document.getElementById("receipt-section").style.display = "block";
    const receiptContainer = document.getElementById("receipt-details");
    receiptContainer.innerHTML = "";
    
    cart.forEach(item => {
        const p = document.createElement("p");
        p.innerText = `${item.name} - ₹${item.price}`;
        receiptContainer.appendChild(p);
    });

    const finalTotal = document.getElementById("final-total").innerText;
    const totalAmount = document.createElement("h3");
    totalAmount.innerText = `Total Paid: ₹${finalTotal}`;
    receiptContainer.appendChild(totalAmount);
}

// Print Receipt
function printReceipt() {
    window.print();
}

// Load Menu on Page Load
window.onload = loadMenu;
