import { enableValidation } from './validate.js';
import { loadInitialCards, loadCardInfo } from './card.js';
import { openPopup, closePopup } from './utils.js';
import { popupCloseButtons, popupProfile, popupCardForm, popupImage, createCardForm, saveProfileForm, inputName, inputProfession, profileName, profileProfession, imgPopupImage, webpPopupImage, captionPopupImage, openPopupProfile, closeCurrentPopup } from './modal.js';

const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

editButton.addEventListener('click', openPopupProfile);

addCardButton.addEventListener('click', () => openPopup(popupCardForm));

popupCloseButtons.forEach(element => {
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

enableValidation();

loadInitialCards();