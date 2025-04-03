//Sidebar Javascript 
function playMusic(){
    var music = new Audio('Images/taco-bell-bong-sfx.mp3');
    music.play();
}
function showSidebar(){
    const sidebar=document.querySelector('.side-bar')
    sidebar.style.display = 'flex'
}
function hideSidebar(){
    const sidebar=document.querySelector('.side-bar')
    sidebar.style.display = 'none'

}
const btns = document.querySelectorAll(".nav-btn");
const slides = document.querySelectorAll(".video-slide");
let currentSlide = 0; // Track current slide
let slideInterval; // Variable to store interval function

// Function to change active video
function sliderNav(manual) {
    slides.forEach((slide, i) => {
        slide.classList.remove("active");
        slide.style.display = "none"; // Hide all videos
    });

    btns.forEach((btn) => btn.classList.remove("active"));

    slides[manual].classList.add("active");
    slides[manual].style.display = "block"; // Show selected video
    btns[manual].classList.add("active");

    currentSlide = manual; // Update current slide index
}

// Function to auto-slide every 5 seconds
function autoSlide() {
    currentSlide = (currentSlide + 1) % slides.length; // Loop back to first slide after the last one
    sliderNav(currentSlide);
}

// Start auto-slide on page load
function startAutoSlide() {
    slideInterval = setInterval(autoSlide, 15000); // Change slide every 5 seconds
}

// Stop auto-slide when manually clicking buttons
btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        sliderNav(i);
        clearInterval(slideInterval); // Stop auto-slide when user clicks
        startAutoSlide(); // Restart auto-slide after manual change
    });
});

// Initialize slider
document.addEventListener("DOMContentLoaded", () => {
    sliderNav(0); // Set first slide as active
    startAutoSlide(); // Start auto-sliding
});
// Updated app.js to prevent navigation buttons from being added to cart

let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let productButtons = document.querySelectorAll('.buttondesign:not(.navigation-button)');

// Cart array to store items
let cart = [];

// Initialize from localStorage if available
if (localStorage.getItem('cart')) {
    try {
        cart = JSON.parse(localStorage.getItem('cart'));
        // Sort cart based on the order items were added
        if (!cart.some(item => 'orderIndex' in item)) {
            // If items don't have order index yet, add it
            cart.forEach((item, index) => {
                item.orderIndex = index;
            });
        }
        // Sort by orderIndex to maintain consistent order
        cart.sort((a, b) => a.orderIndex - b.orderIndex);
        updateCart();
    } catch (e) {
        console.error("Error loading cart from localStorage:", e);
        localStorage.removeItem('cart');
        cart = [];
    }
}

// Open and close shopping cart
if (openShopping) {
    openShopping.addEventListener('click', () => {
        body.classList.add('active');
    });
}

if (closeShopping) {
    closeShopping.addEventListener('click', () => {
        body.classList.remove('active');
    });
}

// Add click event listeners to all product buttons (excluding navigation buttons)
productButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        // Skip if this is a navigation button
        if (button.classList.contains('navigation-button') || !button.querySelector('.productname')) {
            return;
        }
        
        // Prevent default behavior to avoid navigation if it's a link
        event.preventDefault();
        
        const productId = button.getAttribute('data-id') || generateProductId(button);
        const productName = button.getAttribute('data-name') || button.querySelector('.productname').textContent;
        const productPrice = parseFloat(button.getAttribute('data-price')) || getDefaultPrice(productName);
        const productImage = button.getAttribute('data-image') || button.querySelector('.photo')?.src || '';
        const productType = button.getAttribute('data-type') || getProductType(button);
        
        addToCart(productId, productName, productPrice, productImage, productType);
    });
});

// Helper function to generate product ID if not explicitly set
function generateProductId(button) {
    // First try to get data-id attribute
    const dataId = button.getAttribute('data-id');
    if (dataId) return dataId;
    
    // If no data-id, use the product name
    const name = button.querySelector('.productname')?.textContent || 'unknown-product';
    return name.toLowerCase().replace(/\s+/g, '-');
}

// Helper function to determine product type
function getProductType(button) {
    if (button.querySelector('.veg')) return 'veg';
    if (button.querySelector('.nonveg')) return 'non-veg';
    return 'unknown';
}

