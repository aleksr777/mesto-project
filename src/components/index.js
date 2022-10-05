import '../pages/index.css';
import { enableValidation, deactivateButton } from './validate.js';
import { loadCardInfo } from './card.js';
import { openPopup, closePopup } from './utils.js';
import { popupWindows, popupProfile, popupCardForm, createCardForm, saveProfileForm, inputName, inputProfession, profileName, profileProfession, profileAvatar, openPopupProfile, closeCurrentPopup } from './modal.js';
import { getInitialCards, sendProfileInfo, getProfileInfo } from './api.js';

const submit = popupCardForm.querySelector('.form__submit');
const name = popupCardForm.querySelector('#card-name-input').value;
const link = popupCardForm.querySelector('#card-link-input').value;

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
	if (!name && !link) {
		deactivateButton(submit, 'form__submit_inactive');
	}
});

popupWindows.forEach(element => {
	element.addEventListener('click', (event) => {
		closeCurrentPopup(event)
	});
});

createCardForm.addEventListener('submit', (event) => {
	event.preventDefault();
	loadCardInfo();
	closePopup(popupCardForm);
});

saveProfileForm.addEventListener('submit', (event) => {
	event.preventDefault();
	profileName.textContent = inputName.value;
	profileProfession.textContent = inputProfession.value;
	sendProfileInfo(inputName.value, inputProfession.value);
	closePopup(popupProfile);
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