export function renderNavbar() {
  const navbar = document.querySelector('.nav');

  navbar.innerHTML = `
    <div class="container__navbar">
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

  const navPanel = document.querySelector('.nav-panel')


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
