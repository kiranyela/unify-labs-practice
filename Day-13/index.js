/**
 * foundation.js
 * * Logic Foundation: Calculator & Type Utilities
 * production-ready script demonstrating variable declarations, 
 * arithmetic, and type inspection.
 */

// 1. Variable Declaration
// Using const for values that should not change during execution
const numberA = 15;
const numberB = 4;
const userName = "Developer";

// 2. Arithmetic Operations
// Sum
const sum = numberA + numberB;

// Product
const product = numberA * numberB;

// Remainder (Modulo)
const remainder = numberA % numberB;

// 3. String Concatenation & Welcome Message
// Using Template Literals (backticks) for cleaner concatenation
const welcomeMessage = `Hello, ${userName}. Welcome to the Logic Foundation module.`;

// 4. Console Output & Type Inspection
console.group("--- Calculator Results ---");
console.log(`Input A: ${numberA} | Input B: ${numberB}`);
console.log(`Sum: ${sum}`);
console.log(`Product: ${product}`);
console.log(`Remainder: ${remainder}`);
console.groupEnd();

console.group("--- Data Type Inspection ---");
// Inspecting number types
console.log(`Type of numberA: ${typeof numberA}`); // Expected: number

// Inspecting string types
console.log(`Type of userName: ${typeof userName}`); // Expected: string

// Inspecting the welcome message
console.log(`Type of welcomeMessage: ${typeof welcomeMessage}`); // Expected: string
console.groupEnd();

console.log("\n" + welcomeMessage);