// Helper function to set default price if not explicitly set
function getDefaultPrice(productName) {
    // Only set prices for known products
    const priceMap = {
        'CRISPY POTATO TACO': 1.99,
        'CRISPY CHICKEN TACO': 2.49,
        'CRISPY POTATO WRAP': 2.99,
        'CRISPY CHICKEN WRAP': 3.49,
        'MINI QUESADILLA - CHEESE': 1.79,
        'CHEESY CHICKEN QUESADILLA': 2.99,
        // Add combo menu items
        '2 CRUNCHY TACOS + 2 PANEER MAKHNI CHALUPA + CHEESY FRIES': 9.99,
        '2 CRUNCHY TACOS + 2 BUTTER CHICKEN CHALUPA + CHEESY FRIES': 10.99,
        'BIG BELL BOX': 12.99,
        '2 NAKED CHICKEN TACOS + 1 SEASONED NACHOS & SALSA + 1 CHURRO BOMBS': 15.99,
        '4 VEG 7 LAYER BURRITO VEG + 2 SEASONED FRIES + 2 CHURRO BOMBS': 17.99,
        '4 CHICKEN 7 LAYER BURRITO VEG + 2 SEASONED FRIES + 2 CHURRO BOMBS': 18.99
    };
    
    return priceMap[productName] || null; // Return null if not found instead of default price
}

// Function to check if a button is a product or a navigation button
function isProductButton(button) {
    // Check if it has product-specific elements
    // For beverages, we need to look for .beverage class instead of .photo
    return (
        button.querySelector('.productname') && 
        (button.querySelector('.photo') || button.querySelector('.beverage')) && 
        (button.querySelector('.veg') || button.querySelector('.nonveg') || button.getAttribute('data-type') === 'veg')
    );
}

