export class Popup {
  constructor(selectors, popupElement, pageNode) {
    this._body = document.querySelector('body');
    this._pageNode = pageNode;
    this._popup = popupElement;
    this._popupOpenedSelector = selectors.popupOpened;
    this._closeButtonSelector = selectors.popupCloseButton;
    this._handleClick = this._handleClick.bind(this);
    this._handleEsc = this._handleEsc.bind(this);
    this._disableScroll = this._disableScroll.bind(this);
    this._enableScroll = this._enableScroll.bind(this);
    this._pagePosition = null;
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
    this._popup.addEventListener('mousedown', this._handleClick);
    document.addEventListener('keydown', this._handleEsc);
  }

  // отключение обработчиков
  removeEventListeners() {
    this._popup.removeEventListener('mousedown', this._handleClick);
    document.removeEventListener('keydown', this._handleEsc);
  }

  _disableScroll = () => {
    /* сохраняем позицию страницы при скроле */
    this._pagePosition = window.scrollY;
    /* вычисляем ширину полосы прокрутки */
    this._body.style.right = (window.innerWidth - this._body.offsetWidth) / 2 + 'px';
    /* задаём стили для фиксации экрана*/
    this._body.style.transition = 'none';
    this._body.style.overflowY = 'hidden';
    this._body.style.position = 'fixed';
    this._body.style.width = '100%';
    this._body.style.height = '100vh';
    /* сдвигаем страницу на нужную высоту*/
    this._body.style.top = -this._pagePosition + 'px';
  }

  _enableScroll = () => {
    /* Возвращаем исходные стили в css */
    this._body.style.top = '';
    this._body.style.left = '';
    this._body.style.transition = '';
    this._body.style.overflowY = '';
    this._body.style.position = '';
    this._body.style.width = '';
    this._body.style.height = '';
    /* Устанавливаем скролл в позицию, которая была до открытия popup */
    window.scroll({ top: this._pagePosition, left: 0 });
  }

  open() {
    this._disableScroll();
    this._pageNode.style.pointerEvents = 'none';
    this._popup.style.pointerEvents = 'none';
    this._popup.classList.add(this._popupOpenedSelector);
    this._popup.animate(
      [
        { opacity: 0 },
        { opacity: 1 },
      ],
      {
        duration: 400,
        easing: "ease-in-out"
      }
    ).onfinish = () => {
      this.setEventListeners();
      // возвращаем исходные значения
      this._popup.style.pointerEvents = '';
      this._pageNode.style.pointerEvents = '';
    };
  }

  close() {
    /* блокируем на время срабатывания анимации */
    this._pageNode.style.pointerEvents = 'none';
    this._popup.style.pointerEvents = 'none';
    this.removeEventListeners();
    this._popup.animate(
      [
        { opacity: 1 },
        { opacity: 0 }
      ],
      {
        duration: 400,
        easing: "ease-in-out"
      }
    ).onfinish = () => {
      // возвращаем исходные значения
      this._pageNode.style.pointerEvents = '';
      this._popup.style.pointerEvents = '';
      this._popup.classList.remove(this._popupOpenedSelector);
      this._enableScroll();
    };
  }
}
