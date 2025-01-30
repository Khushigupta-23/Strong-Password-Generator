// Function to generate a random password
function generatePassword() {
    const length = Math.floor(Math.random() * (20 - 6 + 1)) + 6; // Random length between 6 and 20
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    
    // Generate password using random characters from charset
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    
    // Display the generated password
    document.getElementById('password').value = password;

    // Call function to show password strength
    const strength = showStrength(password);

    // Call function to check password rules
    checkPasswordRules(password);

    // Enable or disable copy button based on password strength
    handleCopyButton(strength);

    // Display warning message with colored text based on strength
    showPasswordWarning(strength);
}

// Function to show password strength and return strength
function showStrength(password) {
    const strengthElement = document.getElementById('strength-indicator');
    let strength = "Weak";

    const regex = {
        weak: /^[a-zA-Z0-9]{6,}$/, // Letters + Numbers
        medium: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/, // Letters + Numbers + Symbols
        strong: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()]).{12,}$/ // Full Strength
    };

    if (regex.strong.test(password)) {
        strength = "Strong";
    } else if (regex.medium.test(password)) {
        strength = "Medium";
    }

    strengthElement.textContent = `Password Strength: ${strength}`;
    return strength;
}

// Function to show or hide password warning based on strength
function showPasswordWarning(strength) {
    const warningElement = document.getElementById('password-warning');

    if (strength === "Weak") {
        warningElement.style.display = 'block';
        warningElement.textContent = "Warning: This password is too weak. Please generate a stronger password.";
        warningElement.style.color = 'red'; // Red color for weak password
    } else if (strength === "Medium") {
        warningElement.style.display = 'block';
        warningElement.textContent = "Warning: This password is medium. Try making it stronger.";
        warningElement.style.color = 'orange'; // Orange color for medium password
    } else {
        warningElement.style.display = 'block'; 
        warningElement.textContent = "This password is strong. You can use this password.";
        warningElement.style.color = 'green'; // Orange color for medium password
    }
}

// Function to handle password strength and disable/enable copy button
function handleCopyButton(strength) {
    const copyButton = document.getElementById('copy-btn');

    if (strength === "Weak" || strength === "Medium") {
        copyButton.disabled = true;  // Disable the copy button if password is weak or medium
        copyButton.style.backgroundColor = "#ddd";  // Change button color to indicate it's disabled
        copyButton.style.cursor = "not-allowed";
    } else {
        copyButton.disabled = false;  // Enable the copy button if password is strong
        copyButton.style.backgroundColor = "#f2cccc";  // Reset button color to normal
        copyButton.style.cursor = "pointer";
    }
}

// Function to check if password fulfills the rules
function checkPasswordRules(password) {
    // Rule checks
    const ruleLength = document.getElementById('rule-length');
    const ruleUppercase = document.getElementById('rule-uppercase');
    const ruleLowercase = document.getElementById('rule-lowercase');
    const ruleNumber = document.getElementById('rule-number');
    const ruleSpecial = document.getElementById('rule-special');
    const ruleRepeated = document.getElementById('rule-repeated');
    const ruleCommon = document.getElementById('rule-common');
    const ruleMix = document.getElementById('rule-mix');
    const rulePersonal = document.getElementById('rule-personal');
    
    // Check for minimum and maximum length (6-20)
    ruleLength.checked = password.length >= 6 && password.length <= 20;

    // Check for uppercase letter
    ruleUppercase.checked = /[A-Z]/.test(password);

    // Check for lowercase letter
    ruleLowercase.checked = /[a-z]/.test(password);

    // Check for number
    ruleNumber.checked = /\d/.test(password);

    // Check for special character
    ruleSpecial.checked = /[!@#$%^&*()]/.test(password);

    // Check for repeated characters (e.g. aaaa, 1111)
    ruleRepeated.checked = !/(.)\1{3,}/.test(password);

    // Check for common words like "password", "123456", "admin"
    ruleCommon.checked = !/(password|123456|admin)/i.test(password);

    // Check for balanced mix of character types (uppercase, lowercase, numbers, symbols)
    ruleMix.checked = /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /[!@#$%^&*()]/.test(password);

    // Check for personal information like name or birthdate (simple example: no "name" or "birthday")
    rulePersonal.checked = !/(name|birthdate|dob)/i.test(password);
}

// Function to copy password to clipboard
function copyToClipboard() {
    const passwordField = document.getElementById('password');
    passwordField.select();
    document.execCommand('copy');
    alert('Password copied to clipboard!');
}

// Event listeners for buttons
document.getElementById('generate-btn1').addEventListener('click', generatePassword);
document.getElementById('copy-btn').addEventListener('click', copyToClipboard);
