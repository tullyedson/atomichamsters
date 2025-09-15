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



    // --- CONTACT FORM SUBMISSION ---
    const contactForm = document.getElementById('contact-form');
    const formConfirmation = document.getElementById('form-confirmation');
    const transmitButton = document.getElementById('transmit-button');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        contactForm.classList.add('hidden');
        formConfirmation.classList.remove('hidden');
    });


    // --- CANVAS PARTICLES (from test.html) ---
    (function(){
        const canvas = document.getElementById('particles');
        if(!canvas) return;
        const ctx = canvas.getContext('2d');
        const CTRL_WIDTH = 260; // sidebar width + padding for parallax region
        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;
        const config = { particleCount: Math.max(180, Math.floor((w*h)/18000)), maxSize: 12, speed: 0.25, color:{r:5,g:255,b:108} };
        let particles = [];
        function rand(min,max){ return Math.random()*(max-min)+min; }
        function init(){
            particles = [];
            for(let i=0;i<config.particleCount;i++){
                particles.push({ x: Math.random()*w, y: Math.random()*h, vx: rand(-config.speed,config.speed), vy: rand(-config.speed,config.speed), size: Math.random()*config.maxSize, alpha: Math.random()*0.5 + 0.1 });
            }
        }
        function draw(){
            ctx.clearRect(0,0,w,h);
            for(const p of particles){
                p.x += p.vx; p.y += p.vy;
                if(p.x < -30) p.x = w+30; if(p.x > w+30) p.x = -30; if(p.y < -30) p.y = h+30; if(p.y > h+30) p.y = -30;
                const baseFill = `rgba(${config.color.r},${config.color.g},${config.color.b},${p.alpha})`;
                if(p.x < CTRL_WIDTH){
                    ctx.save();
                    ctx.translate(-8,0); // subtle parallax under glass
                    ctx.filter = 'blur(4px)';
                    ctx.fillStyle = `rgba(${config.color.r},${config.color.g},${config.color.b},${p.alpha*0.5})`;
                    ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
                    ctx.restore();
                } else {
                    ctx.fillStyle = baseFill;
                    ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
                }
            }
            requestAnimationFrame(draw);
        }
        function onResize(){ w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; config.particleCount = Math.max(180, Math.floor((w*h)/18000)); init(); }
        window.addEventListener('resize', onResize);
        init();
        draw();
    })();

    // --- Animated percentages synced to bar widths ---
    (function(){
        const containers = document.querySelectorAll('.bar-container');
        if(!containers.length) return;
        function tick(){
            containers.forEach(c => {
                const bar = c.querySelector('.bar');
                const label = c.querySelector('.bar-percent');
                if(!bar || !label) return;
                const cw = c.clientWidth || 1;
                const bw = bar.getBoundingClientRect().width;
                const percent = Math.max(0, Math.min(100, Math.round((bw / cw) * 100)));
                label.textContent = percent + '%';
            });
            requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    })();

});