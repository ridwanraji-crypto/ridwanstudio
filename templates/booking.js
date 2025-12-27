// Function to show error messages
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Function to clear error messages
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });
}

// Get form elements
const bookingForm = document.getElementById('bookingForm');
const bookingSuccess = document.getElementById('bookingSuccess');
const userEmailSpan = document.getElementById('userEmail');

// Initialize Flatpickr for the date input
if (document.getElementById('preferredDate')) {
    flatpickr("#preferredDate", {
        dateFormat: "Y-m-d",
        minDate: "today"
    });
}

// Mobile menu functionality (your existing code)
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
}

// FAQ accordion functionality (your existing code)
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const icon = this.querySelector('i');
        
        this.classList.toggle('active');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
        
        if (this.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = 0;
        }
    });
});

// EmailJS Initialization
// The emailjs.init() call is optional but good practice.
// You must replace 'YOUR_USER_ID' with your actual Public Key from EmailJS.
emailjs.init('K2zkczV3xIfYQFaKW');

// Main form submission logic with EmailJS
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Clear previous errors
        clearErrors();

        let isValid = true;
        
        // --- Validation Logic ---
        const nameInput = document.getElementById('fullName');
        if (!nameInput.value.trim()) {
            showError('nameError', 'Please enter your full name');
            isValid = false;
        }

        const emailInput = document.getElementById('email');
        if (!emailInput.value || !emailInput.value.includes('@')) {
            showError('emailError', 'Please enter a valid email address.');
            isValid = false;
        }
        
        const phoneInput = document.getElementById('phone');
        if (!phoneInput.value.trim()) {
            showError('phoneError', 'Please enter your phone number.');
            isValid = false;
        }
        
        const packageSelect = document.getElementById('package');
        if (packageSelect.value === '') {
            showError('packageError', 'Please select a package.');
            isValid = false;
        }
        
        const descriptionTextarea = document.getElementById('projectDescription');
        if (!descriptionTextarea.value.trim()) {
            showError('descriptionError', 'Please describe your project.');
            isValid = false;
        }

        const dateInput = document.getElementById('preferredDate');
        if (!dateInput.value.trim()) {
            showError('dateError', 'Please select a preferred date.');
            isValid = false;
        }
        
        const timeSelect = document.getElementById('preferredTime');
        if (timeSelect.value === '') {
            showError('timeError', 'Please select a preferred time.');
            isValid = false;
        }

        if (!isValid) {
            return; // Stop the submission if validation fails
        }
        
        // Disable the button and change text to indicate sending
        const submitBtn = document.querySelector('.form-submit button');
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Send the form data using EmailJS
        emailjs.sendForm('service_tm7uf4h', 'template_4c1yub7', this, 'K2zkczV3xIfYQFaKW')
            .then(() => {
                console.log('SUCCESS!');
                // Hide the form and show the success message
                bookingForm.style.display = 'none';
                bookingSuccess.style.display = 'block';
                userEmailSpan.textContent = emailInput.value;
                bookingSuccess.scrollIntoView({ behavior: 'smooth' });

                // Reset button state (optional, since the form is hidden)
                submitBtn.textContent = 'Book Consultation';
                submitBtn.disabled = false;
            })
            .catch((error) => {
                console.error('FAILED...', error);
                alert('An error occurred. Please try again later.');

                // Re-enable the button on failure
                submitBtn.textContent = 'Book Consultation';
                submitBtn.disabled = false;
            });
    });
}