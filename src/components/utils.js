import { enableValidation } from './validate.js';

const handlerEsc = (event) => {
  if (event.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handlerEsc);
  const form = popup.querySelector('.form');
  if (form) {
    enableValidation({
      formSelector: '.form',
      inputSelector: '.form__input-text',
      submitButtonSelector: '.form__submit',
      inactiveButtonClass: 'form__submit_inactive',
      inputErrorClass: 'form__input-text_type_error',
      errorClass: 'form__input-error'
    });
  }
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