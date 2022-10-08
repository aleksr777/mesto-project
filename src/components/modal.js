const handlerEsc = (event) => {
  if (event.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handlerEsc);
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

const closeCurrentPopup = (event) => {
  if (event.target.classList.contains('popup__close-button') || event.target.classList.contains('popup_opened')) {
    closePopup(event.currentTarget);
    event.stopPropagation();
  }
}

export { openPopup, closePopup, closeCurrentPopup }; 