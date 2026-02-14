/**
 * Task Master Data Dashboard
 * Handles data transformation for tasks, pricing, and expenses.
 */

// --- Constants ---
const TAX_RATE = 0.08; // 8%

// --- Mock Data (Immutable) ---
const mockTasks = Object.freeze([
  { id: 1, title: 'Database Migration', status: 'Completed' },
  { id: 2, title: 'API Endpoint Setup', status: 'Pending' },
  { id: 3, title: 'Unit Testing', status: 'Pending' },
  { id: 4, title: 'UI Deployment', status: 'Completed' },
]);

const mockProducts = Object.freeze([
  { id: 101, name: 'Cloud Instance T2', price: 50.00 },
  { id: 102, name: 'Domain SSL', price: 15.50 },
  { id: 103, name: 'Load Balancer', price: 100.00 },
]);

const mockExpenses = Object.freeze([
  { id: 201, category: 'Software', amount: 120.50 },
  { id: 202, category: 'Hardware', amount: 450.00 },
  { id: 203, category: 'Services', amount: 75.25 },
]);

// --- Utility Functions ---

/**
 * rounds a number to 2 decimal places to prevent floating point errors.
 * @param {number} num 
 * @returns {number}
 */
const currencyRound = (num) => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

// --- Core Logic ---

/**
 * Filters tasks into 'Completed' and 'Pending' categories.
 * @param {Array<{id: number, title: string, status: string}>} tasks 
 * @returns {Object} { completed: Array, pending: Array }
 */
const categorizeTasks = (tasks) => {
  if (!Array.isArray(tasks)) {
    throw new Error("Invalid input: 'tasks' must be an array.");
  }

  // Filter creates a shallow copy, preserving original data
  const completed = tasks.filter(task => task.status === 'Completed');
  const pending = tasks.filter(task => task.status === 'Pending');

  return { completed, pending };
};

/**
 * Maps over products to calculate tax and total price.
 * @param {Array<{id: number, name: string, price: number}>} products 
 * @returns {Array} New array with added tax details
 */
const processProductPricing = (products) => {
  if (!Array.isArray(products)) {
    throw new Error("Invalid input: 'products' must be an array.");
  }

  return products.map(product => {
    const taxAmount = currencyRound(product.price * TAX_RATE);
    const total = currencyRound(product.price + taxAmount);
    
    // Return new object to avoid mutation
    return {
      ...product,
      taxAmount,
      totalPrice: total
    };
  });
};

/**
 * Reduces expenses to a single total budget figure.
 * @param {Array<{amount: number}>} expenses 
 * @returns {number} Total budget
 */
const calculateTotalBudget = (expenses) => {
  if (!Array.isArray(expenses)) {
    throw new Error("Invalid input: 'expenses' must be an array.");
  }

  const total = expenses.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.amount;
  }, 0); // Always provide initial value 0

  return currencyRound(total);
};

// --- Execution ---

try {
  console.log("--- 1. Task Filtering ---");
  const { completed, pending } = categorizeTasks(mockTasks);
  console.log(`Completed Tasks: ${completed.length}`, completed);
  console.log(`Pending Tasks: ${pending.length}`, pending);

  console.log("\n--- 2. Product Mapping (Tax Calc) ---");
  const processedProducts = processProductPricing(mockProducts);
  console.table(processedProducts);

  console.log("\n--- 3. Budget Reduction ---");
  const totalBudget = calculateTotalBudget(mockExpenses);
  console.log(`Total Budget Required: $${totalBudget.toFixed(2)}`);

} catch (error) {
  console.error("Script Execution Failed:", error.message);
}