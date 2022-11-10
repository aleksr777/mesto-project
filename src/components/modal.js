const handlerEsc = (event) => {
  if (event.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

const openPopup = (popup) => {
  popup.style.pointerEvents = 'none';
  popup.style.transition = 'all .4s ease 0s';
  popup.style.opacity = '0'; // делаем popup изначально прозрачным
  popup.classList.add('popup_opened');
  // далее плавно делаем popup непрозрачным (setTimeout нужен для срабатывания свойства transition)
  setTimeout(() => popup.style.opacity = '1', 0);
  setTimeout(() => {
    document.addEventListener('keydown', handlerEsc);
    popup.style.pointerEvents = '';
    popup.style.transition = '';
  }, 400); 
};

const closePopup = (popup) => {
  popup.style.pointerEvents = 'none';
  document.removeEventListener('keydown', handlerEsc);
  popup.style.transition = 'all .4s ease 0s';
  popup.style.opacity = '0'; // делаем popup плавно прозрачным (срабатывает свойство transition)
  setTimeout(() => { // setTimeout нужен, чтобы успела сработать анимация
    popup.classList.remove('popup_opened');
    popup.style.opacity = ''; // возвращаем значения по-умолчанию
    popup.style.pointerEvents = '';
    popup.style.transition = '';
  }, 400);
};

const closeCurrentPopup = (event) => {
  if (event.target.classList.contains('popup__close-button') || event.target.classList.contains('popup_opened')) {
    closePopup(event.currentTarget);
    event.stopPropagation();
  }
}

export { openPopup, closePopup, closeCurrentPopup }; 