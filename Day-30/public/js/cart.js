

const CART_STORAGE_KEY = 'titan_marketplace_cart';

// 1. Initialize cart state safely
let cart = [];
try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    cart = storedCart ? JSON.parse(storedCart) : [];
} catch (error) {
    console.error("❌ Failed to parse cart from localStorage. Resetting cart.", error);
    cart = [];
    localStorage.removeItem(CART_STORAGE_KEY); // Clear corrupted data
}


function saveCart() {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        
        // Dispatch a custom event so the UI knows to re-render
        // This keeps data logic completely separate from DOM logic
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }));
    } catch (error) {
        console.error("❌ Failed to save cart to localStorage. Storage might be full.", error);
    }
}

/**
 * Adds a product to the cart or increments its quantity if it exists.
 * @param {Object} product - The product object from the database.
 * @param {string} product._id - Unique identifier.
 * @param {string} product.name - Product name.
 * @param {number} product.price - Product price.
 */
function addToCart(product) {
    if (!product || !product._id) {
        console.warn("⚠️ Invalid product passed to addToCart.");
        return;
    }

    const existingItemIndex = cart.findIndex(item => item._id === product._id);

    if (existingItemIndex > -1) {
        // Increment quantity instead of adding a duplicate
        cart[existingItemIndex].quantity += 1;
        console.log(`⬆️ Increased quantity of ${product.name} to ${cart[existingItemIndex].quantity}`);
    } else {
        // Add new item with a default quantity of 1
        // We only copy necessary fields to save localStorage space
        cart.push({
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
        console.log(`🛒 Added ${product.name} to cart.`);
    }

    saveCart();
}

/**
 * Removes an item completely from the cart.
 * @param {string} productId - The _id of the product to remove.
 */
function removeFromCart(productId) {
    const initialLength = cart.length;
    cart = cart.filter(item => item._id !== productId);
    
    if (cart.length !== initialLength) {
        console.log(`🗑️ Removed product ${productId} from cart.`);
        saveCart();
    }
}

/**
 * Calculates the total price of all items in the cart.
 * Note: For UI display only. Actual charge total MUST be calculated on the backend.
 * @returns {number} Total cart value.
 */
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}
function clearCart() {
    cart = [];
    saveCart();
}

window.CartEngine = {
    getCart: () => cart,
    addToCart,
    removeFromCart,
    getCartTotal,
    clearCart
};