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

  // === Grid for Desktop ===
  const projectsGrid = document.createElement('div');
  projectsGrid.classList.add('projects-grid-3d');

  // === Simple Slider for Mobile/Tablet ===
  const sliderContainer = document.createElement('div');
  sliderContainer.classList.add('slider-container');
  
  const sliderTrack = document.createElement('div');
  sliderTrack.classList.add('slider-track');
  
  // Navigation buttons
  const prevBtn = document.createElement('button');
  prevBtn.classList.add('slider-nav', 'slider-prev');
  prevBtn.innerHTML = '&#10094;';
  prevBtn.setAttribute('aria-label', 'Previous project');
  
  const nextBtn = document.createElement('button');
  nextBtn.classList.add('slider-nav', 'slider-next');
  nextBtn.innerHTML = '&#10095;';
  nextBtn.setAttribute('aria-label', 'Next project');

  // Create project cards
  let currentSlide = 0;
  
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
          <img src="${project.img}" alt="${project.name}" class="project-image-3d" onerror="console.error('Image failed to load:', '${project.img}')" />
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
    
    // Add to both grid and slider
    projectsGrid.appendChild(projectCard);
    
    // Create fresh clone for slider to avoid image loading issues
    const sliderCard = projectCard.cloneNode(true);
    sliderTrack.appendChild(sliderCard);
  });

  // Simple slider functionality
  function updateSlider() {
    const screenWidth = window.innerWidth;
    const isMobile = screenWidth <= 770;
    const isTablet = screenWidth <= 1024;
    
    // Calculate slide width based on viewport
    let slideWidth;
    if (isMobile) {
      slideWidth = sliderWrapper.offsetWidth; // Use actual wrapper width
    } else if (isTablet) {
      slideWidth = 400; // Fixed width for tablets
    } else {
      slideWidth = 0;
    }
    
    // Move to current slide
    sliderTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    
    // Update buttons
    const totalSlides = sliderTrack.querySelectorAll('.project-card-3d').length;
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
    const totalSlides = sliderTrack.querySelectorAll('.project-card-3d').length;
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      updateSlider();
    }
  });
  
  // Touch support
  let touchStartX = 0;
  sliderTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  sliderTrack.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > 50) {
      const totalSlides = sliderTrack.querySelectorAll('.project-card-3d').length;
      if (diff > 0 && currentSlide < totalSlides - 1) {
        currentSlide++;
      } else if (diff < 0 && currentSlide > 0) {
        currentSlide--;
      }
      updateSlider();
    }
  });
  
  // Handle resize and layout
  function updateLayout() {
    const screenWidth = window.innerWidth;
    
    if (screenWidth <= 1024) {
      sliderContainer.style.display = 'flex';
      projectsGrid.style.display = 'none';
      console.log('Mobile/Tablet mode: Showing slider');
    } else {
      sliderContainer.style.display = 'none';
      projectsGrid.style.display = 'grid';
      console.log('Desktop mode: Showing grid, screen width:', screenWidth);
    }
    updateSlider();
  }
  
  window.addEventListener('resize', updateLayout);
  
  // Initial setup
  updateLayout();
  
  // Assemble slider
  sliderContainer.appendChild(prevBtn);
  sliderContainer.appendChild(sliderTrack);
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
