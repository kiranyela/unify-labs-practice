document.addEventListener('DOMContentLoaded', () => {
    // Modal Functionality
    const modalOverlay = document.getElementById('modal-overlay');
    const notifyBtn = document.getElementById('notify-btn');
    const closeModal = document.getElementById('close-modal');

    notifyBtn.addEventListener('click', () => {
        modalOverlay.classList.add('active');
    });

    closeModal.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });

    // Particle System
    const particlesContainer = document.getElementById('particles-container');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random positioning
        const x = Math.random() * 100; // vw
        const delay = Math.random() * 10; // s
        const duration = 10 + Math.random() * 10; // s
        const size = Math.random() * 5 + 2; // px

        particle.style.left = `${x}vw`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDelay = `-${delay}s`; // Negative delay to start immediately at different points
        particle.style.animationDuration = `${duration}s`;
        
        // Random color variation (optional)
        // particle.style.background = ...

        particlesContainer.appendChild(particle);
    }
});
