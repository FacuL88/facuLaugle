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

  // === Tab Navigation ===
  const tabNavigation = document.createElement('div');
  tabNavigation.classList.add('tab-navigation');

  const webTab = document.createElement('button');
  webTab.classList.add('tab-button', 'tab-button-active');
  webTab.dataset.category = 'web';
  webTab.innerHTML = `
    <span class="tab-icon">🌐</span>
    <span class="tab-text">Web Projects</span>
    <span class="tab-count">${arrayObj.filter(p => p.category === 'web').length}</span>
  `;

  const mobileTab = document.createElement('button');
  mobileTab.classList.add('tab-button');
  mobileTab.dataset.category = 'mobile';
  mobileTab.innerHTML = `
    <span class="tab-icon">📱</span>
    <span class="tab-text">iOS/Android</span>
    <span class="tab-count">${arrayObj.filter(p => p.category === 'mobile').length}</span>
  `;

  tabNavigation.appendChild(webTab);
  tabNavigation.appendChild(mobileTab);

  // === Projects Container ===
  const projectsContainer = document.createElement('div');
  projectsContainer.classList.add('projects-container');

  // === Desktop Grid ===
  const projectsGrid = document.createElement('div');
  projectsGrid.classList.add('projects-grid-professional');

  // === Responsive Grid ===
  const responsiveGrid = document.createElement('div');
  responsiveGrid.classList.add('projects-grid-responsive');

  // === Filter Projects by Category ===
  function filterProjects(category) {
    const filteredProjects = arrayObj.filter(project => project.category === category);
    
    // Clear existing projects
    projectsGrid.innerHTML = '';
    responsiveGrid.innerHTML = '';

    filteredProjects.forEach((project, index) => {
      const projectCard = createProjectCard(project, index);
      projectsGrid.appendChild(projectCard);
      responsiveGrid.appendChild(projectCard.cloneNode(true));
    });

    // Update tab active states
    document.querySelectorAll('.tab-button').forEach(tab => {
      tab.classList.remove('tab-button-active');
      if (tab.dataset.category === category) {
        tab.classList.add('tab-button-active');
      }
    });

    // Trigger animation
    projectsGrid.style.opacity = '0';
    responsiveGrid.style.opacity = '0';
    setTimeout(() => {
      projectsGrid.style.opacity = '1';
      responsiveGrid.style.opacity = '1';
    }, 50);
  }

  // === Create Project Card ===
  function createProjectCard(project, index) {
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card-professional');
    projectCard.style.animationDelay = `${index * 0.1}s`;
    
    const linkTarget = project.link !== "#" ? "_blank" : "_self";
    const linkHref = project.link !== "#" ? project.link : "javascript:void(0)";
    
    const categoryIcon = project.category === 'web' ? '🌐' : '📱';
    const categoryLabel = project.category === 'web' ? 'Web' : 'Mobile';
    
    projectCard.innerHTML = `
      <div class="card-inner-professional">
        <div class="card-visual">
          <div class="card-glow-professional"></div>
          <div class="card-category-badge">
            <span class="category-icon">${categoryIcon}</span>
            <span class="category-label">${categoryLabel}</span>
          </div>
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
      projectCard.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    projectCard.addEventListener('mouseleave', () => {
      projectCard.style.transform = 'translateY(0) scale(1)';
    });
    
    return projectCard;
  }

  // === Tab Click Handlers ===
  webTab.addEventListener('click', () => filterProjects('web'));
  mobileTab.addEventListener('click', () => filterProjects('mobile'));

  // === Responsive Layout Management ===
  function updateLayout() {
    const screenWidth = window.innerWidth;
    
    if (screenWidth <= 1024) {
      responsiveGrid.style.display = 'grid';
      projectsGrid.style.display = 'none';
    } else {
      responsiveGrid.style.display = 'none';
      projectsGrid.style.display = 'grid';
    }
  }
  
  window.addEventListener('resize', updateLayout);

  // === Add Floating Particles ===
  const particlesContainer = document.createElement('div');
  particlesContainer.classList.add('particles-container-professional');
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle-professional');
    particle.style.animationDelay = `${Math.random() * 3}s`;
    particle.style.animationDuration = `${Math.random() * 8 + 12}s`;
    particlesContainer.appendChild(particle);
  }

  // === Assemble Structure ===
  projectsContainer.appendChild(particlesContainer);
  projectsContainer.appendChild(projectsGrid);
  projectsContainer.appendChild(responsiveGrid);
  
  colWorks.appendChild(tabNavigation);
  colWorks.appendChild(projectsContainer);
  
  row.appendChild(colTitulo);
  row.appendChild(colWorks);
  container.appendChild(row);
  section.appendChild(container);

  // === Initialize with Web Projects ===
  filterProjects('web');
  updateLayout();

  return section;
}
