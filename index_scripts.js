
window.onload = function() {
    setTimeout(function() {
        document.getElementById('loading-screen').style.display = 'none';
    }, 1000);
}

function loadingPage(){
    document.getElementById('loading-screen').style.display = 'flex';
    setTimeout(function() {
        document.getElementById('loading-screen').style.display = 'none';
    }, 1000);
}
function showAbout() {
    loadingPage();
    document.querySelector('.navbar').style.display = 'flex';
    document.getElementById('menu').style.display = 'none';
    document.getElementById('non-menu').style.display = 'flex';
    document.title = "Daily Grind || About Us";
    document.querySelector('.home-container').style.display = 'none';
    document.querySelector('.login-container').style.display = 'none';
    document.querySelector('.register-container').style.display = 'none';
    document.querySelector('.about-container').style.display = 'flex';
    document.querySelector('.contact-feedback-container').style.display = 'none';
    document.querySelector('.contact-container').style.display = 'flex';
}
function showContact() {
    loadingPage();
    document.querySelector('.navbar').style.display = 'flex';
    document.getElementById('menu').style.display = 'none';
    document.getElementById('non-menu').style.display = 'flex';
    document.title = "Daily Grind || Contact Us";
    document.querySelector('.home-container').style.display = 'none';
    document.querySelector('.login-container').style.display = 'none';
    document.querySelector('.register-container').style.display = 'none';
    document.querySelector('.about-container').style.display = 'none'
    document.querySelector('.contact-feedback-container').style.display = 'flex';
    document.querySelector('.contact-container').style.display = 'none';
}
function viewMenu(){
    loadingPage();
    document.title = "Daily Grind || Menu";
    document.querySelector('.navbar').style.display = 'flex';
    document.getElementById('non-menu').style.display = 'none';
    document.querySelector('.login-container').style.display = 'none';
    document.querySelector('.register-container').style.display = 'none';
    document.querySelector('.contact-container').style.display = 'flex';
    const menu = document.getElementById('menu');
    if (menu) {
        menu.style.display = 'flex'; // or 'block', depending on your layout
    }
}


// Make sure to set this variable when logging in


function showLogin() {
    loadingPage();
    document.title = "Daily Grind || Login";
    document.querySelector('.navbar').style.display = 'none';
    document.getElementById('menu').style.display = 'none';
    document.querySelector('.home-container').style.display = 'none';
    document.querySelector('.about-container').style.display = 'none';
    document.querySelector('.register-container').style.display = 'none';
    document.querySelector('.login-container').style.display = 'flex';
    document.querySelector('.contact-feedback-container').style.display = 'none';
    document.querySelector('.contact-container').style.display = 'none';
}

function showRegister() {
    loadingPage();
    document.querySelector('.navbar').style.display = 'none';
    document.title = "Daily Grind || Register";
    document.getElementById('menu').style.display = 'none';
    document.querySelector('.home-container').style.display = 'none';
    document.querySelector('.login-container').style.display = 'none';
    document.querySelector('.register-container').style.display = 'flex';
    document.querySelector('.about-container').style.display = 'none';
    document.querySelector('.contact-feedback-container').style.display = 'none';
    document.querySelector('.contact-container').style.display = 'none';
}

let cartItems = [];
const categoryDropdown = document.getElementById('categoryDropdown');
const productsContainer = document.getElementById('productsContainer');
const categoryTitle = document.getElementById('categoryTitle');
const cartButton = document.getElementById('cartButton');
const cartSidebar = document.getElementById('cartSidebar');
const closeCartButton = document.getElementById('closeCartButton');
const overlay = document.getElementById('overlay1');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const totalPriceElement = document.getElementById('totalPrice');
const checkoutButton = document.getElementById('checkoutButton');
const closePaymentButton = document.getElementById('closePaymentButton');

function makeCheckout() {
    // Check if the cart is empty
    if (isLoggedIn != true) {
        alert("Please log in or sign up to continue the purchasing progress!");
        return; // Exit the function early
    }
    if (cartItems.length === 0) {
        // Alert the customer if the cart is empty
        alert("Your cart is empty. Please add items to your cart before checking out.");
        return; // Exit the function early
    }

    // If the cart is not empty, proceed with checkout
    // Hide the cart sidebar
    cartSidebar.classList.remove('open');

    // Show the payment container
    const paymentPage = document.querySelector('.payment-page');
    paymentPage.classList.add('show'); // Add the show class to trigger the transition

    // Show the overlay
    overlay.classList.add('show');
}
function createCategoryLink(category) {
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = category.name;
    link.addEventListener('click', () => {
        displayProducts(category.items, category.name);
    });
    return link;
}





