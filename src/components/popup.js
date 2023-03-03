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
    this._popup.addEventListener('click', this._handleClick);
    document.addEventListener('keydown', this._handleEsc);
  }

  // отключение обработчиков
  removeEventListeners() {
    this._popup.removeEventListener('click', this._handleClick);
    document.removeEventListener('keydown', this._handleEsc);
  }

  _disableScroll = () => {
    /* сохраняем позицию страницы при скроле */
    this._pagePosition = window.scrollY;
    /* вычисляем ширину полосы прокрутки */
    this._body.style.right = (window.innerWidth - this._body.offsetWidth) / 2 + 'px';
    /* задаём стили */
    this._body.style.transition = 'none';
    this._body.style.overflowY = 'hidden';
    this._body.style.position = 'fixed';
    this._body.style.width = '100%';
    this._body.style.height = '100vh';
    /* сдвигаем страницу на нужную высоту*/
    this._body.style.top = -this._pagePosition + 'px';
  }

  _enableScroll = () => {
    /* Возвращаем ранее заданные стили в css */
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
    /* блокируем на время срабатывания анимации */
    this._pageNode.style.pointerEvents = 'none';
    this._popup.style.pointerEvents = 'none';
    /* удаляем слушатели */
    this.removeEventListeners();
    // задаём нужное свойство transition
    this._popup.style.transition = 'all .4s ease 0s';
    // popup плавно становится прозрачным (срабатывает свойство transition)
    this._popup.style.opacity = '0';
    // setTimeout нужен, чтобы успела сработать анимация (transition) перед закрытием popup
    setTimeout(() => {
      // возвращаем исходные значения
      this._popup.style.transition = '';
      this._popup.style.opacity = '';
      this._pageNode.style.pointerEvents = '';
      this._popup.style.pointerEvents = '';
      /* удаляем селектор открытия popup */
      this._popup.classList.remove(this._popupOpenedSelector);
      /* возвращаем скрол страницы */
      this._enableScroll();
    }, 500);
  }
}