 const triggerId = "projects";
                const modalId = "levelCardsContainer";

            const trigger = document.getElementById(triggerId);
            const modal = document.getElementById(modalId);


            trigger.addEventListener('click', () => {
                modal.style.display = 'block';
            });

            //
            modal.addEventListener('mouseleave', () => {
                modal.style.display = 'none';
            });
             function hideScrollbar(selector) {
                    const style = document.createElement('style');
                    style.innerHTML = `
                        ${selector}::-webkit-scrollbar { display: none; }
                        ${selector} { 
                            -ms-overflow-style: none; 
                            scrollbar-width: none; 
                        }
                    `;
                    document.head.appendChild(style);
                }

          
                hideScrollbar('.scroll-nav-wrapper');



                //smart scroll
            const wrapper = document.getElementById("scrollNavWrapper");
            const track = document.getElementById("scrollNav");

            let position = 0;
            let direction = 1;
            const speed = 0.3;

            let isPaused = false;
            let isDragging = false;
            let startX = 0;
            let scrollStart = 0;

            const SNAP_THRESHOLD = 80; // distance to snap

            // --- AUTO MOVE ---
            function animate() {
              const maxScroll = track.scrollWidth - wrapper.clientWidth;

              if (!isPaused && !isDragging) {
                position += speed * direction;

                if (position >= maxScroll) direction = -1;
                if (position <= 0) direction = 1;

                track.style.transform = `translateX(${-position}px)`;
              }

              requestAnimationFrame(animate);
            }
            animate();

            // --- HOVER PAUSE ---
            wrapper.addEventListener("mouseenter", () => isPaused = true);
            wrapper.addEventListener("mouseleave", () => isPaused = false);

            // --- SNAP FUNCTION ---
            function snapPosition() {
              const maxScroll = track.scrollWidth - wrapper.clientWidth;

              // Snap to HOME (start)
              if (position < SNAP_THRESHOLD) {
                position = 0;
              }

              // Snap to END
              else if (position > maxScroll - SNAP_THRESHOLD) {
                position = maxScroll;
              }

              track.style.transition = "transform 0.4s ease";
              track.style.transform = `translateX(${-position}px)`;

              setTimeout(() => {
                track.style.transition = "none";
              }, 700);
            }

            // --- DRAG (MOUSE) ---
            wrapper.addEventListener("mousedown", (e) => {
              isDragging = true;
              wrapper.classList.add("cursor-grabbing");

              startX = e.pageX;
              scrollStart = position;
            });

            window.addEventListener("mouseup", () => {
              if (isDragging) snapPosition();
              isDragging = false;
              wrapper.classList.remove("cursor-grabbing");
            });

            window.addEventListener("mousemove", (e) => {
              if (!isDragging) return;

              const dx = e.pageX - startX;
              position = scrollStart - dx;

              const maxScroll = track.scrollWidth - wrapper.clientWidth;
              position = Math.max(0, Math.min(position, maxScroll));

              track.style.transform = `translateX(${-position}px)`;
            });

            // --- TOUCH ---
            wrapper.addEventListener("touchstart", (e) => {
              isDragging = true;
              startX = e.touches[0].pageX;
              scrollStart = position;
            });

            wrapper.addEventListener("touchend", () => {
              snapPosition();
              isDragging = false;
            });

            wrapper.addEventListener("touchmove", (e) => {
              if (!isDragging) return;

              const dx = e.touches[0].pageX - startX;
              position = scrollStart - dx;

              const maxScroll = track.scrollWidth - wrapper.clientWidth;
              position = Math.max(0, Math.min(position, maxScroll));

              track.style.transform = `translateX(${-position}px)`;
            });

            
          
            




            