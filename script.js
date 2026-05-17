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

// Package pricing — one-time projects and annual support (12-month minimum)
const packages = {
    core: {
        name: 'The Core Frame',
        type: 'one-time',
        total: 999
    },
    pro: {
        name: 'Full Stack Setup',
        type: 'one-time',
        total: 2999
    },
    revamp: {
        name: 'Site Revamp & Edits',
        type: 'one-time',
        total: 599
    },
    support: {
        name: 'Website Support & Edits',
        type: 'subscription',
        monthly: 99,
        termMonths: 12,
        total: 1188 // 12 × $99, charged upfront at checkout
    }
};

function formatCurrency(amount) {
    return '$' + amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function getCheckoutTotal(packageId) {
    return packages[packageId].total;
}

// Update pricing based on package selection
const packageSelect = document.getElementById('package');
const totalPriceDisplay = document.getElementById('total-price');
const paymentPlanSummary = document.getElementById('payment-plan-summary');
const paymentBillingNote = document.getElementById('payment-billing-note');
const paymentTotalLabel = document.getElementById('payment-total-label');

function updatePaymentDisplay(packageId) {
    const pkg = packages[packageId];
    if (!pkg || !totalPriceDisplay) return;

    const totalFormatted = formatCurrency(pkg.total);
    totalPriceDisplay.textContent = totalFormatted;

    if (pkg.type === 'subscription') {
        if (paymentPlanSummary) {
            paymentPlanSummary.hidden = false;
            paymentPlanSummary.textContent =
                `${pkg.name} — ${formatCurrency(pkg.monthly)}/month`;
        }
        if (paymentTotalLabel) {
            paymentTotalLabel.textContent = 'Total due today (12 months):';
        }
        if (paymentBillingNote) {
            paymentBillingNote.hidden = false;
            paymentBillingNote.textContent =
                `${pkg.termMonths}-month minimum commitment. ` +
                `${formatCurrency(pkg.monthly)}/mo × ${pkg.termMonths} months = ` +
                `${totalFormatted} charged in full at checkout.`;
        }
    } else {
        if (paymentPlanSummary) paymentPlanSummary.hidden = true;
        if (paymentTotalLabel) paymentTotalLabel.textContent = 'Total due today:';
        if (paymentBillingNote) paymentBillingNote.hidden = true;
    }

    // Brief animation effect
    totalPriceDisplay.style.transform = 'scale(1.1)';
    totalPriceDisplay.style.color = 'var(--accent-2)';
    setTimeout(() => {
        totalPriceDisplay.style.transform = 'scale(1)';
        totalPriceDisplay.style.color = 'white';
    }, 300);
}

if (packageSelect) {
    packageSelect.addEventListener('change', function() {
        updatePaymentDisplay(this.value);
    });
    updatePaymentDisplay(packageSelect.value);
}

// Function to handle package selection from pricing table
function selectPackage(packageId) {
    if (packageSelect) {
        packageSelect.value = packageId;
        updatePaymentDisplay(packageId);
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
        const pkg = packages[packageType];
        const price = formatCurrency(pkg.total);
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Processing Payment...';
        submitBtn.style.opacity = '0.7';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            let message;
            if (pkg.type === 'subscription') {
                message =
                    `Success! Thank you, ${name}. Your ${pkg.name} plan ` +
                    `(${formatCurrency(pkg.monthly)}/mo, ${pkg.termMonths}-month minimum) ` +
                    `has been submitted. ${price} will be charged at checkout. ` +
                    `We will contact you at ${email} shortly.`;
            } else {
                message =
                    `Success! Thank you, ${name}. Your payment of ${price} has been processed ` +
                    `and your project details have been submitted. We will contact you at ${email} shortly.`;
            }

            alert(message);
            submitBtn.textContent = originalText;
            submitBtn.style.opacity = '1';
            submitBtn.disabled = false;
            submissionForm.reset();
            fileNameDisplay.textContent = 'Drag & drop a file here, or click to browse';
            fileNameDisplay.style.color = 'inherit';
            
            updatePaymentDisplay(packageSelect.value);
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

document.querySelectorAll('.feature-card, .price-card, .portfolio-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
});

window.addEventListener('scroll', animateOnScroll);
setTimeout(animateOnScroll, 100);
