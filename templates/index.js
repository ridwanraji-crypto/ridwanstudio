// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Check if the necessary elements exist before adding event listeners
    if (menuBtn && navContainer && navLinks.length > 0) {
        // Toggle the 'active' class on the nav container when the menu button is clicked
        menuBtn.addEventListener('click', () => {
            navContainer.classList.toggle('active');
            
            // Change the menu button icon based on the menu's state
            const icon = menuBtn.querySelector('i');
            if (icon) {
                if (navContainer.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Get the current page's file name to highlight the active link
        const currentPage = window.location.pathname.split('/').pop();
        
        navLinks.forEach(link => {
            // Close the menu when a link is clicked
            link.addEventListener('click', () => {
                navContainer.classList.remove('active');
                
                // Reset the menu button icon to the 'fa-bars' state
                const icon = menuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });

            // Highlight the active link based on the current page URL
            const linkPage = link.getAttribute('href');
            // Compare the link's href with the current page
            if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
});