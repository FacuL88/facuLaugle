export function renderContact() {
  const section = document.createElement('section');
  section.classList.add('section');
  section.innerHTML = `
      <div class='container__contact' id='contact'>
  <div class="row">
    <div class="col col__ul__contact">
      <ul class='ul__contact'>
        <li class='li__contact'>
          <h2>{contact}</h2>
        </li>
        <li class='li__contact'>
          <h2>facu.<span class="span__contact">im()</span></h2>
        </li>
      </ul>
    </div>
    <div class="col col__data__contact">
      <div class="container__data__contact">
        <div class="data__contact__white">F</div>
        <div class="data__contact">in</div>
        <div class="data__contact">G</div>
        <div class="data__contact">w</div>
      </div>
      <div class="container__ul__contact">
        <ul class="ul__sec_contact">
          <li class="li__sec__contact__number">+541122526626</li>
          <li class="li__sec__contact">@linkedin</li>
          <li class="li__sec__contact">lauglefacundo@gmail.com</li>
          <li class="li__sec__contact">facundolaugle.com</li>
        </ul>
      </div>
    </div>
  </div>
</div>

  `;
  return section;
}