// Cart array

let cart = [];


// Add product to cart

function addToCart(name, price) {

    const existingProduct = cart.find(
        product => product.name === name
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    alert(name + " added to cart!");
}


// Update cart

function updateCart() {

    const cartItems = document.getElementById("cart-items");

    const cartCount = document.getElementById("cart-count");

    const cartTotal = document.getElementById("cart-total");


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

    }


    let total = 0;
    let count = 0;


    cart.forEach((product, index) => {

        total += product.price * product.quantity;

        count += product.quantity;


        const item = document.createElement("div");

        item.className = "cart-item";


        item.innerHTML = `

            <div>
                <strong>${product.name}</strong>

                <br>

                ₹${product.price}
                × ${product.quantity}
            </div>

            <button
                class="remove-button"
                onclick="removeFromCart(${index})">

                Remove

            </button>
        `;


        cartItems.appendChild(item);

    });


    cartCount.textContent = count;

    cartTotal.textContent = total.toLocaleString("en-IN");

}


// Remove product

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


// Open cart

function openCart() {

    document.getElementById("cart-modal")
        .style.display = "block";

}


// Close cart

function closeCart() {

    document.getElementById("cart-modal")
        .style.display = "none";

}


// Checkout

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    alert(
        "Order placed successfully! 🚚\nThank you for shopping with QuickKart."
    );


    cart = [];

    updateCart();

    closeCart();

}


// Search products

function searchProducts() {

    const searchValue =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();


    const products =
        document.querySelectorAll(".product-card");


    products.forEach(product => {

        const productName =
            product
                .querySelector("h3")
                .textContent
                .toLowerCase();


        if (productName.includes(searchValue)) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}


// Filter products by category

function filterProducts(category) {

    const products =
        document.querySelectorAll(".product-card");


    products.forEach(product => {

        if (
            category === "all" ||
            product.dataset.category === category
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}
// Open checkout

function openCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    updateCheckoutSummary();

    document.getElementById("checkout-modal")
        .style.display = "block";

}


// Close checkout

function closeCheckout() {

    document.getElementById("checkout-modal")
        .style.display = "none";

}


// Update checkout summary

function updateCheckoutSummary() {

    const checkoutItems =
        document.getElementById("checkout-items");

    const subtotalElement =
        document.getElementById("checkout-subtotal");

    const totalElement =
        document.getElementById("checkout-total");


    checkoutItems.innerHTML = "";


    let subtotal = 0;


    cart.forEach(product => {

        const productTotal =
            product.price * product.quantity;

        subtotal += productTotal;


        const item =
            document.createElement("div");

        item.className = "checkout-item";


        item.innerHTML = `
            <span>
                ${product.name}
                × ${product.quantity}
            </span>

            <strong>
                ₹${productTotal.toLocaleString("en-IN")}
            </strong>
        `;


        checkoutItems.appendChild(item);

    });


    const deliveryCharge = 40;

    const total = subtotal + deliveryCharge;


    subtotalElement.textContent =
        subtotal.toLocaleString("en-IN");

    totalElement.textContent =
        total.toLocaleString("en-IN");

}


// Place order

function placeOrder() {

    const name =
        document.getElementById("customer-name").value.trim();

    const phone =
        document.getElementById("customer-phone").value.trim();

    const address =
        document.getElementById("customer-address").value.trim();

    const city =
        document.getElementById("customer-city").value.trim();

    const pincode =
        document.getElementById("customer-pincode").value.trim();


    if (
        name === "" ||
        phone === "" ||
        address === "" ||
        city === "" ||
        pincode === ""
    ) {

        alert("Please fill in all delivery details.");

        return;
    }


    if (phone.length < 10) {

        alert("Please enter a valid mobile number.");

        return;
    }


    if (pincode.length !== 6) {

        alert("Please enter a valid 6-digit PIN code.");

        return;
    }


    const paymentMethod =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;


    let paymentText = "";

    if (paymentMethod === "cod") {

        paymentText = "Cash on Delivery";

    } else if (paymentMethod === "upi") {

        paymentText = "UPI";

    } else {

        paymentText = "Credit / Debit Card";

    }


    const orderId =
        "QK" + Math.floor(100000 + Math.random() * 900000);


    alert(
        "🎉 Order Placed Successfully!\n\n" +
        "Order ID: " + orderId + "\n" +
        "Customer: " + name + "\n" +
        "Payment: " + paymentText + "\n\n" +
        "Your order will be delivered soon. 🚚"
    );


    // Empty cart

    cart = [];

    updateCart();

    closeCheckout();

    closeCart();

}
