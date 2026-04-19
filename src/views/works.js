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

  // === Professional Grid for Desktop ===
  const projectsGrid = document.createElement('div');
  projectsGrid.classList.add('projects-grid-professional');

  // === Responsive Grid for All Screen Sizes ===
  const responsiveGrid = document.createElement('div');
  responsiveGrid.classList.add('projects-grid-responsive');

  // Create project cards with professional design
  let currentSlide = 0;
  
  arrayObj.forEach((project, index) => {
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card-professional');
    projectCard.style.animationDelay = `${index * 0.15}s`;
    
    const linkTarget = project.link !== "#" ? "_blank" : "_self";
    const linkHref = project.link !== "#" ? project.link : "javascript:void(0)";
    
    projectCard.innerHTML = `
      <div class="card-inner-professional">
        <div class="card-visual">
          <div class="card-glow-professional"></div>
          <img src="${project.img}" alt="${project.name}" class="project-image-professional" />
        </div>
        <div class="card-content">
          <h3 class="project-title-professional">${project.name}</h3>
          <p class="project-desc-professional">${project.desc}</p>
          <div class="project-tech-professional">${project.desc}</div>
          <div class="project-stats">
            <div class="stat-item">
              <span class="stat-number">${Math.floor(Math.random() * 50) + 10}</span>
              <span class="stat-label">Commits</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">${Math.floor(Math.random() * 20) + 5}</span>
              <span class="stat-label">Stars</span>
            </div>
          </div>
          <a href="${linkHref}" target="${linkTarget}" class="project-link-professional">
            <span class="link-text">View Project</span>
            <div class="link-arrow">→</div>
          </a>
        </div>
      </div>
    `;
    
    // Add hover effects
    projectCard.addEventListener('mouseenter', () => {
      projectCard.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    projectCard.addEventListener('mouseleave', () => {
      projectCard.style.transform = 'translateY(0) scale(1)';
    });
    
    // Add to both grids
    projectsGrid.appendChild(projectCard);
    responsiveGrid.appendChild(projectCard.cloneNode(true));
  });

  // Responsive layout management
  function updateLayout() {
    const screenWidth = window.innerWidth;
    
    if (screenWidth <= 1024) {
      // Mobile/Tablet: Show responsive grid
      responsiveGrid.style.display = 'grid';
      projectsGrid.style.display = 'none';
    } else {
      // Desktop: Show professional grid
      responsiveGrid.style.display = 'none';
      projectsGrid.style.display = 'grid';
    }
  }
  
  window.addEventListener('resize', updateLayout);
  
  // Add floating particles
  const particlesContainer = document.createElement('div');
  particlesContainer.classList.add('particles-container-professional');
  
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle-professional');
    particle.style.animationDelay = `${Math.random() * 3}s`;
    particle.style.animationDuration = `${Math.random() * 8 + 12}s`;
    particlesContainer.appendChild(particle);
  }

  // Assemble structure
  colWorks.appendChild(particlesContainer);
  colWorks.appendChild(projectsGrid);
  colWorks.appendChild(responsiveGrid);
  row.appendChild(colTitulo);
  row.appendChild(colWorks);
  container.appendChild(row);
  section.appendChild(container);

  // Initialize
  updateLayout();

  return section;
}
