import Popup from './popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.form');
    this._formElementSubmitButton = this._formElement.querySelector('.form__submit');
    this._callbackSubmit = callbackSubmit;
    this._cardId = '';
    this._cardElement = '';
    this._doCallback = this._doCallback.bind(this);// этот нужно, чтобы можно было снять обработчик с кнопки
  }

  _doCallback(evt) { // этот метод нужен, чтобы можно было снять обработчик с кнопки
    this._callbackSubmit(evt);
  }

  getIdCard() {
    return this._cardId;
  }

  open(cardId, cardElement) { // переписываем метод родителя
    super.open();// присваиваем свойства родителя
    return this._cardId = cardId, this._cardElement = cardElement;
  }

  setEventListeners() {// переписываем метод родителя
    super.setEventListeners();// присваиваем свойства родителя
    this._formElement.addEventListener('submit', this._doCallback);
  }

  deactivateEventListeners() {// переписываем метод родителя
    super.deactivateEventListeners();// присваиваем свойства родителя
    this._formElement.removeEventListener('submit', this._doCallback);
  }

  // изменение состояния кнопки при взаимодействии с сервером
  isLoading(loading) {
    if (loading) {
      this._formElementSubmitButton.textContent = 'Удаление...';
      this._formElementSubmitButton.setAttribute('disabled', true);
    }
    else {
      setTimeout(() => { // отсрочка нужна, чтобы окно успело закрыться (из-за анимации)        
        this._formElementSubmitButton.textContent = 'Да';
        this._formElementSubmitButton.removeAttribute('disabled', true);
      }, 400);
    }
  }

  delete() {
    this._cardElement.remove();
  }
};