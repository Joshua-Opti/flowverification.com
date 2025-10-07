// Enhanced Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }));
    
    // Geolocation functionality
    const getLocationBtn = document.getElementById('getLocationBtn');
    const distanceInput = document.getElementById('distance');
    const locationStatus = document.getElementById('locationStatus');
    
    // OPTI Engineering coordinates (Plot 43, Driefontein Rd, Johannesburg)
    const optiCoords = {
        lat: -25.993210342940483,
        lng: 27.82689358857203
    };
    
    if (getLocationBtn) {
        console.log('Geolocation button found, adding event listener');
        getLocationBtn.addEventListener('click', function() {
            console.log('Location button clicked');
            showLocationStatus('Getting your location...', 'loading');
            
            // Test if the button click is working
            console.log('Button click event fired successfully');
            
            if (navigator.geolocation) {
                console.log('Geolocation supported, requesting position');
                
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        console.log('Position received:', position);
                        const userLat = position.coords.latitude;
                        const userLng = position.coords.longitude;
                        
                        console.log('User coordinates:', userLat, userLng);
                        console.log('OPTI coordinates:', optiCoords.lat, optiCoords.lng);
                        
                        // Calculate distance using Haversine formula
                        const distance = calculateDistance(
                            optiCoords.lat, optiCoords.lng,
                            userLat, userLng
                        );
                        
                        console.log('Calculated distance:', distance);
                        
                        // Update the distance input
                        if (distanceInput) {
                            distanceInput.value = Math.round(distance);
                            console.log('Distance input updated with value:', Math.round(distance));
                        }
                        
                        showLocationStatus(
                            `Location found! Distance: ${Math.round(distance)} km`,
                            'success'
                        );
                        
                        // Hide status after 5 seconds
                        setTimeout(() => {
                            if (locationStatus) {
                                locationStatus.style.display = 'none';
                            }
                        }, 5000);
                    },
                    function(error) {
                        console.error('Geolocation error:', error);
                        let errorMessage = 'Unable to get your location. ';
                        
                        switch(error.code) {
                            case error.PERMISSION_DENIED:
                                errorMessage += 'Please allow location access and try again.';
                                break;
                            case error.POSITION_UNAVAILABLE:
                                errorMessage += 'Location information is unavailable.';
                                break;
                            case error.TIMEOUT:
                                errorMessage += 'Location request timed out.';
                                break;
                            default:
                                errorMessage += 'An unknown error occurred.';
                                break;
                        }
                        
                        showLocationStatus(errorMessage, 'error');
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 15000,
                        maximumAge: 300000 // 5 minutes
                    }
                );
            } else {
                console.log('Geolocation not supported');
                showLocationStatus('Geolocation is not supported by this browser.', 'error');
            }
        });
    } else {
        console.log('Location button not found');
    }
    
    function showLocationStatus(message, type) {
        if (locationStatus) {
            locationStatus.textContent = message;
            locationStatus.className = `location-status ${type}`;
            locationStatus.style.display = 'block';
        }
    }
    
    function calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371; // Earth's radius in kilometers
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }
    
    // Alternative: Calculate driving distance using Google Maps (if available)
    function calculateDrivingDistance(origin, destination) {
        return new Promise((resolve, reject) => {
            if (typeof google !== 'undefined' && google.maps) {
                const service = new google.maps.DistanceMatrixService();
                service.getDistanceMatrix({
                    origins: [origin],
                    destinations: [destination],
                    travelMode: google.maps.TravelMode.DRIVING,
                    unitSystem: google.maps.UnitSystem.METRIC,
                    avoidHighways: false,
                    avoidTolls: false
                }, (response, status) => {
                    if (status === 'OK') {
                        const distance = response.rows[0].elements[0].distance.value / 1000; // Convert to km
                        resolve(distance);
                    } else {
                        reject(new Error('Distance calculation failed'));
                    }
                });
            } else {
                reject(new Error('Google Maps not available'));
            }
        });
    }
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Quote Calculator - Moved inside DOM ready check

// Pricing structure
const pricingStructure = {
    'technical-system': { name: 'Detailed Technical System Audit' },
    'gas-flow': { name: 'Gas Flow Verification' },
    'liquid-flow': { name: 'Liquid Flow Verification' },
    'thickness': { name: 'Material Thickness Verification' },
    'energy-logging': { name: 'Energy Logging & Power Quality Analysis' }
};

