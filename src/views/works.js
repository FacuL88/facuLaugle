import { arrayObj } from "./provider";

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

  // === Slider Elements ===
  const slider = document.createElement('div');
  slider.classList.add('slider');

  const slide = document.createElement('div');
  slide.classList.add('slide');

  let currentIndex = 0;

  function updateSlide() {
    const project = arrayObj[currentIndex];
    slide.innerHTML = `
      <div class="slide__content">
        <img src="${project.img}" alt="${project.name}" />
        <h2 class="slide__title">${project.name}</h2>
        <p class="slide__description">${project.desc}</p>
        <a class="slide__link" href=${project.link} target="_blank" >${project.link}</a>
      </div>
    `;
  }

  updateSlide();

  // Botones
  const prevBtn = document.createElement('button');
  prevBtn.classList.add('slider-btn', 'prev');
  prevBtn.textContent = '<';

  const nextBtn = document.createElement('button');
  nextBtn.classList.add('slider-btn', 'next');
  nextBtn.textContent = '>';

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlide();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < arrayObj.length - 1) {
      currentIndex++;
      updateSlide();
    }
  });

  // Ensamblar estructura
  slider.appendChild(slide);
  colWorks.appendChild(prevBtn);
  colWorks.appendChild(slider);
  colWorks.appendChild(nextBtn);

  row.appendChild(colTitulo);
  row.appendChild(colWorks);
  container.appendChild(row);
  section.appendChild(container);

  return section;
}
