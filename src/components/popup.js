export default class Popup {
  constructor(popupSelector) {
    this._main = document.querySelector('.main');
    this._popup = document.querySelector(popupSelector);
    this._closeClick = this._closeClick.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // закрытие при нажатии на клавишу 'Escape'
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  // закрытие при клике по кнопке и оверлею
  _closeClick(evt) {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      this.close();
    };
    evt.stopPropagation();
  }

  // установка слушателей
  setEventListeners() {
    this._popup.addEventListener('click', this._closeClick);
    document.addEventListener('keydown', this._handleEscClose);
  }

  // отключение слушателей
  deactivateEventListeners() {
    this._popup.removeEventListener('click', this._closeClick);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  open() {
    this._main.style.pointerEvents = 'none';
    this._popup.style.pointerEvents = 'none';
    this._popup.style.transition = 'all .4s ease 0s'; // задаём нужное свойство transition
    this._popup.style.opacity = '0'; // делаем popup изначально прозрачным перед открытием
    this._popup.classList.add('popup_opened');
    setTimeout(() => this._popup.style.opacity = '1', 0);
    // popup плавно становится непрозрачным (setTimeout нужен для срабатывания свойства transition)
    setTimeout(() => {
      this.setEventListeners();
      this._popup.style.pointerEvents = ''; // возвращаем исходные значения
      this._popup.style.transition = '';
    }, 400);
  }

  close() {
    this._popup.style.pointerEvents = 'none';
    this.deactivateEventListeners();
    this._popup.style.transition = 'all .4s ease 0s'; // задаём нужное свойство transition
    this._popup.style.opacity = '0'; // popup плавно становится прозрачным (срабатывает свойство transition)
    setTimeout(() => { // setTimeout нужен, чтобы успела сработать анимация (transition) перед закрытием popup
      this._popup.classList.remove('popup_opened');
      this._popup.style.opacity = ''; // возвращаем исходные значения
      this._main.style.pointerEvents = '';
      this._popup.style.pointerEvents = '';
      this._popup.style.transition = '';
    }, 400); 
  }
}