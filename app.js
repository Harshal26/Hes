/**
 * Harshal Engineering Services (HES) - Core Application Script
 * Orchestrates: Header states, dark/light theme, scroll-reveal, stats counting,
 * academy card preview, interactive CAESAR II simulator, marketing console,
 * clipboard copy, and contact form flow.
 * Design: Dark Industrial / Gold Accent (gridlinelab style)
 */

document.addEventListener("DOMContentLoaded", () => {



    /* ==========================================================================
       1. HEADER STICKY STATE & MOBILE MENU TOGGLE
       ========================================================================== */
    const mainHeader = document.getElementById("mainHeader");
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navMenu = document.getElementById("navMenu");
    
    // Sticky Header Scroll Event
    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            mainHeader.classList.add("scrolled");
        } else {
            mainHeader.classList.remove("scrolled");
        }
    });
    
    // Mobile Nav Menu Toggle
    if (mobileMenuBtn && navMenu) {
        const menuOpenIcon  = mobileMenuBtn.querySelector('.menu-open');
        const menuCloseIcon = mobileMenuBtn.querySelector('.menu-close');

        mobileMenuBtn.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("mobile-open");
            if (menuOpenIcon)  menuOpenIcon.style.display  = isOpen ? 'none'         : 'inline-block';
            if (menuCloseIcon) menuCloseIcon.style.display = isOpen ? 'inline-block' : 'none';
        });
        
        // Close menu on click of nav link
        const navLinks = navMenu.querySelectorAll(".nav-link, .btn-header");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("mobile-open");
                if (menuOpenIcon)  menuOpenIcon.style.display  = 'inline-block';
                if (menuCloseIcon) menuCloseIcon.style.display = 'none';
            });
        });
    }

    /* ==========================================================================
       1b. SCROLL-REVEAL ANIMATION (Intersection Observer)
       ========================================================================== */
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealEls.forEach(el => revealObserver.observe(el));

    /* ==========================================================================
       1c. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');
    const navLinkEls = document.querySelectorAll('.nav-link');
    const activateNavLink = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) current = section.getAttribute('id');
        });
        navLinkEls.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) link.classList.add('active');
        });
    };
    window.addEventListener('scroll', activateNavLink, { passive: true });

    /* ==========================================================================
       2. LIGHT / DARK THEME TOGGLE WITH LOCAL STORAGE
       ========================================================================== */
    const themeToggle = document.getElementById("themeToggle");
    
    // Check local storage or system default
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
    } else {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
    }
    
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        document.body.classList.toggle("dark-theme");
        
        const currentTheme = document.body.classList.contains("light-theme") ? "light" : "dark";
        localStorage.setItem("theme", currentTheme);
    });

    /* ==========================================================================
       3. ANIMATED STATISTICS COUNTER ON SCROLL
       ========================================================================== */
    const statNumbers = document.querySelectorAll(".stat-number");
    let statsAnimated = false;
    
    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute("data-target"), 10);
            const suffix = stat.getAttribute("data-suffix") || '';
            stat.innerText = '0';
            const countUp = () => {
                const count = parseInt(stat.innerText, 10);
                const speed = Math.ceil(target / 40);
                if (count < target) {
                    stat.innerText = Math.min(count + speed, target) + suffix;
                    setTimeout(countUp, 30);
                } else {
                    stat.innerText = target + suffix;
                }
            };
            countUp();
        });
    };
    
    // Intersection Observer for scroll triggers
    const statsSection = document.getElementById("stats");
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    animateStats();
                    statsAnimated = true;
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        statsObserver.observe(statsSection);
    }

    /* ==========================================================================
       Training Academy, Simulator, and Marketing sections removed from app.js.
       ========================================================================== */

    /* ==========================================================================
       8. CONTACT FORM SIMULATION & SUCCESS SCREEN
       ========================================================================== */
    const hesContactForm = document.getElementById("hesContactForm");
    const formSuccessScreen = document.getElementById("formSuccessScreen");
    const btnResetForm = document.getElementById("btnResetForm");
    const btnSubmitForm = document.getElementById("btnSubmitForm");
    
    // Toast Notification utility
    const toastNotification = document.getElementById("toastNotification");
    const toastTitle = toastNotification ? toastNotification.querySelector(".toast-title") : null;
    const toastMessage = document.getElementById("toastMessage");
    const toastIcon = toastNotification ? toastNotification.querySelector(".toast-icon") : null;
    let toastTimeout = null;

    const showToast = (title, message, type = "success") => {
        if (!toastNotification) return;

        // Reset previous timeout
        if (toastTimeout) {
            clearTimeout(toastTimeout);
        }

        // Set text
        if (toastTitle) toastTitle.textContent = title;
        if (toastMessage) toastMessage.textContent = message;

        // Apply theme/type classes
        toastNotification.className = "toast-toast"; // base class
        if (type === "error") {
            toastNotification.classList.add("toast-error");
            if (toastIcon) {
                toastIcon.className = "ph ph-x-circle toast-icon";
            }
        } else {
            // Default uses the gold/yellow theme of the website
            if (toastIcon) {
                toastIcon.className = "ph ph-check-circle toast-icon";
            }
        }

        // Show toast
        toastNotification.classList.remove("hidden");

        // Auto hide after 4 seconds
        toastTimeout = setTimeout(() => {
            toastNotification.classList.add("hidden");
        }, 4000);
    };

    if (hesContactForm) {
        hesContactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Validate access key config
            const accessKeyInput = hesContactForm.querySelector('input[name="access_key"]');
            if (!accessKeyInput || accessKeyInput.value === 'YOUR_ACCESS_KEY_HERE' || accessKeyInput.value.trim() === '') {
                showToast(
                    "Setup Required", 
                    "Please replace YOUR_ACCESS_KEY_HERE with your Web3Forms key in index.html.", 
                    "error"
                );
                return;
            }

            // Show loading spinner
            const submitText = btnSubmitForm.querySelector(".submit-text");
            const submitSpinner = btnSubmitForm.querySelector(".submit-spinner");
            
            submitText.classList.add("hidden");
            submitSpinner.classList.remove("hidden");
            btnSubmitForm.disabled = true;
            
            const formData = new FormData(hesContactForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: json
            })
            .then(async (response) => {
                let resJson = await response.json();
                if (response.status === 200) {
                    // Switch forms
                    hesContactForm.classList.add("hidden");
                    formSuccessScreen.classList.remove("hidden");
                    
                    // Reset form
                    hesContactForm.reset();
                    
                    // Scroll form container into view nicely
                    document.getElementById("contactFormContainer").scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    showToast("Enquiry Sent", "We received your message and will respond within 24 hours.", "success");
                } else {
                    console.error("Submission failed: ", resJson);
                    showToast("Submission Failed", resJson.message || "Failed to submit enquiry.", "error");
                }
            })
            .catch(error => {
                console.error("Network error: ", error);
                showToast("Connection Error", "A network error occurred. Please check your internet connection.", "error");
            })
            .finally(() => {
                // Reset submit button state
                submitText.classList.remove("hidden");
                submitSpinner.classList.add("hidden");
                btnSubmitForm.disabled = false;
            });
        });
    }
    
    // Reset Form button
    if (btnResetForm) {
        btnResetForm.addEventListener("click", () => {
            hesContactForm.reset();
            formSuccessScreen.classList.add("hidden");
            hesContactForm.classList.remove("hidden");
        });
    }
});