// Function to add a product to cart
function addToCart(id, name, price, image, type) {
    // Skip adding if we don't have a valid price
    if (!price) {
        console.log(`Skipping "${name}" as it doesn't have a valid price.`);
        return;
    }
    
    // Check if product is already in the cart
    const existingItemIndex = cart.findIndex(item => item.id === id);
    
    if (existingItemIndex !== -1) {
        // Increment quantity if item already exists
        cart[existingItemIndex].quantity += 1;
    } else {
        // Get the highest order index
        const maxOrderIndex = cart.length > 0 ? 
            Math.max(...cart.map(item => item.orderIndex || 0)) : -1;
        
        // Add new item to cart with order index
        cart.push({
            id: id,
            name: name,
            price: price,
            image: image,
            type: type,
            quantity: 1,
            orderIndex: maxOrderIndex + 1  // Ensures new items are added at the end
        });
    }
    
    // Add a small animation/feedback when adding to cart
    const shoppingIcon = document.querySelector('.shopping');
    if (shoppingIcon) {
        shoppingIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            shoppingIcon.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Update cart UI and save to localStorage
    updateCart();
    saveCart();
}

// Function to update cart UI
function updateCart() {
    if (!listCard) return;
    
    listCard.innerHTML = '';
    let totalPrice = 0;
    let totalItems = 0;

    if (cart.length === 0) {
        listCard.innerHTML = '<li class="empty-cart-message">Come on, order something!</li>';
        total.textContent = "₹0.00";
        quantity.textContent = "0";
        return;  // Stop function execution if the cart is empty
    }
    
    // Sort cart by orderIndex before rendering
    const sortedCart = [...cart].sort((a, b) => a.orderIndex - b.orderIndex);
    
    sortedCart.forEach((item, index) => {
        totalPrice += item.price * item.quantity;
        totalItems += item.quantity;
        
        // Create list item for cart
        const li = document.createElement('li');
        
        // Item info (image, name, type)
        const itemInfo = document.createElement('div');
        itemInfo.className = 'item-info';
        
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'item-name';
        nameSpan.textContent = item.name;
        
        const typeTag = document.createElement('span');
        typeTag.className = item.type === 'veg' ? 'item-type veg-tag' : 'item-type non-veg-tag';
        typeTag.textContent = item.type;
        
        itemInfo.appendChild(img);
        itemInfo.appendChild(nameSpan);
        itemInfo.appendChild(typeTag);
        
        // Item controls (quantity buttons, price)
        const itemControls = document.createElement('div');
        itemControls.className = 'item-controls';
        
        // Quantity controls
        const quantityDiv = document.createElement('div');
        quantityDiv.className = 'item-quantity';
        
        const minusBtn = document.createElement('button');
        minusBtn.textContent = '-';
        minusBtn.addEventListener('click', () => {
            // Find the real index in the original cart array
            const realIndex = cart.findIndex(cartItem => cartItem.id === item.id);
            changeQuantity(realIndex, -1);
        });
        
        const quantitySpan = document.createElement('span');
        quantitySpan.textContent = item.quantity;
        
        const plusBtn = document.createElement('button');
        plusBtn.textContent = '+';
        plusBtn.addEventListener('click', () => {
            // Find the real index in the original cart array
            const realIndex = cart.findIndex(cartItem => cartItem.id === item.id);
            changeQuantity(realIndex, 1);
        });
        
        quantityDiv.appendChild(minusBtn);
        quantityDiv.appendChild(quantitySpan);
        quantityDiv.appendChild(plusBtn);
        
        // Price
        const priceSpan = document.createElement('span');
        priceSpan.className = 'item-price';
        priceSpan.textContent = `₹${(item.price * item.quantity).toFixed(2)}`;
        
        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-item';
        removeBtn.textContent = '×';
        removeBtn.addEventListener('click', () => {
            // Find the real index in the original cart array
            const realIndex = cart.findIndex(cartItem => cartItem.id === item.id);
            removeFromCart(realIndex);
        });
        
        itemControls.appendChild(quantityDiv);
        itemControls.appendChild(priceSpan);
        itemControls.appendChild(removeBtn);
        
        // Append all to list item
        li.appendChild(itemInfo);
        li.appendChild(itemControls);
        
        listCard.appendChild(li);
    });
    
    // Update total price and quantity
    if (total) total.textContent = `₹${totalPrice.toFixed(2)}`;
    if (quantity) quantity.textContent = totalItems;
}

// Function to change item quantity
function changeQuantity(index, change) {
    if (index >= 0 && index < cart.length) {
        cart[index].quantity += change;
        
        // Remove item if quantity reaches 0
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        
        updateCart();
        saveCart();
    }
}

// Function to remove item from cart
function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        updateCart();
        saveCart();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add a checkout function
if (document.querySelector('.total')) {
    document.querySelector('.total').addEventListener('click', function() {
        if (cart.length > 0) {
            // Check if user is logged in before proceeding to checkout
            if (isUserLoggedIn()) {
                alert('Proceeding to checkout with a total of ₹' + parseFloat(this.textContent.replace('₹', '')).toFixed(2));
                window.location.href = "payment.html";
            } else {
                // Not logged in - redirect to login page
                alert('Please log in to continue with checkout.');
                // Save cart state to maintain it through the login process
                saveCart();
                // Redirect to login page with a return URL parameter
                window.location.href = "login.html?returnTo=payment.html";
            }
        } else {
            alert('Your cart is empty!');
        }
    });
}
function isUserLoggedIn() {
    // In a real application, this would use cookies, localStorage, or session management
    // For this example, check if we have a user session in localStorage
    return localStorage.getItem('userLoggedIn') === 'true';
}

// Initialize product data attributes for existing HTML
function initializeProductData() {
    document.querySelectorAll('.buttondesign').forEach(button => {
        // Skip navigation buttons
        if (!isProductButton(button)) {
            button.classList.add('navigation-button');
            return;
        }
        
        // Only set attributes if they don't already exist
        if (!button.hasAttribute('data-id')) {
            const productName = button.querySelector('.productname').textContent;
            const productId = generateProductId(button);
            const productType = getProductType(button);
            const productPrice = getDefaultPrice(productName);
            const productImage = button.querySelector('.photo')?.src || '';
            
            button.setAttribute('data-id', productId);
            button.setAttribute('data-name', productName);
            if (productPrice) {
                button.setAttribute('data-price', productPrice);
            }
            button.setAttribute('data-image', productImage);
            button.setAttribute('data-type', productType);
        }
    });
}

function initializeBeverageButtons() {
    // Get all buttons with product data
    const beverageButtons = document.querySelectorAll('[data-id]');
    
    beverageButtons.forEach(button => {
        // First, remove any existing click listeners
        // need to clone the button to remove all existing listeners
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // Make sure the button has the buttondesign class
        if (!newButton.classList.contains('buttondesign')) {
            newButton.classList.add('buttondesign');
        }
        
        // Add a single click event listener
        newButton.addEventListener('click', function(event) {
            event.preventDefault();
            
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-name');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            const productImage = this.getAttribute('data-image');
            const productType = this.getAttribute('data-type');
            
            // Debug log to verify we're only adding once
            console.log(`Adding to cart: ${productName}`);
            
            addToCart(productId, productName, productPrice, productImage, productType);
        });
    });
}

// Call this on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeProductData();
    initializeBeverageButtons();
});

let upiInput = document.getElementById("upi-id");
upiInput.addEventListener("keydown", (event) => {
    event.stopPropagation();
    event.stopImmediatePropagation();
}, true);

