
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
let currentSlide = 0; 
let slideInterval; 


function sliderNav(manual) {
    slides.forEach((slide, i) => {
        slide.classList.remove("active");
        slide.style.display = "none"; 
    });

    btns.forEach((btn) => btn.classList.remove("active"));

    slides[manual].classList.add("active");
    slides[manual].style.display = "block"; 
    btns[manual].classList.add("active");

    currentSlide = manual; 
}

function autoSlide() {
    currentSlide = (currentSlide + 1) % slides.length; 
    sliderNav(currentSlide);
}

function startAutoSlide() {
    slideInterval = setInterval(autoSlide, 15000); 
}

btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        sliderNav(i);
        clearInterval(slideInterval); 
        startAutoSlide(); 
    });
});


document.addEventListener("DOMContentLoaded", () => {
    sliderNav(0); 
    startAutoSlide(); 
});


let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let productButtons = document.querySelectorAll('.buttondesign:not(.navigation-button)');


let cart = [];


if (localStorage.getItem('cart')) {
    try {
        cart = JSON.parse(localStorage.getItem('cart'));
       
        if (!cart.some(item => 'orderIndex' in item)) {
            cart.forEach((item, index) => {
                item.orderIndex = index;
            });
        }
        
        cart.sort((a, b) => a.orderIndex - b.orderIndex);
        updateCart();
    } catch (e) {
        console.error("Error loading cart from localStorage:", e);
        localStorage.removeItem('cart');
        cart = [];
    }
}


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


productButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        
        if (button.classList.contains('navigation-button') || !button.querySelector('.productname')) {
            return;
        }
        
        
        event.preventDefault();
        
        const productId = button.getAttribute('data-id') || generateProductId(button);
        const productName = button.getAttribute('data-name') || button.querySelector('.productname').textContent;
        const productPrice = parseFloat(button.getAttribute('data-price')) || getDefaultPrice(productName);
        const productImage = button.getAttribute('data-image') || button.querySelector('.photo')?.src || '';
        const productType = button.getAttribute('data-type') || getProductType(button);
        
        addToCart(productId, productName, productPrice, productImage, productType);
    });
});


function generateProductId(button) {
    
    const dataId = button.getAttribute('data-id');
    if (dataId) return dataId;
    
   
    const name = button.querySelector('.productname')?.textContent || 'unknown-product';
    return name.toLowerCase().replace(/\s+/g, '-');
}


function getProductType(button) {
    if (button.querySelector('.veg')) return 'veg';
    if (button.querySelector('.nonveg')) return 'non-veg';
    return 'unknown';
}


function getDefaultPrice(productName) {
   
    const priceMap = {
        'CRISPY POTATO TACO': 1.99,
        'CRISPY CHICKEN TACO': 2.49,
        'CRISPY POTATO WRAP': 2.99,
        'CRISPY CHICKEN WRAP': 3.49,
        'MINI QUESADILLA - CHEESE': 1.79,
        'CHEESY CHICKEN QUESADILLA': 2.99,
        '2 CRUNCHY TACOS + 2 PANEER MAKHNI CHALUPA + CHEESY FRIES': 9.99,
        '2 CRUNCHY TACOS + 2 BUTTER CHICKEN CHALUPA + CHEESY FRIES': 10.99,
        'BIG BELL BOX': 12.99,
        '2 NAKED CHICKEN TACOS + 1 SEASONED NACHOS & SALSA + 1 CHURRO BOMBS': 15.99,
        '4 VEG 7 LAYER BURRITO VEG + 2 SEASONED FRIES + 2 CHURRO BOMBS': 17.99,
        '4 CHICKEN 7 LAYER BURRITO VEG + 2 SEASONED FRIES + 2 CHURRO BOMBS': 18.99
    };
    
    return priceMap[productName] || null; 
}


function isProductButton(button) {
    return (
        button.querySelector('.productname') && 
        (button.querySelector('.photo') || button.querySelector('.beverage')) && 
        (button.querySelector('.veg') || button.querySelector('.nonveg') || button.getAttribute('data-type') === 'veg')
    );
}


function addToCart(id, name, price, image, type) {
   
    if (!price) {
        console.log(`Skipping "${name}" as it doesn't have a valid price.`);
        return;
    }
    
    
    const existingItemIndex = cart.findIndex(item => item.id === id);
    
    if (existingItemIndex !== -1) {
       
        cart[existingItemIndex].quantity += 1;
    } else {
       
        const maxOrderIndex = cart.length > 0 ? 
            Math.max(...cart.map(item => item.orderIndex || 0)) : -1;
        
        
        cart.push({
            id: id,
            name: name,
            price: price,
            image: image,
            type: type,
            quantity: 1,
            orderIndex: maxOrderIndex + 1  
        });
    }
    
   
    const shoppingIcon = document.querySelector('.shopping');
    if (shoppingIcon) {
        shoppingIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            shoppingIcon.style.transform = 'scale(1)';
        }, 200);
    }
    
    
    updateCart();
    saveCart();
}