const systemSizeMultipliers = {
    'small': 1.0,
    'medium': 1.5,
    'large': 2.0,
    'enterprise': 3.0
};

const durationMultipliers = {
    '1-hour': 1,
    '2-hours': 2,
    '3-hours': 3,
    '4-hours': 4,
    '5-hours': 5,
    '6-hours': 6,
    '7-hours': 7,
    '8-hours': 8,
    '9-hours': 9,
    '10-hours': 10,
    '11-hours': 11,
    '12-hours': 12,
    '13-hours': 13,
    '14-hours': 14,
    '15-hours': 15,
    '16-hours': 16,
    '17-hours': 17,
    '18-hours': 18,
    '19-hours': 19,
    '20-hours': 20,
    '21-hours': 21,
    '22-hours': 22,
    '23-hours': 23,
    '24-hours': 24,
    '1-day': 24,
    '2-days': 48,
    '3-days': 72,
    '4-days': 96,
    '5-days': 120,
    '6-days': 144,
    '7-days': 168,
    'more-than-week': 200
};

// Distance calculation (R4.74 per km)
const distanceRate = 4.74;

const urgencyMultipliers = {
    'standard': 0,
    'expedited': 0.2,
    'urgent': 0.5,
    'emergency': 0.5  // 50% surcharge for super urgent
};

// New pricing structure
const technicianRate = 1125; // R1125 per hour
const travelRate = 1125; // R1125 per hour of driving
const accommodationRate = 950; // R950 per night
const equipmentRental = 5000; // R5000 per day

const additionalServices = {
    'report': 0, // Calculated proportionally to duration
    'recommendations': 0, // Calculated proportionally to duration
    'followup': 300,
    'training': 400
};

// Add event listener for substance dropdown
document.getElementById('substance').addEventListener('change', function() {
    const checkboxes = document.getElementById('substanceCheckboxes');
    if (this.value === 'multiple') {
        checkboxes.style.display = 'block';
    } else {
        checkboxes.style.display = 'none';
        // Clear all checkboxes when single selection is made
        const checkboxesInputs = checkboxes.querySelectorAll('input[type="checkbox"]');
        checkboxesInputs.forEach(cb => cb.checked = false);
    }
});

