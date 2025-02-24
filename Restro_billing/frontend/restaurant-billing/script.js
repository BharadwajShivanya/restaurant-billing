
// Menu data
const menuItems = [
    {
        id: 1,
        name: "Chicken Burger",
        price: 12.99,
        category: "main-course",
        image: "images/dishes/burger.jpg"
    },
    {
        id: 2,
        name: "Caesar Salad",
        price: 8.99,
        category: "starters",
        image: "images/dishes/salad.jpg"
    },
    // Add more menu items here
];

// Global variables
let currentBill = {
    items: {},
    subtotal: 0,
    tax: 0,
    discount: 0,
    total: 0,
    tableNo: "",
    waiter: "",
    billNo: generateBillNumber()
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    updateDateTime();
    setInterval(updateDateTime, 1000);
});

function initializeApp() {
    loadMenuItems();
    setupEventListeners();
    updateBillNumber();
}

function loadMenuItems() {
    const menuGrid = document.getElementById('menu-grid');
    menuGrid.innerHTML = '';

    menuItems.forEach(item => {
        const menuItem = createMenuItem(item);
        menuGrid.appendChild(menuItem);
    });
}

function createMenuItem(item) {
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.innerHTML = `
        <img src="/api/placeholder/100/100" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>$${item.price.toFixed(2)}</p>
    `;
    div.onclick = () => addItemToBill(item);
    return div;
}

function addItemToBill(item) {
    if (!currentBill.tableNo || !currentBill.waiter) {
        alert('Please select table and waiter first!');
        return;
    }

    if (currentBill.items[item.id]) {
        currentBill.items[item.id].quantity++;
    } else {
        currentBill.items


        