function updateTotalPrice() {
    let total = 0;
    const quantities = document.querySelectorAll('.cart-item .quantity');
    quantities.forEach(input => {
        const price = parseFloat(input.getAttribute('data-price'));
        const quantity = parseInt(input.value);
        total += price * quantity;
    });
    totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
    const totalPriceElementInOrderSummary = document.getElementById('total-price');
    totalPriceElementInOrderSummary.textContent = `Total: $${total.toFixed(2)}`;

    // Update quantity in order summary
    const cartItems = document.querySelectorAll('.cart-item');
    const orderItems = document.querySelectorAll('#order-summary li');
    cartItems.forEach((cartItem, index) => {
        const quantityInput = cartItem.querySelector('.quantity');
        const orderItem = orderItems[index];
        const orderQuantity = orderItem.querySelector('.quantity');
        orderQuantity.textContent = quantityInput.value;
    });
}


// Display all products by default

const sidebar = document.getElementById('categorySidebar');
// Cart sidebar functionality
cartButton.addEventListener('click', function(event) {
    event.preventDefault();
    cartSidebar.classList.toggle('open');
    overlay.classList.toggle('show');
});

closeCartButton.addEventListener('click', function() {
    cartSidebar.classList.remove('open');
    overlay.classList.remove('show');
});
closePaymentButton.addEventListener('click', function() {
    const paymentPage = document.querySelector('.payment-page');
    paymentPage.classList.remove('show'); 
    overlay.classList.remove('show');
});

overlay.addEventListener('click', function() {
    sidebar.classList.remove('open');
    cartSidebar.classList.remove('open');
    const paymentPage = document.querySelector('.payment-page');
    paymentPage.classList.remove('show'); 
    overlay.classList.remove('show');
});


