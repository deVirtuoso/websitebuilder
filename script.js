// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Update file upload text
const fileInput = document.getElementById('document');
const fileNameDisplay = document.getElementById('file-name');

if (fileInput) {
    fileInput.addEventListener('change', function(e) {
        if (this.files && this.files.length > 0) {
            fileNameDisplay.textContent = this.files[0].name;
            fileNameDisplay.style.color = 'var(--accent-2)';
        } else {
            fileNameDisplay.textContent = 'Drag & drop a file here, or click to browse';
            fileNameDisplay.style.color = 'inherit';
        }
    });
}

// Update pricing based on package selection
const packageSelect = document.getElementById('package');
const totalPriceDisplay = document.getElementById('total-price');
const prices = {
    'core': '$999.00',
    'pro': '$2,999.00',
    'revamp': '$599.00'
};

if (packageSelect) {
    packageSelect.addEventListener('change', function(e) {
        if (totalPriceDisplay) {
            totalPriceDisplay.textContent = prices[this.value];
            // Brief animation effect
            totalPriceDisplay.style.transform = 'scale(1.1)';
            totalPriceDisplay.style.color = 'var(--accent-2)';
            setTimeout(() => {
                totalPriceDisplay.style.transform = 'scale(1)';
                totalPriceDisplay.style.color = 'white';
            }, 300);
        }
    });
}

// Function to handle package selection from pricing table
function selectPackage(packageId) {
    if (packageSelect) {
        packageSelect.value = packageId;
        // Trigger the change event to update the price
        const event = new Event('change');
        packageSelect.dispatchEvent(event);
    }
}

// Form Submission Simulation
const submissionForm = document.getElementById('submission-form');
if (submissionForm) {
    submissionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const packageType = packageSelect.value;
        const price = prices[packageType];
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Simulating processing
        submitBtn.textContent = 'Processing Payment...';
        submitBtn.style.opacity = '0.7';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert(`Success! Thank you, ${name}. Your payment of ${price} has been processed and your project details have been submitted. We will contact you at ${email} shortly.`);
            submitBtn.textContent = originalText;
            submitBtn.style.opacity = '1';
            submitBtn.disabled = false;
            submissionForm.reset();
            fileNameDisplay.textContent = 'Drag & drop a file here, or click to browse';
            fileNameDisplay.style.color = 'inherit';
            
            // Reset price display
            const event = new Event('change');
            packageSelect.dispatchEvent(event);
        }, 2000);
    });
}

// Add simple scroll animation for elements
const animateOnScroll = () => {
    const cards = document.querySelectorAll('.feature-card, .price-card, .portfolio-item');
    
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight * 0.9) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
};

// Initial setup for scroll animations
document.querySelectorAll('.feature-card, .price-card, .portfolio-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
});

window.addEventListener('scroll', animateOnScroll);
// Trigger once on load
setTimeout(animateOnScroll, 100);
