import '../pages/index.css';
import { updateCards, putLikeLocal, deleteLikeLocal } from './card.js';
import { loadInitialCards } from './card.js';
import { enableValidation, deactivateButton } from './validate.js';
import { closeCurrentPopup, openPopup, closePopup } from './modal.js';
import { getInitialCards, sendNewCard, sendProfileInfo, sendAvatar, getProfileInfo } from './api.js';

const popupWindows = document.querySelectorAll('.popup');

const popupAvatar = document.querySelector('.popup_type_user-img');
const avatarForm = document.querySelector('.form_type_user-img');
const profilePicture = document.querySelector('.profile__picture');
const profileAvatar = document.querySelector('.profile__img');
const submitAvatar = document.querySelector('.form__submit_type_avatar');
const inputLinkAvatar = document.querySelector('#user-img-link-input');

const popupCardForm = document.querySelector('.popup_type_card-form');
const cardForm = document.querySelector('.form_type_card-form');
const addCardButton = document.querySelector('.profile__add-button');
const submitCardForm = document.querySelector('.form__submit_type_card-form');
const inputPlaceName = document.querySelector('#card-name-input');
const inputLinkImg = document.querySelector('#card-link-input');

const popupProfile = document.querySelector('.popup_type_profile');
const profileForm = document.querySelector('.form_type_profile');
const editButton = document.querySelector('.profile__edit-button');
const submitProfile = document.querySelector('.form__submit_type_profile');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const inputName = document.querySelector('#profile-name-input');
const inputProfession = document.querySelector('#profile-profession-input');

const popupImage = document.querySelector('.popup_type_image');
const imgPopupImage = popupImage.querySelector('.popup__img');
const captionPopupImage = popupImage.querySelector('.popup__caption');

let profileId;

const openPopupProfile = (event) => {
	inputName.value = profileName.textContent;
	inputProfession.value = profileProfession.textContent;
	openPopup(popupProfile);
	event.stopPropagation();
}

const openPopupImage = (event) => {
	imgPopupImage.src = event.currentTarget.querySelector('.card__img').getAttribute('src');
	imgPopupImage.alt = event.currentTarget.querySelector('.card__img').getAttribute('alt');
	captionPopupImage.textContent = event.currentTarget.closest('.card').querySelector('.card__text').textContent;
	openPopup(popupImage);
	event.stopPropagation();
}

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

editButton.addEventListener('click', (event) => openPopupProfile(event));

profilePicture.addEventListener('click', () => openPopup(popupAvatar));

addCardButton.addEventListener('click', () => {
	openPopup(popupCardForm);
	if (!inputPlaceName.value && !inputLinkImg.value) {
		deactivateButton(submitCardForm, 'form__submit_inactive');
	}
});

popupWindows.forEach(element => {
	element.addEventListener('click', (event) => {
		closeCurrentPopup(event)
	});
});

cardForm.addEventListener('submit', (event) => {
	event.preventDefault();
	waitServerResponse(submitCardForm, 'Сохранение...');
	sendNewCard(inputPlaceName.value, inputLinkImg.value)
		.then(res => {
			if (res.ok) {
				closePopup(popupCardForm);
				console.log(res);
			}
			else {
				return Promise.reject(`Ошибка: ${res.status}`);
			}
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
		.then(res => {
			if (res.ok) {
				closePopup(popupProfile);
				profileName.textContent = inputName.value;
				profileProfession.textContent = inputProfession.value;
			}
			else {
				return Promise.reject(`Ошибка: ${res.status}`);
			}
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
		.then(res => {
			if (res.ok) {
				closePopup(popupAvatar);
				profileAvatar.src = inputLinkAvatar.value;
				inputLinkAvatar.value = '';
			}
			else {
				return Promise.reject(`Ошибка: ${res.status}`);
			}
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			restoreButtonState(submitAvatar, 'Сохранить');
		});
});

enableValidation({
	formSelector: '.form',
	inputSelector: '.form__input-text',
	submitButtonSelector: '.form__submit',
	inactiveButtonClass: 'form__submit_inactive',
	inputErrorClass: 'form__input-text_type_error',
	errorClass: 'form__input-error'
});

getProfileInfo()
	.then((res) => {
		profileName.textContent = res.name;
		profileProfession.textContent = res.about;
		profileAvatar.src = res.avatar;
		profileId = res._id;
	})
	.catch((err) => {
		console.log(err);
	});

getInitialCards()
	.then((res) => {
		loadInitialCards(res);
	})
	.catch((err) => {
		console.log(err);
	});

export { profileId, restoreButtonState, submitCardForm, submitProfile, submitAvatar, openPopupImage, popupCardForm };