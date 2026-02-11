
const numberA = 15;
const numberB = 4;
const userName = "Developer";


const sum = numberA + numberB;


const product = numberA * numberB;


const remainder = numberA % numberB;


const welcomeMessage = `Hello, ${userName}. Welcome to the Logic Foundation module.`;


console.group("--- Calculator Results ---");
console.log(`Input A: ${numberA} | Input B: ${numberB}`);
console.log(`Sum: ${sum}`);
console.log(`Product: ${product}`);
console.log(`Remainder: ${remainder}`);
console.groupEnd();

console.group("--- Data Type Inspection ---");

console.log(`Type of numberA: ${typeof numberA}`); 

console.log(`Type of userName: ${typeof userName}`); 

console.log(`Type of welcomeMessage: ${typeof welcomeMessage}`);
console.groupEnd();

console.log("\n" + welcomeMessage);