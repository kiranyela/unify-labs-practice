// --- GLOBAL STATE ---
let balance = 1000;
const MASTER_PIN = "9999";
const SECRET_WORD = "javascript";
const SECRET_MESSAGE = "CONGRATULATIONS! You found the hidden Easter Egg: 🥚";
const UNIT_PRICE = 50;

// --- BOOT SEQUENCE ---
function bootSystem() {
    console.log("System booting...");
    
    let attempts = 0;
    let isAuthenticated = false;

    while (attempts < 3) {
        let input = prompt(`[SYSTEM SECURITY]\nEnter Master PIN (Attempt ${attempts + 1}/3):`);
        
        if (input === MASTER_PIN) {
            isAuthenticated = true;
            break;
        } else {
            alert("ACCESS DENIED.");
            attempts++;
        }
    }

    if (isAuthenticated) {
        alert(`
**********************************
* WELCOME TO VIRTUAL CORE v1.0 *
**********************************
        `);
        runTerminal();
    } else {
        alert("!!! SYSTEM SELF-DESTRUCT INITIATED !!!");
        document.body.innerHTML = "<h1 style='color:red; text-align:center;'>SYSTEM DESTROYED</h1>";
    }
}

// --- COMMAND KERNEL ---
function runTerminal() {
    let running = true;

    while (running) {
        let command = prompt("[V-CORE]> Type command: (bank, shop, vault, exit)");

        if (command === null) { // Handle cancel button
            running = false; 
            break; 
        }

        command = command.toLowerCase().trim();

        switch (command) {
            case "bank":
                runBankModule();
                break;
            case "shop":
                runShopModule();
                break;
            case "vault":
                runVaultModule();
                break;
            case "exit":
                running = false;
                alert("Shutting down... Goodbye.");
                break;
            default:
                alert("ERROR: Unknown Command. Try 'bank', 'shop', 'vault', or 'exit'.");
        }
    }
}

// --- MODULE A: BANKING ---
function runBankModule() {
    let inBank = true;
    
    while(inBank) {
        let action = prompt(`[BANKING KERNEL]\nBalance: $${balance}\nChoose: (deposit, withdraw, balance, back)`);
        
        if (action === null) return; // Handle cancel

        action = action.toLowerCase().trim();

        if (action === "back") {
            inBank = false;
        } else if (action === "balance") {
            alert(`Current Balance: $${balance}`);
        } else if (action === "deposit") {
            let amount = parseFloat(prompt("Enter amount to deposit:"));
            if (!isNaN(amount) && amount > 0) {
                balance += amount;
                alert(`Deposited $${amount}. New Balance: $${balance}`);
            } else {
                alert("Invalid amount.");
            }
        } else if (action === "withdraw") {
            let amount = parseFloat(prompt("Enter amount to withdraw:"));
            if (!isNaN(amount) && amount > 0) {
                if (amount <= balance) {
                    balance -= amount;
                    alert(`Withdrew $${amount}. Remaining Balance: $${balance}`);
                } else {
                    alert("ERROR: INSUFFICIENT FUNDS.");
                }
            } else {
                alert("Invalid amount.");
            }
        } else {
            alert("Invalid bank command.");
        }
    }
}

// --- MODULE B: SHOP ---
function runShopModule() {
    let quantityInput = prompt(`[SMART SHOP]\nUnit Price: $${UNIT_PRICE}\nHow many items would you like to buy?`);
    
    if (quantityInput === null) return;

    let quantity = parseInt(quantityInput);
    
    if (isNaN(quantity) || quantity <= 0) {
        alert("Invalid quantity.");
        return;
    }

    let discountRate = 0;
    if (quantity >= 6 && quantity <= 10) {
        discountRate = 0.10; // 10%
    } else if (quantity >= 11) {
        discountRate = 0.20; // 20%
    }

    let totalCost = quantity * UNIT_PRICE;
    let discountAmount = totalCost * discountRate;
    let finalPrice = totalCost - discountAmount;

    let confirmPurchase = confirm(`
    Order Summary:
    ----------------
    Quantity: ${quantity}
    Unit Price: $${UNIT_PRICE}
    Subtotal: $${totalCost}
    Discount: ${discountRate * 100}% (-$${discountAmount})
    ----------------
    TOTAL: $${finalPrice}
    
    Proceed with purchase?
    `);

    if (confirmPurchase) {
        if (balance >= finalPrice) {
            balance -= finalPrice;
            alert(`Purchase Successful! Remaining Balance: $${balance}`);
        } else {
            alert("ERROR: INSUFFICIENT FUNDS.");
        }
    } else {
        alert("Transaction Cancelled.");
    }
}

// --- MODULE C: VAULT ---
function runVaultModule() {
    alert(`[SECURE VAULT]\nHINT: The language of the web.`);
    
    let guess = prompt("Enter the Secret Word:");
    
    if (guess !== null && guess.toLowerCase().trim() === SECRET_WORD) {
        alert(`ACCESS GRANTED.\n${SECRET_MESSAGE}`);
    } else {
        alert("ACCESS DENIED. Incorrect guess. Returning to main menu...");
    }
}
