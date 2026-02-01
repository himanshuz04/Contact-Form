console.log('Script loaded');

// Initialize EmailJS
if (typeof emailjs !== 'undefined') {
    emailjs.init('sfB1PJGrtxnp8TC5A');
    console.log('✓ EmailJS initialized');
} else {
    console.error('✗ EmailJS failed to load');
}

const SERVICE_ID = "service_4kr2usb";
const TEMPLATE_ID = "template_sotctb9";

// Elements
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("from_name");
const emailInput = document.getElementById("from_email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");
const successMessage = document.getElementById("successMessage");
const submitBtn = document.querySelector(".submit-btn");

// Error spans
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const messageError = document.getElementById("messageError");

// Validation listeners
nameInput.addEventListener("blur", validateName);
emailInput.addEventListener("blur", validateEmail);
phoneInput.addEventListener("blur", validatePhone);
messageInput.addEventListener("blur", validateMessage);

[nameInput, emailInput, phoneInput, messageInput].forEach(input => {
    input.addEventListener("input", () => clearError(input, getErrorEl(input)));
});

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    successMessage.style.display = "none";

    if (
        validateName() &&
        validateEmail() &&
        validatePhone() &&
        validateMessage()
    ) {
        submitForm();
    }
});

// Validation functions
function validateName() {
    const v = nameInput.value.trim();
    if (!v) return show(nameInput, nameError, "Name is required");
    if (v.length < 2) return show(nameInput, nameError, "Min 2 characters");
    if (!/^[a-zA-Z\s]+$/.test(v)) return show(nameInput, nameError, "Only letters allowed");
    return clear(nameInput, nameError);
}

function validateEmail() {
    const v = emailInput.value.trim();
    if (!v) return show(emailInput, emailError, "Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
        return show(emailInput, emailError, "Invalid email");
    return clear(emailInput, emailError);
}

function validatePhone() {
    const v = phoneInput.value.trim();
    if (!v) return clear(phoneInput, phoneError);
    if (!/^\d{10,}$/.test(v.replace(/[\s\-()+]/g, "")))
        return show(phoneInput, phoneError, "Invalid phone number");
    return clear(phoneInput, phoneError);
}

function validateMessage() {
    const v = messageInput.value.trim();
    if (!v) return show(messageInput, messageError, "Message required");
    if (v.length < 10) return show(messageInput, messageError, "Min 10 characters");
    return clear(messageInput, messageError);
}

// Helpers
function show(input, el, msg) {
    input.classList.add("error");
    el.textContent = msg;
    el.classList.add("show");
    return false;
}

function clear(input, el) {
    input.classList.remove("error");
    el.textContent = "";
    el.classList.remove("show");
    return true;
}

function getErrorEl(input) {
    return document.getElementById(input.id.replace("from_", "") + "Error");
}

// ✅ FIXED EmailJS submission
function submitForm() {
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, contactForm)
        .then(() => {
            successMessage.style.display = "block";
            contactForm.reset();
        })
        .catch(err => {
            console.error("EmailJS Error:", err);
            alert("Failed to send message. Try again.");
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message";
        });
}
