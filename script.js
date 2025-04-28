document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const languageToggle = document.getElementById('languageToggle');
    const languageLabels = document.querySelectorAll('.language-toggle span');
    const topicBtns = document.querySelectorAll('.tab-btn');
    const disclaimerPopup = document.getElementById('disclaimer-popup');
    const showDisclaimerBtn = document.getElementById('show-disclaimer');
    const closeDisclaimerBtn = document.getElementById('close-disclaimer');
    const buttonTexts = document.querySelectorAll('.btn-text');
    const disclaimerEn = document.getElementById('disclaimer-en');
    const disclaimerNp = document.getElementById('disclaimer-np');
    
    // Current states
    let currentLanguage = 'en';
    let currentTopic = 'pros';
    
    // Initialize page
    updateContent();
    
    // Always show disclaimer on page load
    if (disclaimerPopup) {
        // Show disclaimer immediately
        showDisclaimer();
    }
    
    // Disclaimer Popup Control
    if (showDisclaimerBtn) {
        showDisclaimerBtn.addEventListener('click', showDisclaimer);
    }
    
    if (closeDisclaimerBtn) {
        closeDisclaimerBtn.addEventListener('click', function() {
            hideDisclaimer();
        });
    }
    
    function showDisclaimer() {
        if (disclaimerPopup) {
            disclaimerPopup.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    }
    
    function hideDisclaimer() {
        if (disclaimerPopup) {
            disclaimerPopup.classList.remove('active');
            document.body.style.overflow = ''; // Enable scrolling
        }
    }
    
    // Close popup when clicking outside content
    if (disclaimerPopup) {
        disclaimerPopup.addEventListener('click', function(e) {
            if (e.target === disclaimerPopup) {
                hideDisclaimer();
            }
        });
    }
    
    // Update disclaimer language based on currentLanguage
    function updateDisclaimerLanguage() {
        if (disclaimerEn && disclaimerNp) {
            if (currentLanguage === 'en') {
                disclaimerEn.style.display = 'block';
                disclaimerNp.style.display = 'none';
            } else {
                disclaimerEn.style.display = 'none';
                disclaimerNp.style.display = 'block';
            }
        }
    }
    
    // Language toggle event listener
    if (languageToggle) {
        languageToggle.addEventListener('change', function() {
            currentLanguage = this.checked ? 'np' : 'en';
            
            // Update active language indicator
            languageLabels.forEach(label => {
                if (label.dataset.lang === currentLanguage) {
                    label.classList.add('active');
                } else {
                    label.classList.remove('active');
                }
            });
            
            // Update button text language
            buttonTexts.forEach(text => {
                if (text.dataset[currentLanguage]) {
                    text.textContent = text.dataset[currentLanguage];
                }
            });
            
            // Update disclaimer language
            updateDisclaimerLanguage();
            
            updateContent();
        });
    }
    
    // Topic toggle event listeners
    topicBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            currentTopic = this.dataset.topic;
            
            // Update active button
            topicBtns.forEach(b => {
                if (b === this) {
                    b.classList.add('active');
                } else {
                    b.classList.remove('active');
                }
            });
            
            updateContent();
        });
    });
    
    // Function to update visible content based on current language and topic
    function updateContent() {
        // Hide all content sections
        const allSections = document.querySelectorAll('.blog-content');
        allSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show the current section
        const activeSection = document.getElementById(`${currentTopic}-${currentLanguage}`);
        if (activeSection) {
            activeSection.classList.add('active');
        }
    }
    
    // Initialize disclaimer language on first load
    updateDisclaimerLanguage();
}); 