let billItems = {};
        
        function addItem(name, price) {
            if (billItems[name]) {
                updateQuantity(name, 1);
            } else {
                billItems[name] = {
                    price: price,
                    quantity: 1
                };
            }
            updateBillDisplay();
        }

        function updateQuantity(name, change) {
            if (billItems[name]) {
                billItems[name].quantity += change;
                if (billItems[name].quantity <= 0) {
                    delete billItems[name];
                }
                updateBillDisplay();
            }
        }

        function updateBillDisplay() {
            const billItemsDiv = document.getElementById('billItems');
            billItemsDiv.innerHTML = '';
            let subtotal = 0;

            for (const [name, item] of Object.entries(billItems)) {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;

                const billItem = document.createElement('div');
                billItem.className = 'bill-item';
                billItem.innerHTML = `
                    <span>${name}</span>
                    <span>Rs${item.price.toFixed(2)}</span>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity('${name}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${name}', 1)">+</button>
                    </div>
                    <span>Rs${itemTotal.toFixed(2)}</span>
                    <button class="remove-item" onclick="updateQuantity('${name}', -${item.quantity})">×</button>
                `;
                billItemsDiv.appendChild(billItem);
            }

            const tax = subtotal * 0.10;
            const total = subtotal + tax;

            document.getElementById('subtotal').textContent = `Rs${subtotal.toFixed(2)}`;
            document.getElementById('tax').textContent = `Rs${tax.toFixed(2)}`;
            document.getElementById('total').textContent = `Rs${total.toFixed(2)}`;
        }

        function clearBill() {
            billItems = {};
            updateBillDisplay();
        }

        function printBill() {
            // Update the print date
            const now = new Date();
            const dateString = now.toLocaleDateString();
            const timeString = now.toLocaleTimeString();
            document.getElementById('printDate').textContent = `Date: ${dateString} ${timeString}`;

            // Change to print-friendly layout
            document.body.classList.add('print-mode');
            
            // Print the page
            window.print();
            
            // Restore normal view
            document.body.classList.remove('print-mode');
        }

        // Initialize the date on load
        document.addEventListener('DOMContentLoaded', function() {
            const now = new Date();
            const dateString = now.toLocaleDateString();
            const timeString = now.toLocaleTimeString();
            document.getElementById('printDate').textContent = `Date: ${dateString} ${timeString}`;
        });