// Premium Preloader with Loading Steps
const PreloaderManager = (() => {
  const steps = [
    { label: 'Initializing Universe...', duration: 800 },
    { label: 'Loading Assets...', duration: 1200 },
    { label: 'Connecting Server...', duration: 1000 },
    { label: 'Ready!', duration: 600 }
  ];

  let currentStep = 0;

  const init = () => {
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('progress-bar');
    const stepText = document.getElementById('step-text');
    const percentText = document.getElementById('percent-text');

    if (!preloader) return;

    let progress = 0;
    const targetProgress = 90;

    // Smooth progress bar simulation
    const progressInterval = setInterval(() => {
      if (progress < targetProgress) {
        progress += Math.random() * 15;
        if (progress > targetProgress) progress = targetProgress;
      }
      updateUI(progress, progressBar, percentText);
    }, 200);

    // Execute loading steps
    let delay = 0;
    steps.forEach((step, index) => {
      setTimeout(() => {
        currentStep = index;
        if (stepText) stepText.textContent = step.label;
        
        // Add checkmark to completed steps
        const stepElements = document.querySelectorAll('[data-step]');
        stepElements.forEach((el, i) => {
          if (i <= index) {
            el.classList.add('completed');
            el.querySelector('.step-icon').textContent = '✔';
          }
        });
      }, delay);
      delay += step.duration;
    });

    // Complete loading after all steps
    setTimeout(() => {
      progress = 100;
      updateUI(progress, progressBar, percentText);
      
      if (stepText) stepText.textContent = 'Welcome to MONLD Network';
      
      setTimeout(() => {
        clearInterval(progressInterval);
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }, 1000);
    }, delay);
  };

  const updateUI = (progress, progressBar, percentText) => {
    if (progressBar) {
      progressBar.style.width = progress + '%';
    }
    if (percentText) {
      percentText.textContent = Math.floor(progress) + '%';
    }
  };

  return { init };
})();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  PreloaderManager.init();
});
