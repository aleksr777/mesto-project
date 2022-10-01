import '../pages/index.css';

import { enableValidation, deactivateButton } from './validate.js';
import { loadInitialCards, loadCardInfo } from './card.js';
import { openPopup, closePopup } from './utils.js';
import { popupWindows, popupProfile, popupCardForm, createCardForm, saveProfileForm, inputName, inputProfession, profileName, profileProfession, openPopupProfile, closeCurrentPopup } from './modal.js';

const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

editButton.addEventListener('click', (event) => openPopupProfile(event));

addCardButton.addEventListener('click', () => {
	openPopup(popupCardForm);
	const submit = popupCardForm.querySelector('.form__submit');
	const name = popupCardForm.querySelector('#card-name-input').value;
	const link = popupCardForm.querySelector('#card-link-input').value;
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
	loadCardInfo();
	closePopup(popupCardForm);
	event.preventDefault();
});

saveProfileForm.addEventListener('submit', (event) => {
	profileName.textContent = inputName.value;
	profileProfession.textContent = inputProfession.value;
	closePopup(popupProfile);
	event.preventDefault();
});

loadInitialCards();

enableValidation({
	formSelector: '.form',
	inputSelector: '.form__input-text',
	submitButtonSelector: '.form__submit',
	inactiveButtonClass: 'form__submit_inactive',
	inputErrorClass: 'form__input-text_type_error',
	errorClass: 'form__input-error'
});