document.addEventListener('DOMContentLoaded', () => {

    // --- PRELOADER SEQUENCE ---
    const preloaderText = document.getElementById('preloader-text');
    const reactorInterface = document.getElementById('reactor-interface');
    const messages = [
        'Initializing A.H.E.U....\n',
        'Calibrating Gnaw-Sensors...\n',
        'Loading AI Protocols...\n',
        'Power levels stable.\n\n',
        'Welcome, Operator.'
    ];
    let messageIndex = 0;
    let charIndex = 0;

    function typeMessage() {
        if (messageIndex < messages.length) {
            if (charIndex < messages[messageIndex].length) {
                preloaderText.innerHTML += messages[messageIndex].charAt(charIndex);
                charIndex++;
                setTimeout(typeMessage, 50);
            } else {
                messageIndex++;
                charIndex = 0;
                setTimeout(typeMessage, 300);
            }
        } else {
            setTimeout(() => {
                const preloader = document.getElementById('preloader');
                preloader.style.opacity = '0';
                preloader.style.transition = 'opacity 0.5s';
                preloader.addEventListener('transitionend', () => preloader.remove());
                reactorInterface.classList.remove('hidden');
                reactorInterface.style.opacity = '1';
                reactorInterface.style.transition = 'opacity 0.5s';
            }, 1000);
        }
    }

    typeMessage();

    // --- CUSTOM CURSOR ---
    const cursor = document.querySelector('.custom-cursor');
    document.addEventListener('mousemove', e => {
        cursor.setAttribute("style", "top: "+(e.pageY)+"px; left: "+(e.pageX)+"px;")
    });
    
    document.addEventListener('click', () => {
        cursor.classList.add("expand");
        setTimeout(() => {
            cursor.classList.remove("expand");
        }, 500)
    });


    // --- SINGLE-PAGE NAVIGATION ---
    const navButtons = document.querySelectorAll('.nav-button');
    const contentSections = document.querySelectorAll('.content-section');

    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            const targetSectionId = button.getAttribute('data-section');
            const targetSection = document.getElementById(targetSectionId);

            // Update button active state
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Show target section and hide others
            contentSections.forEach(section => {
                if (section.id === targetSectionId) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
        });
    });

    // --- CONTAINMENT MODE (LIGHT/DARK TOGGLE) ---
    const containmentSwitch = document.getElementById('containment-switch');
    containmentSwitch.addEventListener('change', () => {
        document.body.classList.toggle('light-mode');
    });

    // --- CONTACT FORM SUBMISSION ---
    const contactForm = document.getElementById('contact-form');
    const formConfirmation = document.getElementById('form-confirmation');
    const transmitButton = document.getElementById('transmit-button');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        contactForm.classList.add('hidden');
        formConfirmation.classList.remove('hidden');
    });

});