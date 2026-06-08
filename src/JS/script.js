
(function() {
    // Configuration
    const SCROLL_SPEED = 0.6; // pixels per frame
    let direction = -1; // -1 = moving left, 1 = moving right
    let currentPosition = 0;
    let animationId = null;
    let maxScroll = 0;
    let minScroll = 0;
    
    const scrollNavWrapper = document.querySelector('.scroll-nav-wrapper');
    const scrollNav = document.querySelector('.scroll-nav');
    
    if (!scrollNavWrapper || !scrollNav) return;
    
    // Get the scroll boundaries
    function updateBoundaries() {
        // Temporarily remove transform to get real dimensions
        const currentTransform = scrollNav.style.transform;
        scrollNav.style.transform = 'none';
        
        const containerWidth = scrollNavWrapper.clientWidth;
        const contentWidth = scrollNav.scrollWidth;
        
        // Max scroll is the amount we can scroll left before content ends
        maxScroll = Math.max(0, contentWidth - containerWidth);
        minScroll = 0;
        
        // Restore transform
        scrollNav.style.transform = currentTransform;
        
        return { maxScroll, minScroll };
    }
    
    // Initialize boundaries
    let boundaries = updateBoundaries();
    maxScroll = boundaries.maxScroll;
    minScroll = boundaries.minScroll;
    
    // Update position with boundary checking
    function updatePosition() {
        currentPosition += SCROLL_SPEED * direction;
        
        // Check boundaries and reverse direction if needed
        if (currentPosition <= minScroll) {
            currentPosition = minScroll;
            direction = -1; // Start moving left (towards end)
        } else if (currentPosition >= maxScroll) {
            currentPosition = maxScroll;
            direction = 1; // Start moving right (back to start)
        }
        
        // Apply transform
        scrollNav.style.transform = `translateX(-${currentPosition}px)`;
    }
    
    // Animation loop
    function animate() {
        updatePosition();
        animationId = requestAnimationFrame(animate);
    }
    
    // Start animation
    function startAnimation() {
        if (animationId) cancelAnimationFrame(animationId);
        animate();
    }
    
    // Stop animation
    function stopAnimation() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }
    
    // Pause on hover
    scrollNavWrapper.addEventListener('mouseenter', stopAnimation);
    scrollNavWrapper.addEventListener('mouseleave', startAnimation);
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const wasAnimating = animationId !== null;
            stopAnimation();
            
            // Recalculate boundaries
            boundaries = updateBoundaries();
            maxScroll = boundaries.maxScroll;
            minScroll = boundaries.minScroll;
            
            // Clamp current position to new boundaries
            currentPosition = Math.min(Math.max(currentPosition, minScroll), maxScroll);
            scrollNav.style.transform = `translateX(-${currentPosition}px)`;
            
            if (wasAnimating) startAnimation();
        }, 250);
    });
    
    // Adjust speed for mobile
    if (window.innerWidth < 768) {
        SCROLL_SPEED = 0.4;
    }
    
    // Start the back-and-forth animation
    startAnimation();
    
    console.log('Back-and-forth navigation scroll initialized');
})();

(function() {
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', function() {
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
          mobileMenu.classList.remove('hidden');
          mobileMenu.classList.add('flex');
        } else {
          mobileMenu.classList.add('hidden');
          mobileMenu.classList.remove('flex');
        }
      });
    }
  })();
  window.addEventListener('load', function() {
      const preloader = document.getElementById('preloader');
      if (preloader) {
        // add fade-out class to trigger transition
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 700);
      }
    });

    // Mobile menu toggle (preserving original logic)
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }



