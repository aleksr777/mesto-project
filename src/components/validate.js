const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если хоть один input невалидный, колбэк вернёт true (невалидный)
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('form__submit_inactive');
    buttonElement.setAttribute('disabled', true);
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('form__submit_inactive');
    buttonElement.removeAttribute('disabled');
  }
};

const setEventListeners = (formElement) => {
  // Найдём все поля формы и сделаем из них массив
  const inputList = Array.from(formElement.querySelectorAll('.form__input-text'));
  // Найдём в текущей форме кнопки отправки
  const buttonElements = formElement.querySelectorAll('.form__submit');

  buttonElements.forEach((buttonElement) => {
    // сделаем кнопки неактивными изначально по умолчанию
    toggleButtonState(inputList, buttonElement);
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      //изменим состояние кнопок в зависимости от валидаци форм
      buttonElements.forEach((buttonElement) => {
        toggleButtonState(inputList, buttonElement);
      });
    });
  });
};

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(formElement);
  });
};

const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Показываем ошибку в форме
  inputElement.classList.add('form__input-text_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Скрываем показ ошибки в форме
  inputElement.classList.remove('form__input-text_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {

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
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // hideInputError получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement);
  }
};

export { enableValidation }; 