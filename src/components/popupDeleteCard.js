import { Popup } from './popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(selectors, popupElement, pageNode, animationDuration, callbackSubmit) {
    super(selectors, popupElement, pageNode, animationDuration);
    this._button = popupElement.querySelector(selectors.submitButton);
    this._callbackSubmit = callbackSubmit;
    this._doCallback = this._doCallback.bind(this);
    this.animationDuration = animationDuration;
  }

  _doCallback(evt) { // этот метод нужен, чтобы можно было снять обработчик с кнопки
    this._callbackSubmit(evt);
  }

  getIdCard() {
    return this._cardId;
  }

  open(cardId, cardElement) { // переписываем метод родителя
    super.open();// присваиваем свойства родителя
    this.setEventListeners();// используем переписанный метод
    return this._cardId = cardId, this._cardElement = cardElement;
  }

  setEventListeners() {// переписываем метод родителя
    super.setEventListeners();// присваиваем свойства родителя
    this._button.addEventListener('click', this._doCallback);
  }

  removeEventListeners() {// переписываем метод родителя
    super.removeEventListeners();// присваиваем свойства родителя
    this._button.removeEventListener('click', this._doCallback);
  }

  // изменение состояния кнопки при взаимодействии с сервером
  isLoading(loading) {
    if (loading) {
      this._button.textContent = 'Удаление...';
      this._button.setAttribute('disabled', true);
    }
    else {
      setTimeout(() => {      
        this._button.textContent = 'Да';
        this._button.removeAttribute('disabled', true);
      }, this.animationDuration);
    }
  }

  delete() {
    this._cardElement.remove();
  }
};
