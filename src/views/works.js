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

  // === Innovative 3D Grid ===
  const projectsGrid = document.createElement('div');
  projectsGrid.classList.add('projects-grid-3d');

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
    
    // Add 3D tilt effect
    projectCard.addEventListener('mousemove', (e) => {
      const rect = projectCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      projectCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    projectCard.addEventListener('mouseleave', () => {
      projectCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
    
    projectsGrid.appendChild(projectCard);
  });

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
  row.appendChild(colTitulo);
  row.appendChild(colWorks);
  container.appendChild(row);
  section.appendChild(container);

  return section;
}
