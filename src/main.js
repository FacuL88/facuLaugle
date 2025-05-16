import './app.css';
import { renderNavbar } from './views/navbar';
import { renderIm } from './views/im';
import { renderWorks } from './views/works';
import { renderAbout } from './views/about';
import { renderContact } from './views/contact';

document.querySelector('#app').innerHTML = `
  <div class="container">
    <header class="header">
      <nav class="nav"></nav>
    </header>
    <main class="main">
      <section id="im" class="section"></section>
      <section id="works" class="section"></section>
      <section id="about" class="section"></section>
      <section id="contact" class="section"></section>
    </main>
  </div>
`;

// Renderizamos el navbar (con eventos de scroll)
renderNavbar();

// Renderizamos todas las secciones en su lugar
document.querySelector('#im').appendChild(renderIm());
document.querySelector('#works').appendChild(renderWorks());
document.querySelector('#about').appendChild(renderAbout());
document.querySelector('#contact').appendChild(renderContact());
