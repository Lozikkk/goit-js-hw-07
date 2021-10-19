import { galleryItems } from './gallery-items.js';
// Change code below this line

const imageContainer = document.querySelector('.gallery-js');
const imageMarkup = createImagesMarkup(galleryItems);
imageContainer.insertAdjacentHTML('beforeend', imageMarkup);

//console.log(createImagesMarkup(galleryItems));

function createImagesMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
<a
  class="gallery__link"
  href='${original}'
>
  <img
    class="gallery__image"
    src='${preview}'
    data-source='${original}'
    alt='${description}'
  />
</a>
</li>`;
    })
    .join('');
}

///////////////
imageContainer.addEventListener('click', modalOpen);
function modalOpen(e) {
  e.preventDefault();

  const targetImg = e.target.nodeName === 'IMG';
  if (!targetImg) {
    return;
  }

  const instance = basicLightbox.create(
    `<div class="modal">
    <img src = ${e.target.dataset.source}
    alt=${e.target.alt}
    width = '1140'
    height = '800'
    />
       </div> `,
  );
  instance.show();

  const imageElement = instance.element('.modal');
  imageElement.addEventListener('click', modalClose);
  window.addEventListener('keydown', modalClose);

  function modalClose(e) {
    if (
      e.target.nodeName === 'IMG' ||
      e.code === 'Escape' ||
      e.currentTarget.nodeName === 'DIV'
    ) {
      instance.close();
      imageElement.removeEventListener('click', modalClose);
      window.removeEventListener('keydown', modalClose);
    }
  }
}
