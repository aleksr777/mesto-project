export class Popup {
  constructor(selectors, popupElement, pageNode) {
    this._pageNode = pageNode;
    this._popup = popupElement;
    this._popupOpenedSelector = selectors.popupOpened;
    this._closeButtonSelector = selectors.popupCloseButton;
    this._handleClick = this._handleClick.bind(this);
    this._handleEsc = this._handleEsc.bind(this);
  }

  // закрытие при нажатии на клавишу 'Escape'
  _handleEsc(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  // закрытие при клике по кнопке и оверлею
  _handleClick(evt) {
    if (evt.target.classList.contains(this._popupOpenedSelector) || evt.target.classList.contains(this._closeButtonSelector)) {
      this.close();
    };
    evt.stopPropagation();
  }

  // установка обработчиков
  setEventListeners() {
    this._popup.addEventListener('click', this._handleClick);
    document.addEventListener('keydown', this._handleEsc);
  }

  // отключение обработчиков
  removeEventListeners() {
    this._popup.removeEventListener('click', this._handleClick);
    document.removeEventListener('keydown', this._handleEsc);
  }

  open() {
    this._pageNode.style.pointerEvents = 'none';
    this._popup.style.pointerEvents = 'none';
    this._popup.style.transition = 'all .4s ease 0s'; // задаём нужное свойство transition
    this._popup.style.opacity = '0'; // делаем popup изначально прозрачным перед открытием
    this._popup.classList.add(this._popupOpenedSelector);
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
    this.removeEventListeners();
    this._popup.style.transition = 'all .4s ease 0s'; // задаём нужное свойство transition
    this._popup.style.opacity = '0'; // popup плавно становится прозрачным (срабатывает свойство transition)
    setTimeout(() => { // setTimeout нужен, чтобы успела сработать анимация (transition) перед закрытием popup
      this._popup.classList.remove(this._popupOpenedSelector);
      this._popup.style.opacity = ''; // возвращаем исходные значения
      this._pageNode.style.pointerEvents = '';
      this._popup.style.pointerEvents = '';
      this._popup.style.transition = '';
    }, 400);
  }
}