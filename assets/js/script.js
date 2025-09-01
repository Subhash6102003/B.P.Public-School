// B.P. Public School Website Scripts

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fix navigation links and close mobile menu when clicking a nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                // Only prevent default for hash links (like #about)
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(href);
                    if (targetSection) {
                        window.scrollTo({
                            top: targetSection.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }
                
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Gallery and Lightbox functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-content img');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    if (galleryItems.length && lightbox && lightboxImg) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').getAttribute('src');
                lightboxImg.setAttribute('src', imgSrc);
                lightbox.classList.add('active');
            });
        });
        
        if (lightboxClose) {
            lightboxClose.addEventListener('click', () => {
                lightbox.classList.remove('active');
            });
        }
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }

    // Authentication Tabs
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');

    if (authTabs.length && authForms.length) {
        authTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.getAttribute('data-target');
                
                // Remove active class from all tabs and hide all forms
                authTabs.forEach(t => t.classList.remove('active'));
                authForms.forEach(form => form.style.display = 'none');
                
                // Add active class to clicked tab and show the corresponding form
                tab.classList.add('active');
                document.getElementById(target).style.display = 'block';
            });
        });
    }

    // Dashboard sidebar toggle for mobile
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    if (sidebarToggle && sidebar && mainContent) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
        });
    }

    // Initialize GSAP animations
    initGSAPAnimations();
});

function initGSAPAnimations() {
    // Check if GSAP is loaded
    if (typeof gsap !== 'undefined') {
        // Header animation
        gsap.from('.header', {
            duration: 1,
            y: -100,
            opacity: 0,
            ease: 'power3.out'
        });

        // Hero section animations
        gsap.from('.hero h1', {
            duration: 1.2,
            y: 50,
            opacity: 0,
            delay: 0.5,
            ease: 'power3.out'
        });

        gsap.from('.hero p', {
            duration: 1.2,
            y: 50,
            opacity: 0,
            delay: 0.7,
            ease: 'power3.out'
        });

        gsap.from('.hero .btn', {
            duration: 1,
            y: 50,
            opacity: 0,
            delay: 0.9,
            ease: 'power3.out'
        });

        gsap.from('.rating', {
            duration: 1,
            scale: 0.8,
            opacity: 0,
            delay: 1.1,
            ease: 'back.out(1.7)'
        });

        // About section cards animation (on scroll)
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.utils.toArray('.about-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.2
            });
        });

        // Facilities cards animation
        gsap.utils.toArray('.facility-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.15
            });
        });

        // Admission steps animation
        gsap.utils.toArray('.step-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%'
                },
                x: -50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.2
            });
        });
        
        // Contact section animation
        gsap.from('.contact-info', {
            scrollTrigger: {
                trigger: '.contact-info',
                start: 'top 80%'
            },
            x: -50,
            opacity: 0,
            duration: 1
        });

        gsap.from('.contact-form', {
            scrollTrigger: {
                trigger: '.contact-form',
                start: 'top 80%'
            },
            x: 50,
            opacity: 0,
            duration: 1
        });

        // Dashboard animations (if on dashboard page)
        if (document.querySelector('.dashboard')) {
            gsap.from('.dashboard-card', {
                opacity: 0,
                y: 20,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out'
            });
        }
    }
}

// Authentication functionality
function login(role) {
    const username = document.getElementById(`${role}-username`).value;
    const password = document.getElementById(`${role}-password`).value;
    
    // Simple validation
    if (!username || !password) {
        showAlert('Please fill in all fields', 'error');
        return;
    }

    // In a real application, you would send these credentials to a server for verification
    // For demo purposes, we'll use some dummy credentials
    
    let isAuthenticated = false;
    
    if (role === 'student') {
        // Demo student credentials
        if (username === 'student' && password === 'password') {
            isAuthenticated = true;
            // Redirect to student dashboard
            window.location.href = '/dashboard/student.html';
        }
    } else if (role === 'teacher') {
        // Demo teacher credentials
        if (username === 'teacher' && password === 'password') {
            isAuthenticated = true;
            // Redirect to teacher dashboard
            window.location.href = '/dashboard/teacher.html';
        }
    }
    
    if (!isAuthenticated) {
        showAlert('Invalid username or password', 'error');
    }
}

// Alert function
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const alertContainer = document.querySelector('.alert-container') || document.body;
    alertContainer.appendChild(alertDiv);
    
    // Remove the alert after 3 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Student Dashboard Functions
function downloadSyllabus(subject) {
    // In a real application, this would download a file
    showAlert(`Downloading syllabus for ${subject}...`, 'info');
}

function payFees() {
    // In a real application, this would redirect to a payment gateway
    showAlert('Redirecting to payment gateway...', 'info');
}

// Teacher Dashboard Functions
function markAttendance(classId) {
    const attendanceForm = document.getElementById(`attendance-form-${classId}`);
    if (attendanceForm) {
        const formData = new FormData(attendanceForm);
        // In a real application, this would send data to a server
        showAlert('Attendance marked successfully', 'success');
    }
}

function uploadDocument(type) {
    const fileInput = document.getElementById(`${type}-file`);
    if (fileInput && fileInput.files.length > 0) {
        // In a real application, this would upload the file to a server
        showAlert(`${type} uploaded successfully`, 'success');
    } else {
        showAlert('Please select a file to upload', 'error');
    }
}
