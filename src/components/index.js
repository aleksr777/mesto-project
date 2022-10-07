import '../pages/index.css';

import { enableValidation, deactivateButton } from './validate.js';
import { inputPlaceName, inputLinkImg } from './card.js';
import { popupWindows, popupCardForm, popupProfile, popupAvatar, inputName, inputProfession, profileName, profileProfession, profileAvatar, openPopupProfile, openPopupAvatar, closeCurrentPopup, submitCardForm, submitProfile, submitAvatar, createCardForm, saveProfileForm, saveAvatar, inputLinkAvatar } from './modal.js';
import { openPopup, closePopup } from './utils.js';
import { getInitialCards, sendNewCard, sendProfileInfo, sendAvatar, getProfileInfo } from './api.js';

const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const profilePicture = document.querySelector('.profile__picture');

let profileId;

const waitServerResponse = (button, text) => {
	button.textContent = text;
	button.setAttribute('disabled', true);
}

const restoreButtonState = (button, text) => {
	setTimeout(() => {
		button.textContent = text;
		button.removeAttribute('disabled');
	}, 300);
}

const handleProfileInfo = (arr) => {
	profileName.textContent = arr.name;
	profileProfession.textContent = arr.about;
	profileAvatar.src = arr.avatar;
	profileId = arr._id;
}

const updateProfileInfo = () => {
	closePopup(popupProfile);
	profileName.textContent = inputName.value;
	profileProfession.textContent = inputProfession.value;
	restoreButtonState(submitProfile, 'Сохранить');
}

const updateAvatar = (link) => {
	closePopup(popupAvatar);
	profileAvatar.src = link;
	restoreButtonState(submitAvatar, 'Сохранить');
}

editButton.addEventListener('click', (event) => openPopupProfile(event));

profilePicture.addEventListener('click', (event) => openPopupAvatar(event));

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

createCardForm.addEventListener('submit', (event) => {
	event.preventDefault(); 
	waitServerResponse(submitCardForm, 'Сохранение...');
	sendNewCard(inputPlaceName.value, inputLinkImg.value);
});

saveProfileForm.addEventListener('submit', (event) => {
	event.preventDefault();
	waitServerResponse(submitProfile, 'Сохранение...');
	sendProfileInfo(inputName.value, inputProfession.value);
});

saveAvatar.addEventListener('submit', (event) => {
	event.preventDefault();
	waitServerResponse(submitAvatar, 'Сохранение...');
	sendAvatar(inputLinkAvatar.value);
});

enableValidation({
	formSelector: '.form',
	inputSelector: '.form__input-text',
	submitButtonSelector: '.form__submit',
	inactiveButtonClass: 'form__submit_inactive',
	inputErrorClass: 'form__input-text_type_error',
	errorClass: 'form__input-error'
});

getProfileInfo();
getInitialCards();

export { handleProfileInfo, profileId, updateProfileInfo, updateAvatar, restoreButtonState };