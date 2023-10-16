import { Popup } from './popup.js';

export default class PopupWithForm extends Popup {
  constructor(bodyNode, pageNode, selectors, popupElement, animationDuration, callbackSubmit) {
    super(bodyNode, pageNode, selectors, popupElement, animationDuration);
    this._formElement = popupElement.querySelector(selectors.form);
    this._formElementSubmitButton = this._formElement.querySelector(selectors.submitButton);
    this._inputList = this._formElement.querySelectorAll(selectors.input);
    this._inputValues = {}; // здесь содержимое инпутов
    this._callbackSubmit = callbackSubmit;
    this._doCallback = this._doCallback.bind(this);
    this.animationDuration = animationDuration;
  }

  _doCallback(evt) { // этот метод нужен, чтобы можно было снять обработчик с кнопки
    this._callbackSubmit(evt);
  }

  _getInputValues() {
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value; // ключём будет "name" из инпута html-разметки
    });
    return this._inputValues;
  }

  getFormValues(data) {
    return this._getInputValues(data);
  }

  getInputList() {
    return this._inputList;
  }

  close() {// переписываем метод родителя
    super.close();// присваиваем свойства родителя
    this._formElement.reset();// сбрасыаем форму
  }

  setEventListeners() {// переписываем метод родителя
    super.setEventListeners();// присваиваем свойства родителя
    this._formElement.addEventListener('submit', this._doCallback);
  }

  removeEventListeners() {// переписываем метод родителя
    super.removeEventListeners();// присваиваем свойства родителя
    this._formElement.removeEventListener('submit', this._doCallback);
  }

  // изменение состояния кнопки при взаимодействии с сервером
  isLoading(loading) {
    if (loading) {
      this._formElementSubmitButton.textContent = 'Сохранение...';
      this._formElementSubmitButton.setAttribute('disabled', true);
    }
    else {
      setTimeout(() => { // отсрочка нужна, чтобы окно успело закрыться (из-за анимации)        
        this._formElementSubmitButton.textContent = 'Сохранить';
      }, this.animationDuration);
    }
  }

  setBeforeServerResponse() {
    this._formElement.style.pointerEvents = 'none';
    this._inputList.forEach(input => {
      input.value = 'Загрузка...';
      input.style.opacity = '.5';
    });
  }

  setAfterServerResponse() {
    this._formElement.style.pointerEvents = '';
    this._inputList.forEach(input => {
      input.style.opacity = '';
    });
  }
}
