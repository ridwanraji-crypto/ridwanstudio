// customquote.js - JavaScript for the Custom Quote page

document.addEventListener('DOMContentLoaded', function() {
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
    
    // Show/hide other project type field
    const projectTypeSelect = document.getElementById('projectType');
    const otherProjectTypeContainer = document.getElementById('otherProjectTypeContainer');
    
    if (projectTypeSelect && otherProjectTypeContainer) {
        projectTypeSelect.addEventListener('change', function() {
            if (this.value === 'other') {
                otherProjectTypeContainer.style.display = 'block';
            } else {
                otherProjectTypeContainer.style.display = 'none';
            }
        });
    }
    
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
    const customQuoteForm = document.getElementById('customQuoteForm');
    const quoteSuccess = document.getElementById('quoteSuccess');
    const userEmailSpan = document.getElementById('userEmail');
    
    if (customQuoteForm) {
        customQuoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset error messages
            clearErrors();
            
            // Validate form
            let isValid = true;
            
            // Name validation
            const nameInput = document.getElementById('fullName');
            if (!nameInput.value.trim()) {
                showError('nameError', 'Please enter your full name');
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
            
            // Phone validation
            const phoneInput = document.getElementById('phone');
            if (!phoneInput.value.trim()) {
                showError('phoneError', 'Please enter your phone number');
                isValid = false;
            }
            
            // Project name validation
            const projectNameInput = document.getElementById('projectName');
            if (!projectNameInput.value.trim()) {
                showError('projectNameError', 'Please enter a project name');
                isValid = false;
            }
            
            // Project type validation
            const projectTypeSelect = document.getElementById('projectType');
            if (!projectTypeSelect.value) {
                showError('projectTypeError', 'Please select a project type');
                isValid = false;
            }
            
            // Project description validation
            const descriptionInput = document.getElementById('projectDescription');
            if (!descriptionInput.value.trim()) {
                showError('descriptionError', 'Please describe your project');
                isValid = false;
            }
            
            // Timeline validation
            const timelineSelect = document.getElementById('timeline');
            if (!timelineSelect.value) {
                showError('timelineError', 'Please select a timeline');
                isValid = false;
            }
            
            // Budget validation
            const budgetSelect = document.getElementById('budget');
            if (!budgetSelect.value) {
                showError('budgetError', 'Please select a budget range');
                isValid = false;
            }
            
            // If form is valid, simulate submission
            if (isValid) {
                // In a real application, you would send the form data to a server here
                // For this example, we'll just show a success message
                
                // Set the user's email in the success message
                userEmailSpan.textContent = emailInput.value;
                
                // Hide form and show success message
                customQuoteForm.style.display = 'none';
                quoteSuccess.style.display = 'block';
                
                // Scroll to success message
                quoteSuccess.scrollIntoView({ behavior: 'smooth' });
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
    
    // Add animation to process steps
    const processSteps = document.querySelectorAll('.process-step');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    processSteps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(20px)';
        step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(step);
    });
});