// DOM Ready Check for Form Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Get form elements with null checks
    const quoteForm = document.getElementById('quoteForm');
    const contactForm = document.getElementById('contactForm');
    const quoteResults = document.getElementById('quoteResults');
    
    // Add quote form event listener if form exists
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    showLoading(this);
    
    // Simulate processing time for better UX
    setTimeout(() => {
        const formData = new FormData(quoteForm);
        const auditType = formData.get('auditType');
        const substanceSelect = document.getElementById('substance');
        const substanceCheckboxes = document.getElementById('substanceCheckboxes');
        
        let substances = [];
        if (substanceSelect.value === 'multiple') {
            // Get selected checkboxes
            const selectedCheckboxes = substanceCheckboxes.querySelectorAll('input[type="checkbox"]:checked');
            substances = Array.from(selectedCheckboxes).map(cb => cb.value);
        } else {
            // Get single selection
            substances = [substanceSelect.value];
        }
        
        // Convert single audit type to array for compatibility
        const auditTypes = [auditType];
        const measuringPoints = parseInt(formData.get('measuringPoints')) || 0;
        const duration = formData.get('duration');
        const distance = parseFloat(formData.get('distance')) || 0;
        const urgency = formData.get('urgency');
        const additionalServicesList = formData.getAll('additionalServices');
        
        console.log('Form data:', {
            auditTypes,
            substances,
            measuringPoints,
            duration,
            distance,
            urgency,
            additionalServicesList
        });
        
        if (auditTypes.length === 0 || substances.length === 0 || !measuringPoints || !duration || !distance || !urgency) {
            alert('Please fill in all required fields.');
            hideLoading(this);
            return;
        }
        
        // Calculate hours per measuring point
        const hoursPerPoint = durationMultipliers[duration];
        const totalAuditHours = measuringPoints * hoursPerPoint;
        
        // Calculate travel time (assuming 60km/h average speed)
        const travelTime = (distance * 2) / 60; // Round trip
        const travelCost = travelTime * travelRate + (distance * 2 * distanceRate);
        
        // Calculate accommodation (if multi-day)
        const totalDays = Math.ceil(totalAuditHours / 24);
        const accommodationCost = totalDays > 1 ? (totalDays - 1) * accommodationRate : 0;
        
        // Calculate technician cost
        const technicianCost = totalAuditHours * technicianRate;
        
        // Calculate equipment cost (daily rate)
        const equipmentCost = totalDays * equipmentRental;
        
        // Calculate base total
        let total = technicianCost + equipmentCost + travelCost + accommodationCost;
        
        // Apply urgency surcharge (50% for super urgent)
        if (urgency === 'emergency') {
            total += (total * 0.5);
        }
        
        // Add additional services
        let additionalCost = 0;
        additionalServicesList.forEach(service => {
            if (service === 'report' || service === 'recommendations') {
                // Proportional to duration (same time as audit)
                additionalCost += totalAuditHours * technicianRate;
            } else {
                additionalCost += additionalServices[service];
            }
        });
        
        total += additionalCost;
        
        // Update quote display
        document.getElementById('baseService').textContent = auditTypes.map(type => pricingStructure[type].name).join(', ');
        document.getElementById('systemSizeQuote').textContent = measuringPoints + ' measuring points';
        document.getElementById('durationQuote').textContent = hoursPerPoint + ' hours per point (' + totalAuditHours + ' total hours)';
        document.getElementById('locationQuote').textContent = distance + ' km';
        document.getElementById('urgencyQuote').textContent = urgency.charAt(0).toUpperCase() + urgency.slice(1);
        
        // Additional services display
        const additionalServicesText = additionalServicesList.length > 0 
            ? additionalServicesList.map(service => service.charAt(0).toUpperCase() + service.slice(1)).join(', ')
            : 'None';
        document.getElementById('additionalServicesQuote').textContent = additionalServicesText;
        
        // Format and display total
        document.getElementById('totalAmount').textContent = `R${total.toLocaleString()}`;
        
        // Show results
        if (quoteResults) {
            quoteResults.style.display = 'block';
            quoteResults.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.error('Quote results element not found');
        }
        
        // Hide loading state
        hideLoading(this);
    }, 1000);
        });
    }
    
    // Add contact form event listener if form exists
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // CRITICAL: Prevents page reload
            
            // Show loading state
            showLoading(this);
            
            // Simulate processing time for better UX
            setTimeout(() => {
                const formData = new FormData(contactForm);
                const firstName = formData.get('firstName');
                const lastName = formData.get('lastName');
                const email = formData.get('email');
                const phone = formData.get('phone');
                const company = formData.get('company');
                const message = formData.get('message');
                
                // Validate required fields
                if (!firstName || !lastName || !email || !message) {
                    alert('Please fill in all required fields (First Name, Last Name, Email, and Message).');
                    hideLoading(this);
                    return;
                }
                
                // Create email body
                const emailBody = `
New Contact Form Submission from FlowVerification.com

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || 'Not provided'}
Company: ${company || 'Not provided'}

Message:
${message}
                `;
                
                // Create mailto link
                const mailtoLink = `mailto:info@opti-eng.co.za?subject=New Contact Form Submission&body=${encodeURIComponent(emailBody)}`;
                
                // Open email client
                window.location.href = mailtoLink;
                
                // Hide loading state
                hideLoading(this);
                
                // Show success message
                alert('Thank you for your message! Your email client should open with a pre-filled message. Please send it to complete your inquiry.');
            }, 500);
        });
    }
}); // End DOM ready check

// Reset form function
function resetForm() {
    const quoteForm = document.getElementById('quoteForm');
    const quoteResults = document.getElementById('quoteResults');
    
    if (quoteForm) {
        quoteForm.reset();
    }
    if (quoteResults) {
        quoteResults.style.display = 'none';
        quoteResults.scrollIntoView({ behavior: 'smooth' });
    }
}

