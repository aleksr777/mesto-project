const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

const closePopup = (popup) => {
  popup.style.animationName = 'close-popup';
  popup.style.animationPlayState = 'running';
  setTimeout(() => {
    popup.classList.remove('popup_opened');
    popup.style.animationName = 'appearance-popup';
  }, 300);
};

export { openPopup, closePopup }; 