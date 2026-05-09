// Interactive Utils - Copy IP, Toast, Particles
const InteractiveUtils = (() => {
  const SERVER_IP = 'play.monld.xyz';

  const copyIPToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(SERVER_IP);
      showToast('✓ IP copied: ' + SERVER_IP, 'success');
      createParticleBurst(event?.clientX || window.innerWidth / 2, event?.clientY || window.innerHeight / 2);
    } catch (err) {
      showToast('Failed to copy IP', 'error');
    }
  };

  const showToast = (message, type = 'info', duration = 3000) => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  };

  const createParticleBurst = (x, y, count = 12) => {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'burst-particle';
      
      const angle = (i / count) * Math.PI * 2;
      const velocity = 4 + Math.random() * 2;
      
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.setProperty('--vx', Math.cos(angle) * velocity);
      particle.style.setProperty('--vy', Math.sin(angle) * velocity);
      
      container.appendChild(particle);
    }
    
    document.body.appendChild(container);
    
    // Cleanup after animation
    setTimeout(() => container.remove(), 1000);
  };

  const playClickSound = () => {
    // Optional: Add sound effect (can be replaced with actual audio file)
    // const audio = new Audio('assets/click.mp3');
    // audio.play();
  };

  const init = () => {
    // Attach copy IP button
    const copyIPButtons = document.querySelectorAll('[data-copy-ip]');
    copyIPButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        copyIPToClipboard();
        playClickSound();
      });
    });

    // Attach hover sound to interactive elements
    document.querySelectorAll('a, button, .card-hover').forEach(el => {
      el.addEventListener('click', playClickSound);
    });
  };

  return { 
    init, 
    copyIPToClipboard, 
    showToast, 
    createParticleBurst,
    playClickSound
  };
})();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  InteractiveUtils.init();
});