function displayProducts(products, categoryName) {
    loadingPage();
    productsContainer.innerHTML = '';
    categoryTitle.textContent = categoryName;

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name} <span>$${product.price.toFixed(2)}</span></h2>
            <p>${product.description}</p>
            <button class="add-to-cart" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">+ Quick Add</button>
        `;
        productsContainer.appendChild(productElement);
    });
}
function sendFeedbackNotif(){
    alert('Feedback sent! Thank you for your feedback, we will read them soon!')
}
function showHome() {
    loadingPage();
    document.title = "Daily Grind || Homepage";
        document.querySelector('.navbar').style.display = 'flex';
    const homeContainer = document.querySelector('.home-container');
    const aboutContainer = document.querySelector('.about-container');
    const loginContainer = document.querySelector('.login-container');
    const registerContainer = document.querySelector('.register-container');
    const menu = document.getElementById('menu');
    const nonmenu = document.getElementById('non-menu');
    const viewMenuBtn = document.querySelector('.view-menu-btn');
    const logoutBtn = document.querySelector('.logout-btn');
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    document.querySelector('.navbar').style.display = 'flex';
    document.querySelector('.contact-feedback-container').style.display = 'none';
    document.querySelector('.contact-container').style.display = 'flex';
    if (homeContainer) {
        homeContainer.style.display = 'flex';
    }
    if (aboutContainer) {
        aboutContainer.style.display = 'none';
    }
    if (loginContainer) {
        loginContainer.style.display = 'none';
    }
    if (registerContainer) {
        registerContainer.style.display = 'none';
    }
    if (menu) {
        menu.style.display = 'none';
    }
    if (nonmenu) {
        nonmenu.style.display = 'flex';
    }

    // Check if user is logged in (you'll need to set this variable when logging in)
    if (isLoggedIn) {
        if (viewMenuBtn) {
            viewMenuBtn.style.display = 'block';
        }
        if (logoutBtn) {
            logoutBtn.style.display = 'block';
        }
        if (loginBtn) {
            loginBtn.style.display = 'none';
        }
        if (signupBtn) {
            signupBtn.style.display = 'none';
        }
    } else {
        if (viewMenuBtn) {
            viewMenuBtn.style.display = 'none';
        }
        if (logoutBtn) {
            logoutBtn.style.display = 'none';
        }
        if (loginBtn) {
            loginBtn.style.display = 'block';
        }
        if (signupBtn) {
            signupBtn.style.display = 'block';
        }
    }
}

function logout() {
    // Send a request to logout.php to destroy the session
    fetch('logout.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                isLoggedIn = false;
                showHome();
                // Optionally, show a logout success message
                alert('You have been logged out successfully.');
            }
        });
}
function addToCartEventListeners() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            const image = this.getAttribute('data-image');
            addToCart(name, price, image);
        });
    });
}
// Make sure to set this variable when logging in
let isLoggedIn = document.querySelector('#is-logged-in').value === 'true';

document.querySelector('.login-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    // Assuming you're using fetch to submit the form
    fetch('login.php', {
        method: 'POST',
        body:new FormData(this)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            isLoggedIn = true;
            showHome();
            // Optionally, show a login success message
            alert('You have been logged in successfully.');
        }
    });
});
function formatCategoryName(category) {
    return category
        .split(/[-\s]+/)
        .map(word => {
            return word.replace(/\w+/g, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        })
        .join(' ');
}

// Function to load subcategories
function loadSubcategories() {
    return fetch('get_subcategories.php')
        .then(response => response.json())
        .then(subcategories => {
            const categoryDropdown = document.querySelector('.category-dropdown');
            if (!categoryDropdown) {
                console.error('Category dropdown not found');
                return;
            }
            categoryDropdown.innerHTML = '<a href="#" data-category="all">All Products</a>';
            subcategories.forEach(subcategory => {
                categoryDropdown.innerHTML += `<a href="#" data-category="${subcategory}">${formatCategoryName(subcategory)}</a>`;
            });
            addCategoryEventListeners();
        })
        .catch(error => console.error('Error:', error));
}

// Function to add event listeners to category links
function addCategoryEventListeners() {
    const categoryLinks = document.querySelectorAll('.category-dropdown a');
    const categoryTitle = document.getElementById('categoryTitle');
    
    if (!categoryTitle) {
        console.warn('Category title element not found. Retrying in 500ms.');
        setTimeout(addCategoryEventListeners, 500);
        return;
    }

    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            categoryTitle.textContent = category === 'all' ? 'All Products' : formatCategoryName(category);
            loadProducts(category);
            toggleCategoryDropdown();
        });
    });

    const categorySelector = document.querySelector('.category-selector');
    if (categorySelector) {
        categorySelector.addEventListener('click', toggleCategoryDropdown);
    } else {
        console.warn('Category selector not found');
    }
}

// Function to toggle category dropdown visibility


// Function to load products
function loadProducts(category = 'all') {
    const url = category === 'all' 
        ? 'get_products.php' 
        : `get_products.php?subcategory=${encodeURIComponent(category)}`;
    
    fetch(url)
        .then(response => response.json())
        .then(products => {
            const productsContainer = document.querySelector('.products');
            const categoryTitle = document.getElementById('categoryTitle');
            
            if (!productsContainer) {
                console.error('Products container not found');
                return;
            }
            
            if (categoryTitle) {
                categoryTitle.textContent = category === 'all' ? 'All Products' : formatCategoryName(category);
            }

            productsContainer.innerHTML = '';
            products.forEach(product => {
                if (product && product.name && product.price && product.image) {
                    productsContainer.innerHTML += `
                        <div class="product">
                            <img src="${product.image}" alt="${product.name}">
                            <h2>${product.name} <span>RM${parseFloat(product.price).toFixed(2)}</span></h2>
                            <p>${product.description || ''}</p>
                            <button class="add-to-cart" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">+ Quick Add</button>
                         </div>
                    `;
                } else {
                    console.error('Invalid product data:', product);
                }
            });
            addToCartEventListeners();
        })
        .catch(error => console.error('Error:', error));
}

// Function to add event listeners to "Add to Cart" buttons
function addToCart(name, price, image) {
    
    if (!name || typeof price !== 'number' || !image) {
        console.error('Invalid product data:', { name, price, image });
        return;
    }

    const existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        cartItems.push({ name, price, image, quantity: 1 });
    }
    updateCartDisplay();
}
// Function to update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const orderSummary = document.getElementById('order-summary');
    const cartCountBadge = document.getElementById('cart-count'); 
    if (!cartItemsContainer || !orderSummary) {
        console.error('Cart items container or order summary not found');
        return;
    }
    cartItemsContainer.innerHTML = '';
    orderSummary.innerHTML = '';
    let total = 0;

    cartItems.forEach((item, index) => {
        if (!item || typeof item.price !== 'number') {
            console.error(`Invalid item at index ${index}:`, item);
            return; // Skip this item and continue with the next
        }

        // Update cart sidebar
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image || ''}" alt="${item.name || 'Unknown Item'}">
            <div class="item-details">
                <h4>${item.name || 'Unknown Item'}</h4>
                <p>RM${item.price.toFixed(2)}</p>
            </div>
            <input type="number" class="quantity" value="${item.quantity || 1}" min="1" data-name="${item.name || ''}">
            <button class="remove-button">Remove</button>
        `;

        // Add event listeners for quantity input and remove button
        const quantityInput = cartItem.querySelector('.quantity');
        quantityInput.addEventListener('input', () => {
            const newQuantity = parseInt(quantityInput.value);
            const itemIndex = cartItems.findIndex(i => i.name === quantityInput.getAttribute('data-name'));
            if (itemIndex !== -1) {
                if (newQuantity > 0) {
                    cartItems[itemIndex].quantity = newQuantity;
                } else {
                    cartItems.splice(itemIndex, 1);
                }
                updateCartDisplay();
            }
        });

        const removeButton = cartItem.querySelector('.remove-button');
        removeButton.addEventListener('click', () => {
            const itemIndex = cartItems.findIndex(i => i.name === item.name);
            if (itemIndex !== -1) {
                cartItems.splice(itemIndex, 1);
                updateCartDisplay();
            }
        });

        cartItemsContainer.appendChild(cartItem);

        // Update order summary
        const orderItem = document.createElement('li');
        orderItem.innerHTML = `
            <img src="${item.image || ''}" alt="${item.name || 'Unknown Item'}">
            <div class="item-details">
                <h4>${item.name || 'Unknown Item'}</h4>
                <p>RM${item.price.toFixed(2)}</p>
            </div>
            <div class="quantity-container">
                <p class="quantity">${item.quantity || 1}</p>
            </div>
        `;
        orderSummary.appendChild(orderItem);

        total += item.price * (item.quantity || 1);
    });

    // Update total price in cart sidebar
    const totalPriceElement = document.getElementById('totalPrice');
    if (totalPriceElement) {
        totalPriceElement.textContent = `Total: RM${total.toFixed(2)}`;
    }

    // Update total price in order summary
    const totalPriceElementInOrderSummary = document.getElementById('total-price');
    if (totalPriceElementInOrderSummary) {
        totalPriceElementInOrderSummary.textContent = `Total: RM${total.toFixed(2)}`;
    }
    
    const totalItemsCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    cartCountBadge.textContent = totalItemsCount > 0 ? totalItemsCount : '0'; // Show count or hide if 0

    // Show or hide the cart count badge
    if (totalItemsCount === 0) {
        cartCountBadge.style.display = 'none'; // Hide badge if cart is empty
    } else {
    cartCountBadge.style.display = 'block'; // Show badge if there are items in the cart
    }
}
document.addEventListener('DOMContentLoaded', function() {
    loadSubcategories();
    loadProducts();
    setupSearch();
});

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

setInterval(nextSlide, 3000);

function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const allProducts = document.querySelectorAll('.product');
    
    allProducts.forEach(product => {
        const productName = product.querySelector('h2').textContent.toLowerCase();
        const productDescription = product.querySelector('p').textContent.toLowerCase();
        
        if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

function setupSearch() {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');

    searchButton.addEventListener('click', searchProducts);
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchProducts();
        }
    });
}
let cartCount = 0;

function toggleSidebar() {
    const sidebar = document.getElementById('categorySidebar');
    sidebar.classList.toggle('open'); // Toggle the 'open' class
    overlay.classList.toggle('show');
}
