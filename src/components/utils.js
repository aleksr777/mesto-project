import { enableValidation } from './validate.js';

const handlerEsc = (event) => {
  const popup = document.querySelector('.popup_opened');
  if (event.key === 'Escape') {
    closePopup(popup);
  }
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handlerEsc);
  const textForm = popup.querySelector('.form__input-text');
  if (textForm && enableValidation) { enableValidation() }
};

const closePopup = (popup) => {
  document.removeEventListener('keydown', handlerEsc);
  popup.style.animationName = 'close-popup';
  popup.style.animationPlayState = 'running';
  setTimeout(() => {
    popup.classList.remove('popup_opened');
    popup.style.animationName = '';
    popup.style.animationPlayState = '';
  }, 300);
};

export { openPopup, closePopup }; 