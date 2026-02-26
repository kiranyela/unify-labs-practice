

const API_BASE_URL = '/api';

const productGrid = document.getElementById('product-grid');
const searchInput = document.getElementById('search-input');
const categoryList = document.getElementById('category-list');
const cartCountDisplay = document.getElementById('cart-count');

let currentCategory = 'all';
let currentSearch = '';
let currentProducts = []; 


async function fetchProducts() {
    try {
        productGrid.innerHTML = '<div class="loader">Loading products...</div>';

        const params = new URLSearchParams();
        if (currentCategory !== 'all') params.append('category', currentCategory);
        if (currentSearch) params.append('search', currentSearch);

        const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`);
        
        if (!response.ok) throw new Error('Failed to fetch products');
        
        currentProducts = await response.json();
        renderProducts(currentProducts);
    } catch (error) {
        console.error("❌ API Error:", error);
        productGrid.innerHTML = '<div class="error">Failed to load products. Is the server running?</div>';
    }
}


function renderProducts(products) {
    productGrid.innerHTML = ''; 

    if (products.length === 0) {
        productGrid.innerHTML = `
            <div class="empty-state">
                <h3>No products found 😕</h3>
                <p>Try adjusting your search or category filter.</p>
            </div>
        `;
        return;
    }

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h4>${product.name}</h4>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" data-id="${product._id}">Add to Cart</button>
        `;
        productGrid.appendChild(card);
    });
}


function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}



searchInput.addEventListener('input', debounce((e) => {
    currentSearch = e.target.value.trim();
    fetchProducts();
}, 300));

categoryList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        document.querySelectorAll('#category-list li').forEach(li => li.classList.remove('active'));
        e.target.classList.add('active');

        currentCategory = e.target.getAttribute('data-category');
        fetchProducts();
    }
});

productGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
        const productId = e.target.getAttribute('data-id');
        const product = currentProducts.find(p => p._id === productId);
        
        if (product && window.CartEngine) {
            window.CartEngine.addToCart(product);
        }
    }
});

window.addEventListener('cartUpdated', (e) => {
    const cart = e.detail;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountDisplay.innerText = totalItems;
});


document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    
    if (window.CartEngine) {
        const initialCart = window.CartEngine.getCart();
        const totalItems = initialCart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountDisplay.innerText = totalItems;
    }
});

const cartToggleBtn = document.getElementById('cart-toggle');
const checkoutModal = document.getElementById('checkout-modal');
const closeModalBtn = document.getElementById('close-modal');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalPrice = document.getElementById('cart-total-price');
const checkoutForm = document.getElementById('checkout-form');


function renderCartModal() {
    const cart = window.CartEngine.getCart();
    cartItemsContainer.innerHTML = ''; // Clear previous

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; color:gray;">Your cart is empty.</p>';
        checkoutForm.style.display = 'none'; // Hide form if empty
    } else {
        checkoutForm.style.display = 'flex';
        cart.forEach(item => {
            const row = document.createElement('div');
            row.className = 'cart-item-row';
            row.innerHTML = `
                <span>${item.name} (x${item.quantity})</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            cartItemsContainer.appendChild(row);
        });
    }

    cartTotalPrice.innerText = window.CartEngine.getCartTotal().toFixed(2);
}

cartToggleBtn.addEventListener('click', () => {
    renderCartModal();
    checkoutModal.classList.remove('hidden');
});

closeModalBtn.addEventListener('click', () => {
    checkoutModal.classList.add('hidden');
});

window.addEventListener('click', (e) => {
    if (e.target === checkoutModal) {
        checkoutModal.classList.add('hidden');
    }
});

checkoutForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const cart = window.CartEngine.getCart();
    if (cart.length === 0) return alert("Your cart is empty!");

    const customerData = {
        name: document.getElementById('cust-name').value.trim(),
        email: document.getElementById('cust-email').value.trim(),
        address: document.getElementById('cust-address').value.trim()
    };

    const orderItems = cart.map(item => ({
        _id: item._id,
        quantity: item.quantity
    }));

    const submitBtn = checkoutForm.querySelector('.checkout-btn');
    submitBtn.innerText = 'Processing...';
    submitBtn.disabled = true;

    try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                customer: customerData,
                items: orderItems
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Failed to place order.");
        }

       
        alert(`Order Placed Successfully! \nOrder ID: ${result.orderId}\nTotal Charged: $${result.totalCharged.toFixed(2)}`);
        
        window.CartEngine.clearCart();
        checkoutForm.reset();
        checkoutModal.classList.add('hidden');

    } catch (error) {
        console.error("Checkout Error:", error);
        alert(`Error: ${error.message}`);
    } finally {
        submitBtn.innerText = 'Place Secure Order';
        submitBtn.disabled = false;
    }
});