//Payment yaha se
document.addEventListener("DOMContentLoaded", function () {


    let cartItemsContainer = document.getElementById("cart-items");
    let totalPriceElement = document.getElementById("total-price");

    function loadCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartItemsContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `<tr><td colspan="3" style="color: white; text-align: center;">Your cart is empty.</td></tr>`;
            totalPriceElement.textContent = "₹0";
            return;
        }

        cart.forEach(item => {
            let row = document.createElement("tr");

            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price * item.quantity}</td>
            `;

            cartItemsContainer.appendChild(row);
            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = `₹${total}`;
    }

    loadCart();
});
document.addEventListener('DOMContentLoaded', function() {
    console.log('Payment page loaded - checking DOM elements');

    // Debugging: Log all form elements
    const paymentForm = document.getElementById("payment-form");
    const upiDetails = document.getElementById("upi-details");
    const netBankingDetails = document.getElementById("netbanking-details");
    const cardDetails = document.getElementById("card-details");
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    const paymentMessage = document.getElementById("payment-message");

    console.log('Form elements:', {
        paymentForm,
        upiDetails,
        netBankingDetails,
        cardDetails,
        paymentOptions: paymentOptions.length,
        paymentMessage
    });

    // Extensive error checking
    if (!paymentForm) {
        console.error('Payment form not found!');
        return;
    }

    // Use event delegation for more robust event handling
    paymentForm.addEventListener('click', function(event) {
        const target = event.target;
        
        // Handle payment method selection
        if (target.matches('input[name="payment"]')) {
            console.log('Payment method selected:', target.value);
            
            // Hide all payment details
            [upiDetails, netBankingDetails, cardDetails].forEach(details => {
                if (details) details.style.display = 'none';
            });

            // Show selected payment details
            switch(target.value) {
                case 'UPI':
                    if (upiDetails) upiDetails.style.display = 'flex';
                    break;
                case 'Net Banking':
                    if (netBankingDetails) netBankingDetails.style.display = 'flex';
                    break;
                case 'Credit Card':
                case 'Debit Card':
                    if (cardDetails) cardDetails.style.display = 'flex';
                    break;
            }
        }
    });

    // Ensure inputs are interactive
    const inputFields = document.querySelectorAll('input:not([type="radio"])');
    inputFields.forEach(input => {
        // Add multiple event listeners for maximum compatibility
        ['click', 'focus', 'touchstart'].forEach(eventType => {
            input.addEventListener(eventType, function(e) {
                console.log(`${eventType} event on ${input.id}`);
                this.focus(); // Explicitly call focus
                e.stopPropagation();
            });
        });

        // Input formatting for card number
        if (input.id === 'card-number') {
            input.addEventListener('input', function(e) {
                let value = this.value.replace(/\D/g, '');
                let formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
                this.value = formattedValue;
            });
        }
    });

    // Form submission handler
    paymentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Form submission attempted');

        const selectedPayment = document.querySelector('input[name="payment"]:checked');
        if (!selectedPayment) {
            paymentMessage.innerHTML = "❌ Please select a payment method!";
            paymentMessage.style.color = "red";
            return;
        }

        const paymentMethod = selectedPayment.value;
        let isValid = false;

        try {
            // Validation logic (similar to previous implementation)
            switch(paymentMethod) {
                case 'UPI':
                    const upiId = document.getElementById("upi-id").value.trim();
                    isValid = upiId.includes("@");
                    break;
                case 'Net Banking':
                    const accountName = document.getElementById("account-name").value.trim();
                    const bankName = document.getElementById("bank-name").value.trim();
                    isValid = accountName && bankName;
                    break;
                case 'Credit Card':
                case 'Debit Card':
                    const cardNumber = document.getElementById("card-number").value.trim().replace(/\s/g, '');
                    const cvv = document.getElementById("cvv").value.trim();
                    const expiryDate = document.getElementById("expiry-date").value;
                    
                    isValid = cardNumber.match(/^\d{16}$/) && 
                              cvv.match(/^\d{3}$/) && 
                              expiryDate;
                    break;
            }

            if (isValid) {
                paymentMessage.innerHTML = `✅ Payment successful via ${paymentMethod}! Redirecting...`;
                paymentMessage.style.color = "green";
                setTimeout(() => {
                    localStorage.removeItem("cart");
                    window.location.href = "index.html";
                }, 2000);
            } else {
                paymentMessage.innerHTML = `❌ Invalid ${paymentMethod} details!`;
                paymentMessage.style.color = "red";
            }
        } catch (error) {
            console.error('Form submission error:', error);
            paymentMessage.innerHTML = "❌ An error occurred during payment!";
            paymentMessage.style.color = "red";
        }
    });

    // Initial setup
    if (upiDetails) upiDetails.style.display = 'none';
    if (netBankingDetails) netBankingDetails.style.display = 'none';
    if (cardDetails) cardDetails.style.display = 'none';

    console.log('Payment script initialization complete');
});
