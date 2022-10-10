import '../pages/index.css';
import { createCard, splashScreen } from './card.js';
import { enableValidation, deactivateButton } from './validate.js';
import { closeCurrentPopup, openPopup, closePopup } from './modal.js';
import { deleteCardOnServer, getInitialCards, sendNewCard, sendProfileInfo, sendAvatar, getProfileInfo } from './api.js';

const popupWindows = document.querySelectorAll('.popup');

const popupAvatar = document.querySelector('.popup_type_user-img');
const avatarForm = document.querySelector('.form_type_user-img');
const profilePicture = document.querySelector('.profile__picture');
const profileAvatar = document.querySelector('.profile__img');
const submitAvatar = document.querySelector('.form__submit_type_avatar');
const inputLinkAvatar = document.querySelector('#user-img-link-input');
const ErrorLinkAvatar = document.querySelector('.user-img-link-input-error');

const cardsBlock = document.querySelector('.cards-block');
const popupCardForm = document.querySelector('.popup_type_card-form');
const popupDeletingCard = document.querySelector('.popup_type_deleting-card');
const deletionConfirmationButton = document.querySelector('.form__submit_type_deleting-card');
const cardForm = document.querySelector('.form_type_card-form');
const addCardButton = document.querySelector('.profile__add-button');
const submitCardForm = document.querySelector('.form__submit_type_card-form');
const inputPlaceName = document.querySelector('#card-name-input');
const inputLinkImg = document.querySelector('#card-link-input');
const ErrorPlaceName = document.querySelector('.card-name-input-error');
const ErrorLinkImg = document.querySelector('.card-link-input-error');

const popupProfile = document.querySelector('.popup_type_profile');
const profileForm = document.querySelector('.form_type_profile');
const editButton = document.querySelector('.profile__edit-button');
const submitProfile = document.querySelector('.form__submit_type_profile');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const inputName = document.querySelector('#profile-name-input');
const inputProfession = document.querySelector('#profile-profession-input');
const ErrorName = document.querySelector('.profile-name-input-error');
const ErrorProfession = document.querySelector('.profile-profession-input-error');

const popupImage = document.querySelector('.popup_type_image');
const imgPopupImage = popupImage.querySelector('.popup__img');
const captionPopupImage = popupImage.querySelector('.popup__caption');

let arrProfileInfo = [];
let arrInitialCards = [];

// Функция нужна, чтобы отключить некорректный показ ошибки валидации поля при повторном открытии попапа
const hideError = (inputText, inputError) => {
	if (inputError.classList.contains('form__input-error_active')) {
		inputError.classList.remove('form__input-error_active');
	}
	if (inputText.classList.contains('form__input-text_type_error')) {
		inputText.classList.remove('form__input-text_type_error');
	}
};

const openPopupImage = (name, link) => {
	imgPopupImage.src = link;
	captionPopupImage.textContent = name;
	openPopup(popupImage);
};

const waitServerResponse = (button, text) => {
	button.textContent = text;
	button.setAttribute('disabled', true);
};

const restoreButtonState = (button, text) => {
	setTimeout(() => {
		button.textContent = text;
		button.removeAttribute('disabled');
	}, 300);
};

const openPopupDeletion = (button, id) => {
	const card = button.closest('.card');
	openPopup(popupDeletingCard);
	deletionConfirmationButton.addEventListener('click', () => {
		waitServerResponse(deletionConfirmationButton, 'Удаление...');
		deleteCardOnServer(card, id)
			.then(() => {
				closePopup(popupDeletingCard);
				card.remove();
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				restoreButtonState(deletionConfirmationButton, 'Да');
			});
	});
};

editButton.addEventListener('click', (event) => {
	inputName.value = profileName.textContent;
	inputProfession.value = profileProfession.textContent;
	hideError(inputName, ErrorName);
	hideError(inputProfession, ErrorProfession);
	openPopup(popupProfile);
	event.stopPropagation();
});

profilePicture.addEventListener('click', (event) => {
	openPopup(popupAvatar);
	if (!inputLinkAvatar.value) {
		deactivateButton(submitAvatar, 'form__submit_inactive');
		hideError(inputLinkAvatar, ErrorLinkAvatar);
	}
	event.stopPropagation();
});

addCardButton.addEventListener('click', (event) => {
	openPopup(popupCardForm);
	if (!inputPlaceName.value && !inputLinkImg.value) {
		deactivateButton(submitCardForm, 'form__submit_inactive');
		hideError(inputPlaceName, ErrorPlaceName);
		hideError(inputLinkImg, ErrorLinkImg);
	}
	event.stopPropagation();
});

/* addCardButton.addEventListener('click', (event) => {} */

popupWindows.forEach(element => {
	element.addEventListener('click', (event) => {
		closeCurrentPopup(event)
	});
});

cardForm.addEventListener('submit', (event) => {
	event.preventDefault();
	waitServerResponse(submitCardForm, 'Сохранение...');
	sendNewCard(inputPlaceName.value, inputLinkImg.value)
		.then((res) => {
			closePopup(popupCardForm);
			inputPlaceName.value = '';
			inputLinkImg.value = '';
			let newCard = {
				name: res.name,
				link: res.link,
				likes: res.likes,
				_id: res._id,
				owner: res.owner
			}
			cardsBlock.prepend(createCard(newCard, splashScreen, res.owner._id));
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			restoreButtonState(submitCardForm, 'Сохранить');
		});
});

profileForm.addEventListener('submit', (event) => {
	event.preventDefault();
	waitServerResponse(submitProfile, 'Сохранение...');
	sendProfileInfo(inputName.value, inputProfession.value)
		.then(() => {
			closePopup(popupProfile);
			profileName.textContent = inputName.value;
			profileProfession.textContent = inputProfession.value;
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			restoreButtonState(submitProfile, 'Сохранить');
		});
});

avatarForm.addEventListener('submit', (event) => {
	event.preventDefault();
	waitServerResponse(submitAvatar, 'Сохранение...');
	sendAvatar(inputLinkAvatar.value)
		.then(() => {
			closePopup(popupAvatar);
			profileAvatar.src = inputLinkAvatar.value;
			inputLinkAvatar.value = '';
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			restoreButtonState(submitAvatar, 'Сохранить');
		});
});

Promise.all([
	getProfileInfo()
		.then((res) => {
			arrProfileInfo = res;
		})
		.catch((err) => {
			console.log(err);
		}),
	getInitialCards()
		.then((res) => {
			arrInitialCards = res;
		})
		.catch((err) => {
			console.log(err);
		})
])
	.then(() => {
		profileName.textContent = arrProfileInfo.name;
		profileProfession.textContent = arrProfileInfo.about;
		profileAvatar.src = arrProfileInfo.avatar;
		arrInitialCards = arrInitialCards.reverse()
		arrInitialCards.forEach(card => {
			cardsBlock.prepend(createCard(card, splashScreen, arrProfileInfo._id));
		});
		arrInitialCards.splice(0, arrInitialCards.length);
	})
	.catch((err) => {
		console.log(err);
	});

enableValidation({
	formSelector: '.form',
	inputSelector: '.form__input-text',
	submitButtonSelector: '.form__submit',
	inactiveButtonClass: 'form__submit_inactive',
	inputErrorClass: 'form__input-text_type_error',
	errorClass: 'form__input-error'
});

export { openPopupImage, openPopupDeletion };