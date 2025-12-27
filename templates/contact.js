// contact.js - JavaScript for the Contact page

document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Change icon based on menu state
            const icon = menuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (menuBtn.querySelector('i')) {
                    menuBtn.querySelector('i').classList.remove('fa-times');
                    menuBtn.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }

    // Highlight active page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinksAll = document.querySelectorAll('.nav-links a');

    navLinksAll.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = question.nextElementSibling;

            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.querySelector('.faq-question').classList.remove('active');
                    item.querySelector('.faq-answer').classList.remove('active');
                }
            });

            // Toggle current FAQ item
            question.classList.toggle('active');
            answer.classList.toggle('active');
        });
    });

    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Reset error messages
            clearErrors();

            // Validate form
            let isValid = true;

            // Name validation
            const nameInput = document.getElementById('name');
            if (!nameInput.value.trim()) {
                showError('nameError', 'Please enter your name');
                isValid = false;
            }

            // Email validation
            const emailInput = document.getElementById('email');
            if (!emailInput.value.trim()) {
                showError('emailError', 'Please enter your email address');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }

            // Subject validation
            const subjectInput = document.getElementById('subject');
            if (!subjectInput.value.trim()) {
                showError('subjectError', 'Please enter a subject');
                isValid = false;
            }

            // Message validation
            const messageInput = document.getElementById('message');
            if (!messageInput.value.trim()) {
                showError('messageError', 'Please enter your message');
                isValid = false;
            }

            // If form is valid, simulate submission
            if (isValid) {
                // In a real application, you would send the form data to a server here
                // For this example, we'll just show a success message

                // Hide form and show success message
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';

                // Reset form after 5 seconds (for demo purposes)
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'block';
                    formSuccess.style.display = 'none';
                }, 5000);
            }
        });
    }

    // Helper function to show error messages
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
    }

    // Helper function to clear all error messages
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
    }

    // Helper function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation to contact methods
    const contactMethods = document.querySelectorAll('.contact-method');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    contactMethods.forEach(method => {
        method.style.opacity = '0';
        method.style.transform = 'translateY(20px)';
        method.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(method);
    });
});