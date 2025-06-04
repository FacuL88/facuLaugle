import img__profile from '../assets/images/img-facu.jpeg'

export function renderIm() {
  const section = document.createElement('section');
  section.classList.add('section');
section.innerHTML = `  
  <div class='container__im' id='im'>
    <div class="container__img">
      <img src=${img__profile} alt="La imagen no esta disponible" />
    </div>
    <div class="container__info__im">
      <div class='container__ul'>
        <ul>
          <li class='items__li li__name'><span>facu</span>.im()</li>
          <li class='items__li li__name__im'>Facundo Laugle</li>
          <li class='items__li li__name__desc'>{Desarrollo de aplicaciones web}</li>
        </ul>
      </div>
    </div>
  </div>  
`;
  
  return section;
}