// Request detailed quote function
function requestDetailedQuote() {
    const quoteForm = document.getElementById('quoteForm');
    if (!quoteForm) return;
    
    const formData = new FormData(quoteForm);
    const auditTypes = Array.from(document.getElementById('auditType').selectedOptions).map(option => option.value);
    const substances = Array.from(document.getElementById('substance').selectedOptions).map(option => option.value);
    const measuringPoints = formData.get('measuringPoints');
    const duration = formData.get('duration');
    const distance = formData.get('distance');
    const urgency = formData.get('urgency');
    const additionalServicesList = formData.getAll('additionalServices');
    const comments = formData.get('comments');
    
    // Create email body
    const emailBody = `
New Quote Request from FlowVerification.com

Audit Types: ${auditTypes.map(type => pricingStructure[type].name).join(', ')}
Substances: ${substances.join(', ')}
Measuring Points: ${measuringPoints}
Duration per Point: ${duration}
Distance: ${distance} km
Urgency: ${urgency}
Additional Services: ${additionalServicesList.join(', ') || 'None'}
Comments: ${comments || 'None'}

Please contact the client to provide a detailed quote.
    `;
    
    // Create mailto link
    const mailtoLink = `mailto:info@opti-eng.co.za?subject=New Quote Request - ${auditTypes.map(type => pricingStructure[type].name).join(', ')}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
}

// Email quote function
function emailQuote() {
    const baseService = document.getElementById('baseService').textContent;
    const systemSize = document.getElementById('systemSizeQuote').textContent;
    const duration = document.getElementById('durationQuote').textContent;
    const location = document.getElementById('locationQuote').textContent;
    const urgency = document.getElementById('urgencyQuote').textContent;
    const additionalServices = document.getElementById('additionalServicesQuote').textContent;
    const totalAmount = document.getElementById('totalAmount').textContent;
    
    const emailBody = `
FlowVerification.com Quote Summary

Base Service: ${baseService}
System Size: ${systemSize}
Duration: ${duration}
Location: ${location}
Urgency: ${urgency}
Additional Services: ${additionalServices}

Estimated Total: ${totalAmount}

This is an automated quote. For detailed pricing and to proceed with your request, please contact us at info@opti-eng.co.za or call 066 135 0355.

Thank you for considering FlowVerification.com for your measurement needs.
    `;
    
    const mailtoLink = `mailto:?subject=FlowVerification Quote - ${baseService}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
}

// Print quote function
function printQuote() {
    const quoteCard = document.querySelector('.quote-card');
    if (quoteCard) {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>FlowVerification Quote</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .quote-header { text-align: center; margin-bottom: 30px; }
                        .quote-details { margin-bottom: 20px; }
                        .quote-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
                        .quote-total { background: #f8f9fa; padding: 15px; margin: 20px 0; border-radius: 5px; }
                        .total-line { font-size: 18px; font-weight: bold; }
                    </style>
                </head>
                <body>
                    <div class="quote-header">
                        <h1>FlowVerification.com</h1>
                        <h2>Quote Summary</h2>
                    </div>
                    ${quoteCard.innerHTML}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
}

// REMOVED DUPLICATE CONTACT FORM HANDLER - Now handled in DOM ready check above

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .equipment-card, .feature-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Initialize FAQ functionality
    initializeFAQ();
    
    // Alternative FAQ implementation
    setTimeout(() => {
        console.log('Alternative FAQ initialization...');
        const faqItems = document.querySelectorAll('.faq-item');
        console.log('Alternative - Found FAQ items:', faqItems.length);
        
        faqItems.forEach((item, index) => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.onclick = function() {
                    console.log('Alternative FAQ click:', index);
                    // Close all others
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    // Toggle current
                    item.classList.toggle('active');
                    console.log('Alternative - Active class:', item.classList.contains('active'));
                };
            }
        });
    }, 1000);
});

// FAQ Functionality
function initializeFAQ() {
    console.log('Initializing FAQ...');
    const faqItems = document.querySelectorAll('.faq-item');
    console.log('Found FAQ items:', faqItems.length);
    
    if (faqItems.length === 0) {
        console.error('No FAQ items found!');
        return;
    }
    
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        console.log(`FAQ item ${index}:`, {
            item: item,
            question: question,
            answer: answer
        });
        
        if (!question) {
            console.error(`FAQ item ${index} has no question element`);
            return;
        }
        
        if (!answer) {
            console.error(`FAQ item ${index} has no answer element`);
            return;
        }
        
        question.addEventListener('click', function(e) {
            console.log('FAQ clicked:', item);
            e.preventDefault();
            e.stopPropagation();
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            console.log('FAQ active class after toggle:', item.classList.contains('active'));
        });
    });
}

