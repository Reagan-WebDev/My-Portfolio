document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    // Font Toggle
    const fontToggle = document.getElementById('font-toggle');
    const fonts = ['inter', 'playfair', 'poppins', 'roboto', 'lato', 'montserrat', 'opensans', 'raleway', 'merriweather', 'oswald'];
    let currentFontIndex = 0;

    // Check for saved preference
    const savedFont = localStorage.getItem('font') || 'inter';
    html.setAttribute('data-font', savedFont);
    currentFontIndex = fonts.indexOf(savedFont);

    fontToggle.addEventListener('click', () => {
        currentFontIndex = (currentFontIndex + 1) % fonts.length;
        const newFont = fonts[currentFontIndex];

        html.setAttribute('data-font', newFont);
        localStorage.setItem('font', newFont);
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const successMessage = document.getElementById('success-message');
        const successText = document.getElementById('success-text');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const name = document.getElementById('name').value;
            const errorMessage = document.getElementById('error-message');
            const errorText = document.getElementById('error-text');

            // Email Validation: Check if local part (before @) is at least 8 characters
            const emailParts = email.split('@');
            if (emailParts.length > 0) {
                const localPart = emailParts[0];
                if (localPart.length < 8) {
                    errorText.textContent = `Email username must be at least 8 characters. Please use a valid email.`;
                    errorMessage.classList.add('show');

                    setTimeout(() => {
                        errorMessage.classList.remove('show');
                    }, 5000);
                    return; // Stop execution
                }
            }

            successText.textContent = `Hi ${name}, Your Message was successfully submitted Thank you for Contacting me.`;

            successMessage.classList.add('show');
            contactForm.reset();

            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
        });
    }

    // Fix: Explicitly handle social links to ensure they open in new tab
    // and prevent default behavior or bubbling
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href !== '#' && !href.startsWith('mailto:')) {
                e.preventDefault();
                e.stopPropagation();
                window.open(href, '_blank');
            }
        });
    });
});
