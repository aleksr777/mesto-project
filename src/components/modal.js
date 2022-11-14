import { selectors } from '../utils/constants.js';

const handlerEsc = (event) => {
  if (event.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

const openPopup = (popup) => {
  popup.style.pointerEvents = 'none';
  popup.style.transition = 'all .4s ease 0s'; // задаём нужное свойство transition
  popup.style.opacity = '0'; // делаем popup изначально прозрачным перед открытием
  popup.classList.add(selectors.popupOpened);
  setTimeout(() => popup.style.opacity = '1', 0);
  // popup плавно становится непрозрачным (setTimeout нужен для срабатывания свойства transition)
  setTimeout(() => {
    document.addEventListener('keydown', handlerEsc);
    popup.style.pointerEvents = '';
    popup.style.transition = '';
  }, 400); 
};

const closePopup = (popup) => {
  popup.style.pointerEvents = 'none';
  document.removeEventListener('keydown', handlerEsc);
  popup.style.transition = 'all .4s ease 0s'; // задаём нужное свойство transition
  popup.style.opacity = '0'; // popup плавно становится прозрачным (срабатывает свойство transition)
  setTimeout(() => { // setTimeout нужен, чтобы успела сработать анимация перед закрытием popup
    popup.classList.remove(selectors.popupOpened);
    popup.style.opacity = ''; // возвращаем исходные значения
    popup.style.pointerEvents = '';
    popup.style.transition = '';
  }, 400);
};

const closeCurrentPopup = (event) => {
  if (event.target.classList.contains(selectors.popupCloseButton) || event.target.classList.contains(selectors.popupOpened)) {
    closePopup(event.currentTarget);
    event.stopPropagation();
  }
}

export { openPopup, closePopup, closeCurrentPopup }; 