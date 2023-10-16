export class Popup {
  constructor(bodyNode, pageNode, selectors, popupElement, animationDuration) {
    this._bodyNode = bodyNode;
    this._pageNode = pageNode;
    this._popupElement = popupElement;
    this._container = this._popupElement.querySelector(selectors.popupContainer);
    this._popupOpenedSelector = selectors.popupOpened;
    this._closeButtonSelector = selectors.popupCloseButton;
    this._handleClick = this._handleClick.bind(this);
    this._handleEsc = this._handleEsc.bind(this);
    this._disableScroll = this._disableScroll.bind(this);
    this._enableScroll = this._enableScroll.bind(this);
    this._pagePosition = 0;
    this._animationDuration = animationDuration;
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
    this._popupElement.addEventListener('mousedown', this._handleClick);
    document.addEventListener('keydown', this._handleEsc);
  }

  // отключение обработчиков
  removeEventListeners() {
    this._popupElement.removeEventListener('mousedown', this._handleClick);
    document.removeEventListener('keydown', this._handleEsc);
  }

  _disableScroll = (node) => {
    this._pagePosition = window.scrollY; // сохраняем позицию скрола
    node.style.right = `${(window.innerWidth - this._bodyNode.offsetWidth) / 2}px`; // вычисляем ширину полосы прокрутки
    node.style.top = `${-this._pagePosition}px`; // сдвигаем страницу на нужную высоту
    // задаём стили для фиксации экрана
    node.style.transition = 'none';
    node.style.overflowY = 'hidden';
    node.style.position = 'fixed';
    node.style.width = '100%';
    node.style.height = '100vh';
  }

  _enableScroll = (node) => {
    // возвращаем исходные стили
    node.style.top = '';
    node.style.left = '';
    node.style.transition = '';
    node.style.overflowY = '';
    node.style.position = '';
    node.style.width = '';
    node.style.height = '';
    window.scroll({ top: this._pagePosition, left: 0 }); // устанавливаем скролл в позицию, которая была до открытия popup
  }

  open(evt) {
    if (this._bodyNode && this._pageNode && this._popupElement) {

      this._disableScroll(this._bodyNode);
      this._pageNode.style.pointerEvents = 'none';
      this._popupElement.style.pointerEvents = 'none';
      this._popupElement.classList.add(this._popupOpenedSelector);

      const clickX = `${evt.clientX}px`;
      const clickY = `${evt.clientY}px`;

      this._container.animate(
        [
          {
            left: clickX,
            top: clickY,
            opacity: 0,
          },
          { opacity: 1 },
        ],
        {
          duration: this._animationDuration / 1.6,
          easing: 'ease-out'
        }
      )

      this._container.animate(
        [
          { opacity: 0 },
          { opacity: 1 },
        ],
        {
          duration: this._animationDuration,
          easing: 'ease-in-out'
        }
      )

      this._popupElement.animate(
        [
          { opacity: 0 },
          { opacity: 1 },
        ],
        {
          duration: this._animationDuration,
          easing: 'ease-in-out'
        }
      ).onfinish = () => {
        this.setEventListeners();
        // возвращаем исходные значения
        this._popupElement.style.pointerEvents = '';
        this._pageNode.style.pointerEvents = '';
      };
    };
  }

  close() {
    /* блокируем на время срабатывания анимации */
    if (this._bodyNode && this._pageNode && this._popupElement) {
      this._pageNode.style.pointerEvents = 'none'
      this._popupElement.style.pointerEvents = 'none';
      this.removeEventListeners();
      this._popupElement.animate(
        [
          { opacity: 1 },
          { opacity: 0 }
        ],
        {
          duration: this._animationDuration,
          easing: 'ease-in-out'
        }
      ).onfinish = () => {
        // возвращаем исходные значения
        this._pageNode.style.pointerEvents = '';
        this._popupElement.style.pointerEvents = '';
        this._popupElement.classList.remove(this._popupOpenedSelector);
        this._enableScroll(this._bodyNode);
      }
    };
  }
}
