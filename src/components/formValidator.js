export default class FormValidator {
  constructor(validationConfig, formElement) {
    this._formElement = formElement;
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._inputElements = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  //Инициируем валидацию
  enableValidation() {
    this._setEventListeners();
  }

  //Устанавливает слушатели событий на форму
  _setEventListeners() {
    this._inputElements.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
    // Определяет исходное положение кнопки
    this._toggleButtonState();
  }

  //Проверяем на валидность
  _isValid(inputElement) {
    // проверяем с помощью регулярных выражений
    if (inputElement.validity.patternMismatch) {
      // Выводим кастомное сообщение
      // в js имя атрибута пишется в camelCase, в HTML в kebab-case.
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      // если передать пустую строку, то будут доступны
      // стандартные браузерные сообщения
      inputElement.setCustomValidity('');
    }

    // стандартная валидация
    if (!inputElement.validity.valid) {
      // showInputError получает параметром форму, в которой находится проверяемое поле, и само это поле
      this._showInputError(inputElement, inputElement.validationMessage);
    }
    else {
      // hideInputError получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      this._hideInputError(inputElement);
    }
  }

  //Показываем ошибку у инпута
  _showInputError(inputElement, errorMessage) {
    // Находим элемент ошибки внутри самой функции
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    // Показываем ошибку в форме
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  //Скрываем ошибку у инпута
  _hideInputError(inputElement) {
    // Находим элемент ошибки
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    // Скрываем показ ошибки в форме
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  clearMistakes() { this._inputElements.forEach(input => this._hideInputError(input)) }

  //Переключаем состояние сабмита
  _toggleButtonState() {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      // сделай кнопку неактивной
      this.disableButtonState();
    }
    else {
      // иначе сделай кнопку активной
      this._enableButtonState();
    }
  }

  //Отключаеv кнопку сабмита
  disableButtonState() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  //Включаем кнопку сабмита
  _enableButtonState() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  // Проверяем форму на наличие невалидных полей
  _hasInvalidInput() {
    return this._inputElements.some(inputElement => inputElement.validity.valid === false);
  }
};