import '../pages/index.css';
import { enableValidation, deactivateButton } from './validate.js';
import { removeCards, inputPlaceName, inputlink } from './card.js';
import { openPopup, closePopup } from './utils.js';
import { popupWindows, popupProfile, popupCardForm, createCardForm, saveProfileForm, inputName, inputProfession, profileName, profileProfession, profileAvatar, openPopupProfile, closeCurrentPopup, submitCardForm, submitProfile } from './modal.js';
import { getInitialCards, sendNewCard, sendProfileInfo, getProfileInfo } from './api.js';

const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

let profileId;

const handleProfileInfo = (arr) => {
	profileName.textContent = arr.name;
	profileProfession.textContent = arr.about;
	profileAvatar.src = arr.avatar;
	profileId = arr._id;
}

editButton.addEventListener('click', (event) => openPopupProfile(event));

addCardButton.addEventListener('click', () => {
	openPopup(popupCardForm);
	if (!inputPlaceName.value && !inputlink.value) {
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
	submitCardForm.textContent = 'Сохранение...';
	submitCardForm.setAttribute('disabled', true);
	sendNewCard(inputPlaceName.value, inputlink.value);
});

saveProfileForm.addEventListener('submit', (event) => {
	event.preventDefault();
	submitProfile.textContent = 'Сохранение...';
	submitProfile.setAttribute('disabled', true);
	sendProfileInfo(inputName.value, inputProfession.value);
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

export { handleProfileInfo, profileId };