// Form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    return isValid;
}

// Add real-time validation
document.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.classList.add('error');
        } else {
            this.classList.remove('error');
        }
    });
    
    field.addEventListener('input', function() {
        if (this.classList.contains('error') && this.value.trim()) {
            this.classList.remove('error');
        }
    });
});

// Dynamic substance options based on audit type
document.addEventListener('DOMContentLoaded', function() {
    const auditTypeSelect = document.getElementById('auditType');
    const substanceSelect = document.getElementById('substance');
    
    if (!auditTypeSelect || !substanceSelect) {
        console.error('Audit type select or substance select not found');
        return;
    }

    const substanceOptions = {
        'technical-system': ['compressed-air', 'nitrogen', 'oxygen', 'helium', 'argon', 'co2', 'hydrogen', 'natural-gas', 'water', 'oil', 'chemicals', 'steel', 'aluminum', 'copper', 'other'],
        'gas-flow': ['compressed-air', 'nitrogen', 'oxygen', 'helium', 'argon', 'co2', 'hydrogen', 'natural-gas'],
        'liquid-flow': ['water', 'oil', 'chemicals', 'coolants', 'fuels', 'acids', 'solvents', 'wastewater'],
        'thickness': ['steel', 'aluminum', 'copper', 'brass', 'plastic', 'glass', 'ceramics', 'composites'],
        'energy-logging': ['electrical-systems', 'three-phase-power', 'single-phase-power', 'dc-systems', 'other'],
        'digital-twin': ['compressed-air', 'nitrogen', 'oxygen', 'water', 'steel', 'other'],
        'comprehensive': ['compressed-air', 'nitrogen', 'oxygen', 'water', 'steel', 'other']
    };

    auditTypeSelect.addEventListener('change', function() {
        const selectedType = this.value;
        console.log('Audit type changed to:', selectedType);
        const options = substanceOptions[selectedType] || [];
        console.log('Available substances:', options);
        
        // Clear existing options
        substanceSelect.innerHTML = '<option value="">Select substance</option>';
        
        // Add new options
        options.forEach(substance => {
            const option = document.createElement('option');
            option.value = substance;
            option.textContent = substance.charAt(0).toUpperCase() + substance.slice(1).replace(/-/g, ' ');
            substanceSelect.appendChild(option);
        });
        
        // Add "Other" option if not already present
        if (!options.includes('other')) {
            const otherOption = document.createElement('option');
            otherOption.value = 'other';
            otherOption.textContent = 'Other (specify in comments)';
            substanceSelect.appendChild(otherOption);
        }
        
        console.log('Substance dropdown updated with', substanceSelect.options.length, 'options');
    });
});

// Loading states for forms
function showLoading(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    form.classList.add('loading');
    
    // Reset after 3 seconds (in case of errors)
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        form.classList.remove('loading');
    }, 3000);
}

function hideLoading(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = false;
    form.classList.remove('loading');
}

// Enhanced form submission with loading states - REMOVED DUPLICATE LISTENERS


// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading states and performance optimizations
window.addEventListener('load', function() {
    // Add loaded class for animations
    document.body.classList.add('loaded');
    
    // Re-initialize FAQ in case of timing issues
    initializeFAQ();
    
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Add scroll-triggered animations

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .equipment-card, .testimonial-card, .faq-item');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        scrollObserver.observe(el);
    });
});

// Add CSS for scroll animations
const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .loaded .hero-badge,
    .loaded .trust-item {
        animation: fadeInUp 0.8s ease-out;
    }
`;
document.head.appendChild(style);

// Enhanced form validation and loading states
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        const formGroup = field.closest('.form-group');
        if (formGroup) {
            formGroup.classList.remove('error', 'success');
        }
        
        if (!field.value.trim()) {
            isValid = false;
            if (formGroup) {
                formGroup.classList.add('error');
            }
        } else {
            if (formGroup) {
                formGroup.classList.add('success');
            }
        }
    });
    
    // Email validation
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const formGroup = emailField.closest('.form-group');
        if (!emailRegex.test(emailField.value)) {
            isValid = false;
            if (formGroup) {
                formGroup.classList.add('error');
            }
        }
    }
    
    return isValid;
}

// REMOVED CONFLICTING CLICK LISTENERS - These were interfering with form submission

