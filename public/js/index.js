// Import the necessary function for preloading images
import { preloadImages, getGrid } from './utils.js';

// Import Lenis for smooth scrolling

// Define a variable that will store the Lenis smooth scrolling object
let lenis;

// ✅ Smooth scrolling initialization
const initSmoothScrolling = () => {
  lenis = new Lenis({
    lerp: 0.1, // smoother scroll
    smoothWheel: true
  });

  lenis.on('scroll', () => ScrollTrigger.update());

  const scrollFn = (time) => {
    lenis.raf(time);
    requestAnimationFrame(scrollFn);
  };
  requestAnimationFrame(scrollFn);
};

// All elements with class .grid
const grids = document.querySelectorAll('.grid');

// ✅ Function to apply scroll-triggered animations
const applyAnimation = (grid, animationType) => {
  if (!grid) return;

  const gridWrap = grid.querySelector('.grid-wrap');
  const gridItems = grid.querySelectorAll('.grid__item');
  const gridItemsInner = [...gridItems].map(item => item.querySelector('.grid__item-inner'));

  // Stop if no gridWrap found
  if (!gridWrap || gridItems.length === 0) return;

  const timeline = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: gridWrap,
      start: 'top bottom+=5%',
      end: 'bottom top-=5%',
      scrub: true
    }
  });

  // ✅ Apply animation by type
  switch (animationType) {
    case 'type1':
      grid.style.setProperty('--perspective', '1000px');
      grid.style.setProperty('--grid-inner-scale', '0.5');
      timeline
        .set(gridWrap, { rotationY: 25 })
        .set(gridItems, { z: () => gsap.utils.random(-1600, 200) })
        .fromTo(gridItems, { xPercent: -500 }, { xPercent: 500 }, 0)
        .fromTo(gridItemsInner, { scale: 2 }, { scale: 0.5 }, 0);
      break;

    case 'type2':
      grid.style.setProperty('--grid-width', '160%');
      grid.style.setProperty('--perspective', '2000px');
      grid.style.setProperty('--grid-inner-scale', '0.5');
      timeline
        .set(gridWrap, { rotationX: 20 })
        .set(gridItems, { z: () => gsap.utils.random(-3000, -1000) })
        .fromTo(gridItems, { yPercent: 200 }, { yPercent: -200, rotationY: 45 }, 0)
        .fromTo(gridItemsInner, { scale: 2 }, { scale: 0.5 }, 0);
      break;

    case 'type3':
      grid.style.setProperty('--grid-width', '105%');
      grid.style.setProperty('--grid-columns', '8');
      grid.style.setProperty('--perspective', '1500px');
      grid.style.setProperty('--grid-inner-scale', '0.5');
      timeline
        .set(gridItems, {
          transformOrigin: '50% 0%',
          z: () => gsap.utils.random(-5000, -2000),
          rotationX: () => gsap.utils.random(-65, -25),
          filter: 'brightness(0%)'
        })
        .to(gridItems, {
          xPercent: () => gsap.utils.random(-150, 150),
          yPercent: () => gsap.utils.random(-300, 300),
          rotationX: 0,
          filter: 'brightness(200%)'
        }, 0)
        .to(gridWrap, { z: 6500 }, 0)
        .fromTo(gridItemsInner, { scale: 2 }, { scale: 0.5 }, 0);
      break;

    case 'type4':
      grid.style.setProperty('--grid-width', '50%');
      grid.style.setProperty('--perspective', '3000px');
      grid.style.setProperty('--grid-columns', '3');
      grid.style.setProperty('--grid-gap', '1vw');
      timeline
        .set(gridWrap, { rotationY: 30, xPercent: -75 })
        .to(gridItems, { z: 500, stagger: 0.04 }, 0)
        .to(gridItems, { z: 0, stagger: 0.04 }, 0.5)
        .fromTo(gridItems, { rotationX: -70 }, { rotationX: 70, stagger: 0.04 }, 0);
      break;

    default:
      // Default fallback (optional)
      timeline.set(gridWrap, { scale: 1, opacity: 1 });
      break;
  }
};

// Scroll paytida opacity ni hisoblash
window.addEventListener('scroll', () => {
  const grids = document.querySelectorAll('.grid--5');
  
  grids.forEach(grid => {
    const rect = grid.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Qancha ko‘rinyapti – 0 dan 1 gacha
    const visible = Math.min(Math.max(1 - rect.top / windowHeight, 0), 1);
    
    // Bu yerda 0 → 1 oralig‘ida opacity hosil qilamiz
    // Masalan, faqat sahifaning 60% qismi chiqqanda to‘liq bo‘lsin
    const opacity = visible < 1 ? visible / 1 : 1;

    // rgba orqali alpha ni qo‘llaymiz
    grid.style.backgroundColor = `rgba(25, 25, 23, ${opacity})`;
  });
});



// ✅ Main scroll setup
const scroll = () => {
  grids.forEach((grid, i) => {
    let animationType;

    // ❗Now it really works — type3 applies to every 3rd grid (3, 6, 9, …)
    switch (i % 3) {
      case 0:
        animationType = 'type3';
        break;
				case 1:
        animationType = 'type4';
        break;
    }

    applyAnimation(grid, animationType);
  });
};

// ✅ Preload images and start all
preloadImages('.grid__item-inner').then(() => {
  initSmoothScrolling();
  scroll();
  document.body.classList.remove('loading');
});
