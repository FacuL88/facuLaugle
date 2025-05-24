export function renderAbout() {
  const base = import.meta.env.BASE_URL;
  const cvLink = `${base}assets/facundoLaugle.pdf`;

  const section = document.createElement('section');
  section.classList.add('section');
  section.innerHTML = `
      <div class='container__about' id='about'>
        <div class="row">
          <div class="col col__title">
            <ul class="ul__about">
              <li class="li__about">          
                <h1>hello!</h1>            
              </li>
              <li class="li__about">
                <h2>facu.<span class="span__about">im()</span></h2>
              </li>
            </ul>
          </div>
          <div class="col col__info">
            <div>
              <button class='btn__linkedin'>
                <span class="span__btn">in</span>
              </button>
              <span class="span__download">download my</span>
                <a id="btnDownloadCV" class="btn__dwl__cv">cv</a>
              <div class="container__input__dwl">
                <p class='parrafo__about'>
                  Hola, soy Facundo. Desarrollador
                  web.
                  He
                  desarrollado
                  y
                  colaborado
                  en
                  diferentes
                  proyectos. Lo que más me gusta
                  de la programación es optimizar
                  los recursos que den soluciones y
                  formar parte de ese proceso de
                  mejora y construcción.
                </p>
              </div>
            </div>
            <h2 class="titulo__skills">my skills</h2>
            <div class='container__skills'>
              <div class="container__skills__front">
                <ul class="ul__front">
                  <li class="li__front">Javascript</li>
                  <li class="li__front">React js</li>
                  <li class="li__front">Css</li>
                </ul>
              </div>
              <div class="container__skills__back">
                <ul class="ul__back">
                  <li class="li__back">Python</li>
                  <li class="li__back">FastApi</li>
                  <li class="li__back">Mongodb</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

  `;
  const downloadBtn = section.querySelector('#btnDownloadCV');
  downloadBtn.href = cvLink;
  downloadBtn.setAttribute('download', 'facundoLaugle.pdf')

  return section;
}