function updateCart() {
    if (!listCard) return;
    
    listCard.innerHTML = '';
    let totalPrice = 0;
    let totalItems = 0;

    if (cart.length === 0) {
        listCard.innerHTML = '<li class="empty-cart-message">Come on, order something!</li>';
        total.textContent = "₹0.00";
        quantity.textContent = "0";
        return;  
    }
    
    
    const sortedCart = [...cart].sort((a, b) => a.orderIndex - b.orderIndex);
    
    sortedCart.forEach((item, index) => {
        totalPrice += item.price * item.quantity;
        totalItems += item.quantity;
        
       
        const li = document.createElement('li');
        
        
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
        
       
        const itemControls = document.createElement('div');
        itemControls.className = 'item-controls';
        
       
        const quantityDiv = document.createElement('div');
        quantityDiv.className = 'item-quantity';
        
        const minusBtn = document.createElement('button');
        minusBtn.textContent = '-';
        minusBtn.addEventListener('click', () => {
            const realIndex = cart.findIndex(cartItem => cartItem.id === item.id);
            changeQuantity(realIndex, -1);
        });
        
        const quantitySpan = document.createElement('span');
        quantitySpan.textContent = item.quantity;
        
        const plusBtn = document.createElement('button');
        plusBtn.textContent = '+';
        plusBtn.addEventListener('click', () => {
            
            const realIndex = cart.findIndex(cartItem => cartItem.id === item.id);
            changeQuantity(realIndex, 1);
        });
        
        quantityDiv.appendChild(minusBtn);
        quantityDiv.appendChild(quantitySpan);
        quantityDiv.appendChild(plusBtn);
        
        
        const priceSpan = document.createElement('span');
        priceSpan.className = 'item-price';
        priceSpan.textContent = `₹${(item.price * item.quantity).toFixed(2)}`;
        
       
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-item';
        removeBtn.textContent = '×';
        removeBtn.addEventListener('click', () => {
           
            const realIndex = cart.findIndex(cartItem => cartItem.id === item.id);
            removeFromCart(realIndex);
        });
        
        itemControls.appendChild(quantityDiv);
        itemControls.appendChild(priceSpan);
        itemControls.appendChild(removeBtn);
        
        
        li.appendChild(itemInfo);
        li.appendChild(itemControls);
        
        listCard.appendChild(li);
    });
    
    
    if (total) total.textContent = `₹${totalPrice.toFixed(2)}`;
    if (quantity) quantity.textContent = totalItems;
}


function changeQuantity(index, change) {
    if (index >= 0 && index < cart.length) {
        cart[index].quantity += change;
        
        
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        
        updateCart();
        saveCart();
    }
}


function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        updateCart();
        saveCart();
    }
}


function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


if (document.querySelector('.total')) {
    document.querySelector('.total').addEventListener('click', function() {
        if (cart.length > 0) {
          
            if (isUserLoggedIn()) {
                alert('Proceeding to checkout with a total of ₹' + parseFloat(this.textContent.replace('₹', '')).toFixed(2));
                window.location.href = "payment.html";
            } else {
                
                alert('Please log in to continue with checkout.');
                
                saveCart();
               
                window.location.href = "login.html?returnTo=payment.html";
            }
        } else {
            alert('Your cart is empty!');
        }
    });
}
function isUserLoggedIn() {
   
    return localStorage.getItem('userLoggedIn') === 'true';
}


function initializeProductData() {
    document.querySelectorAll('.buttondesign').forEach(button => {
       
        if (!isProductButton(button)) {
            button.classList.add('navigation-button');
            return;
        }
        
        
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
   
    const beverageButtons = document.querySelectorAll('[data-id]');
    
    beverageButtons.forEach(button => {
       
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        
        if (!newButton.classList.contains('buttondesign')) {
            newButton.classList.add('buttondesign');
        }
        
       
        newButton.addEventListener('click', function(event) {
            event.preventDefault();
            
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-name');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            const productImage = this.getAttribute('data-image');
            const productType = this.getAttribute('data-type');
            
            
            console.log(`Adding to cart: ${productName}`);
            
            addToCart(productId, productName, productPrice, productImage, productType);
        });
    });
}


document.addEventListener('DOMContentLoaded', function() {
    initializeProductData();
    initializeBeverageButtons();
});

let upiInput = document.getElementById("upi-id");
upiInput.addEventListener("keydown", (event) => {
    event.stopPropagation();
    event.stopImmediatePropagation();
}, true);


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

    
    if (!paymentForm) {
        console.error('Payment form not found!');
        return;
    }

  
    paymentForm.addEventListener('click', function(event) {
        const target = event.target;
        
        
        if (target.matches('input[name="payment"]')) {
            console.log('Payment method selected:', target.value);
            
           
            [upiDetails, netBankingDetails, cardDetails].forEach(details => {
                if (details) details.style.display = 'none';
            });

            
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

   
    const inputFields = document.querySelectorAll('input:not([type="radio"])');
    inputFields.forEach(input => {
       
        ['click', 'focus', 'touchstart'].forEach(eventType => {
            input.addEventListener(eventType, function(e) {
                console.log(`${eventType} event on ${input.id}`);
                this.focus(); 
                e.stopPropagation();
            });
        });

       
        if (input.id === 'card-number') {
            input.addEventListener('input', function(e) {
                let value = this.value.replace(/\D/g, '');
                let formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
                this.value = formattedValue;
            });
        }
    });

   
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

    if (upiDetails) upiDetails.style.display = 'none';
    if (netBankingDetails) netBankingDetails.style.display = 'none';
    if (cardDetails) cardDetails.style.display = 'none';

    console.log('Payment script initialization complete');
});
