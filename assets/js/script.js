import { EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, EMAIL_PUBLIC_KEY } from '../../utils/mail.js';

window.onload = function () {
    emailjs.init(EMAIL_PUBLIC_KEY);

    const form = document.getElementById("contact-form");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const submitBtn = form.querySelector("button[type='submit']");

    const showDialog = (message, isSuccess = true) => {
        const dialog = document.createElement("div");
        dialog.className = `fixed top-10 right-10 bg-${isSuccess ? 'green' : 'red'}-600 text-white px-6 py-3 rounded shadow-lg z-50`;
        dialog.innerText = message;
        document.body.appendChild(dialog);
        setTimeout(() => dialog.remove(), 3000);
    };

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Basic validation for email and phone number
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();

        // Simple email validation
        const isValidEmail = /\S+@\S+\.\S+/.test(email);
        if (!isValidEmail) {
            showDialog("Please enter a valid email address.", false);
            return;
        }

        // Validate phone number (only 10 or 11 digits allowed)
        const isValidPhone = /^[0-9]{10,11}$/.test(phone);
        if (phone && !isValidPhone) {
            showDialog("Phone number must be 10 or 11 digits.", false);
            return;
        }

        // Show spinner
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<svg class="animate-spin h-5 w-5 text-white inline mr-2" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>Sending...`;

        emailjs.sendForm(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, form)
            .then(() => {
                showDialog("Message sent successfully!");
                form.reset();
            })
            .catch((error) => {
                console.error("EmailJS error:", error);
                showDialog("Failed to send message.", false);
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            });
    });
};
