const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const createCardForm = document.querySelector('.form_type_card-form');
const saveProfileForm = document.querySelector('.form_type_profile');

const popupProfile = document.querySelector('.popup_type_profile');
const popupCardForm = document.querySelector('.popup_type_card-form');
const popupImage = document.querySelector('.popup_type_image');

const inputName = document.querySelector('#profile-name-input');
const inputProfession = document.querySelector('#profile-profession-input');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

const inputPlaceName = document.querySelector('#card-name-input');
const inputSrcLink = document.querySelector('#card-link-input');


const popupCloseButtons = document.querySelectorAll('.popup__close-button');

const imgPopupImage = popupImage.querySelector('.popup__img');
const webpPopupImage = popupImage.querySelector('.popup__webp');
const captionPopupImage = popupImage.querySelector('.popup__caption');

const cardsBlock = document.querySelector('.cards-block');
const cardTemplate = document.querySelector('#card-template');
const cloneNodeTemplate = (template) => template.querySelector('.cards-block__card').cloneNode(true);






const hasInvalidInput = (inputList) => {
	// проходим по этому массиву методом some
	return inputList.some((inputElement) => {
		// Если поле не валидно, колбэк вернёт true
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
		toggleButtonState(inputList, buttonElement);
	});

	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', () => {
			isValid(formElement, inputElement);
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

		// Для каждой формы вызовем функцию setEventListeners,
		// передав ей элемент формы
		setEventListeners(formElement);
	});
};

const showInputError = (formElement, inputElement, errorMessage) => {
	// Находим элемент ошибки внутри самой функции
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	// Остальной код такой же
	inputElement.classList.add('form__input-text_type_error');
	errorElement.textContent = errorMessage;
	errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
	// Находим элемент ошибки
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	// Остальной код такой же
	inputElement.classList.remove('form__input-text_type_error');
	errorElement.classList.remove('form__input-error_active');
	errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
	if (!inputElement.validity.valid) {
		// showInputError получает параметром форму, в которой
		// находится проверяемое поле, и само это поле
		showInputError(formElement, inputElement, inputElement.validationMessage);
	} else {
		// hideInputError получает параметром форму, в которой
		// находится проверяемое поле, и само это поле
		hideInputError(formElement, inputElement);
	}
};

// Вешаем обработчики на все поля форм и инпуты
enableValidation();






const card = {
	placeName: '',
	srcLink: '',
	srcsetLink: '',
};

const initialCards = [
	{
		name: 'Камчатка',
		srcset: 'images/kamchatka.webp',
		src: 'images/kamchatka.jpg'
	},
	{
		name: 'Гора Эльбрус',
		srcset: 'images/mountain-elbrus.webp',
		src: 'images/mountain-elbrus.jpg'
	},
	{
		name: 'Домбай',
		srcset: 'images/dombai.webp',
		src: 'images/dombai.jpg'
	},
	{
		name: 'Озеро Байкал',
		srcset: 'images/baikal.webp',
		src: 'images/baikal.jpeg'
	},
	{
		name: 'Столбы выветривания – Маньпупунер',
		srcset: 'images/stolby-vyvetrivaniya.webp',
		src: 'images/stolby-vyvetrivaniya.jpg'
	},
	{
		name: 'Карачаево-Черкессия',
		srcset: 'images/karachaevsk.webp',
		src: 'images/karachaevsk.jpg'
	}
];

const openPopup = (popup) => {
	popup.classList.add('popup_opened');
};

const closePopup = (popup) => {
	popup.style.animationName = 'close-popup';
	popup.style.animationPlayState = 'running';
	setTimeout(() => {
		popup.classList.remove('popup_opened');
		popup.style.animationName = 'appearance-popup';
	}, 300);
};

const toggleLikeButton = (likeButton) => {
	likeButton.classList.toggle('card__like-button_activ');
};

const deleteCard = (closeButton) => {
	closeButton.closest('.card').remove();
};

const openPopupProfile = () => {
	inputName.value = profileName.textContent;
	inputProfession.value = profileProfession.textContent;
	openPopup(popupProfile);
}

const openPopupImage = (event) => {
	imgPopupImage.src = event.currentTarget.querySelector('.card__img').getAttribute('src');
	imgPopupImage.alt = event.currentTarget.querySelector('.card__img').getAttribute('alt');
	webpPopupImage.srcset = event.currentTarget.querySelector('.card__webp').getAttribute('srcset');
	captionPopupImage.textContent = event.currentTarget.closest('.card').querySelector('.card__text').textContent;
	event.stopPropagation();
	openPopup(popupImage);
}

const closeCurrentPopup = (event) => {
	closePopup(event.currentTarget.closest('.popup'));
	event.stopPropagation();
}

const toggleLikeCurrentButton = (event) => {
	toggleLikeButton(event.currentTarget);
	event.stopPropagation();
}

const deleteCurrentCard = (event) => {
	deleteCard(event.currentTarget);
	event.stopPropagation();
}

const createCard = (card) => {
	const newCard = cloneNodeTemplate(cardTemplate.content);
	newCard.querySelector('.card__text').textContent = card.placeName;
	newCard.querySelector('.card__img').src = card.srcLink;
	newCard.querySelector('.card__webp').srcset = card.srcsetLink;
	newCard.querySelector('.card__img').onerror = () => newCard.querySelector('.card__img').src = 'images/no-image.jpg';
	newCard.querySelector('.card__picture').addEventListener('click', (event) => openPopupImage(event));
	newCard.querySelector('.card__like-button').addEventListener('click', (event) => toggleLikeCurrentButton(event));
	newCard.querySelector('.card__trash-button').addEventListener('click', (event) => deleteCurrentCard(event));
	return newCard;
}

const loadInitialCards = () => {
	initialCards.forEach(initCard => {
		card.placeName = initCard.name;
		card.srcLink = initCard.src;
		card.srcsetLink = initCard.srcset;
		cardsBlock.prepend(createCard(card));
	});
}

editButton.addEventListener('click', openPopupProfile);

addCardButton.addEventListener('click', () => openPopup(popupCardForm));

popupCloseButtons.forEach(element => {
	element.addEventListener('click', (event) => {
		closeCurrentPopup(event)
	});
});

createCardForm.addEventListener('submit', (event) => {
	card.placeName = inputPlaceName.value;
	card.srcLink = inputSrcLink.value;
	card.srcsetLink = '';
	cardsBlock.prepend(createCard(card));
	inputPlaceName.value = '';
	inputSrcLink.value = '';
	closePopup(popupCardForm);
	event.preventDefault();
});

saveProfileForm.addEventListener('submit', () => {
	profileName.textContent = inputName.value;
	profileProfession.textContent = inputProfession.value;
	closePopup(popupProfile);
	event.preventDefault();
});

loadInitialCards();
