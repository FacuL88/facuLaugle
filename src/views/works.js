import { arrayObj } from "./provider";
import img_site from '../assets/icons/www.png'

export function renderWorks() {
  const section = document.createElement('section');
  section.classList.add('section');

  const container = document.createElement('div');
  container.id = 'works';

  const row = document.createElement('div');
  row.classList.add('row');

  const colTitulo = document.createElement('div');
  colTitulo.classList.add('col', 'col__titulo');
  colTitulo.innerHTML = `
    <h1 class="titulo__page">
      <span>i'm</span>(works)
    </h1>
  `;

  const colWorks = document.createElement('div');
  colWorks.classList.add('col', 'col__works');

  // === Slider Container for Mobile/Tablet ===
  const sliderContainer = document.createElement('div');
  sliderContainer.classList.add('slider-container');
  
  const sliderWrapper = document.createElement('div');
  sliderWrapper.classList.add('slider-wrapper');
  
  // Navigation buttons
  const prevBtn = document.createElement('button');
  prevBtn.classList.add('slider-nav', 'slider-prev');
  prevBtn.innerHTML = '&#10094;';
  
  const nextBtn = document.createElement('button');
  nextBtn.classList.add('slider-nav', 'slider-next');
  nextBtn.innerHTML = '&#10095;';
  
  // === Innovative 3D Grid for Desktop ===
  const projectsGrid = document.createElement('div');
  projectsGrid.classList.add('projects-grid-3d');

  // === Slider Track for Mobile/Tablet ===
  const sliderTrack = document.createElement('div');
  sliderTrack.classList.add('slider-track');

  // Render all projects with holographic effects
  arrayObj.forEach((project, index) => {
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card-3d');
    projectCard.style.animationDelay = `${index * 0.2}s`;
    
    const linkTarget = project.link !== "#" ? "_blank" : "_self";
    const linkHref = project.link !== "#" ? project.link : "javascript:void(0)";
    
    projectCard.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <div class="card-glow"></div>
          <img src="${project.img}" alt="${project.name}" class="project-image-3d" />
          <div class="project-overlay">
            <h3 class="project-title-3d">${project.name}</h3>
            <div class="project-tech">${project.desc}</div>
          </div>
        </div>
        <div class="card-back">
          <div class="back-content">
            <h3 class="back-title">${project.name}</h3>
            <p class="back-description">${project.desc}</p>
            <div class="back-stats">
              <div class="stat">
                <span class="stat-value">${Math.floor(Math.random() * 50) + 10}</span>
                <span class="stat-label">commits</span>
              </div>
              <div class="stat">
                <span class="stat-value">${Math.floor(Math.random() * 20) + 5}</span>
                <span class="stat-label">stars</span>
              </div>
            </div>
            <a href="${linkHref}" target="${linkTarget}" class="project-link-3d">
              <div class="link-content">
                <img src="${img_site}" class="link-icon" alt="Ver proyecto" />
                <span>Launch Project</span>
              </div>
              <div class="link-glow"></div>
            </a>
          </div>
        </div>
      </div>
    `;
    
    // Add 3D tilt effect (only for desktop)
    projectCard.addEventListener('mousemove', (e) => {
      if (window.innerWidth > 1024) {
        const rect = projectCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        projectCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      }
    });
    
    projectCard.addEventListener('mouseleave', () => {
      if (window.innerWidth > 1024) {
        projectCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      }
    });
    
    // Add to both grid and slider track
    projectsGrid.appendChild(projectCard);
    sliderTrack.appendChild(projectCard.cloneNode(true));
  });

  // Slider functionality
  let currentSlide = 0;
  const totalSlides = arrayObj.length;
  
  function updateSlider() {
    let slideWidth;
    const screenWidth = window.innerWidth;
    
    if (screenWidth <= 320) {
      slideWidth = screenWidth * 0.95;
    } else if (screenWidth <= 375) {
      slideWidth = screenWidth * 0.92;
    } else if (screenWidth <= 425) {
      slideWidth = screenWidth * 0.90;
    } else if (screenWidth <= 770) {
      slideWidth = screenWidth * 0.85;
    } else if (screenWidth <= 1024) {
      slideWidth = 400;
    } else {
      slideWidth = 0;
    }
    
    // Add margin for the gap between slides
    const gap = screenWidth <= 425 ? 0.3 : screenWidth <= 770 ? 0.5 : 1;
    const totalSlideWidth = slideWidth + gap;
    
    sliderTrack.style.transform = `translateX(-${currentSlide * totalSlideWidth}px)`;
    
    // Update navigation buttons
    prevBtn.style.display = currentSlide === 0 ? 'none' : 'flex';
    nextBtn.style.display = currentSlide >= totalSlides - 1 ? 'none' : 'flex';
  }
  
  prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlider();
    }
  });
  
  nextBtn.addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      updateSlider();
    }
  });
  
  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  
  sliderTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  sliderTrack.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && currentSlide < totalSlides - 1) {
        currentSlide++;
      } else if (diff < 0 && currentSlide > 0) {
        currentSlide--;
      }
      updateSlider();
    }
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
    updateSlider();
    
    // Show/hide slider based on screen size
    if (window.innerWidth <= 1024) {
      sliderContainer.style.display = 'block';
      projectsGrid.style.display = 'none';
    } else {
      sliderContainer.style.display = 'none';
      projectsGrid.style.display = 'grid';
    }
  });
  
  // Initial setup
  updateSlider();
  if (window.innerWidth <= 1024) {
    sliderContainer.style.display = 'block';
    projectsGrid.style.display = 'none';
  } else {
    sliderContainer.style.display = 'none';
    projectsGrid.style.display = 'grid';
  }
  
  // Assemble slider
  sliderWrapper.appendChild(sliderTrack);
  sliderContainer.appendChild(prevBtn);
  sliderContainer.appendChild(sliderWrapper);
  sliderContainer.appendChild(nextBtn);

  // Add floating particles effect
  const particlesContainer = document.createElement('div');
  particlesContainer.classList.add('particles-container');
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
    particlesContainer.appendChild(particle);
  }

  // Ensamblar estructura
  colWorks.appendChild(particlesContainer);
  colWorks.appendChild(projectsGrid);
  colWorks.appendChild(sliderContainer);
  row.appendChild(colTitulo);
  row.appendChild(colWorks);
  container.appendChild(row);
  section.appendChild(container);

  return section;
}
