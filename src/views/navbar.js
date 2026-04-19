export function renderNavbar() {
  const navbar = document.querySelector('.nav');

  navbar.innerHTML = `
    <div class="container__navbar">
      <div class="menu-toggle" id="menuToggle">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="nav-panel" id="navPanel">
        <ul class="ul__nav">
          <li class="li__nav" data-section="im">im()</li>
          <li class="li__nav" data-section="works">works()</li>
          <li class="li__nav" data-section="about">about()</li>
          <li class="li__nav" data-section="contact">contact()</li>
        </ul>
      </div>
    </div>
  `;

  // Esperar a que el DOM esté actualizado antes de añadir eventos
  setTimeout(() => {
    const navItems = document.querySelectorAll('.li__nav');
    const navPanel = document.querySelector('.nav-panel');
    const menuToggle = document.getElementById('menuToggle');

    // Toggle mobile menu
    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        navPanel.classList.toggle('show');
      });
    }

    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = item.dataset.section;
        const target = document.getElementById(sectionId);

        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        if (navPanel) {
          navPanel.classList.remove('show');
        }
      });

      // Añadir efecto visual al hacer clic
      item.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav') && navPanel.classList.contains('show')) {
        navPanel.classList.remove('show');
      }
    });
  }, 10);
}
