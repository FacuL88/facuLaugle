export function renderNavbar() {
  const navbar = document.querySelector('.nav');

  navbar.innerHTML = `
    <div class="hamburger-container">
      <div class="hamburger-icon">☰</div>
      <div class="nav-panel">
        <ul class="ul__nav">
          <li class="li__nav" data-section="im">im()</li>
          <li class="li__nav" data-section="works">works()</li>
          <li class="li__nav" data-section="about">about()</li>
          <li class="li__nav" data-section="contact">contact()</li>
        </ul>
      </div>
    </div>
  `;

  const navPanel = navbar.querySelector('.nav-panel');
  const hamburgerIcon = navbar.querySelector('.hamburger-icon');

  hamburgerIcon.addEventListener('mouseenter', () => {
    hamburgerIcon.classList.add('hide');
    navPanel.classList.add('show');
  });

  navPanel.addEventListener('mouseenter', () => {
    navPanel.classList.add('show');
  });

  navbar.addEventListener('mouseleave', () => {
    navPanel.classList.remove('show');
    setTimeout(() => {
      if (!navPanel.classList.contains('show')) {
        hamburgerIcon.classList.remove('hide');
      }
    }, 400);
  });

  // Scroll a la sección correspondiente
  document.querySelectorAll('.li__nav').forEach(item => {
    item.addEventListener('click', () => {
      const sectionId = item.dataset.section;
      const target = document.getElementById(sectionId);

      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }

      navPanel.classList.remove('show');
    });
  });
}
