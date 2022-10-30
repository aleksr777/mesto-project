import './index.css';

import { renderCard, splashScreen } from '../components/card.js';
import { enableValidation, deactivateButton } from '../components/validate.js';
import { closeCurrentPopup, openPopup, closePopup } from '../components/modal.js';
import { deleteCardOnServer, getInitialCards, sendNewCard, sendProfileInfo, sendAvatar, getProfileInfo } from '../components/api.js';

import {
	popupWindows,
	popupAvatar,
	avatarForm,
	profilePicture,
	profileAvatar,
	submitAvatar,
	inputLinkAvatar,
	ErrorLinkAvatar,
	cardsBlock,
	popupCardForm,
	popupDeletingCard,
	deletionConfirmationButton,
	cardForm,
	addCardButton,
	submitCardForm,
	inputPlaceName,
	inputLinkImg,
	ErrorPlaceName,
	ErrorLinkImg,
	popupProfile,
	profileForm,
	editButton,
	submitProfile,
	profileName,
	profileProfession,
	inputName,
	inputProfession,
	ErrorName,
	ErrorProfession,
	popupImage,
	imgPopupImage,
	captionPopupImage,
	validationConfig,
} from '../utils/constants.js';

// Функция нужна, чтобы отключить некорректный показ ошибки валидации поля при повторном открытии попапа
const hideError = (inputText, inputError) => {
	if (inputError.classList.contains('form__input-error_active')) {
		inputError.classList.remove('form__input-error_active');
	}
	if (inputText.classList.contains('form__input-text_type_error')) {
		inputText.classList.remove('form__input-text_type_error');
	}
};

export const openPopupImage = (name, link) => {
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
	}, 600);
};

export const openPopupDeletion = (button, id) => {
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
			cardsBlock.prepend(renderCard(newCard, splashScreen, res.owner._id));
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

Promise.all([getProfileInfo(), getInitialCards()])
	.then(([profile, cards]) => {
		profileName.textContent = profile.name;
		profileProfession.textContent = profile.about;
		profileAvatar.src = profile.avatar;
		cards = cards.reverse()
		cards.forEach(card => {
			cardsBlock.prepend(renderCard(card, splashScreen, profile._id));
		});
	})
	.catch((err) => {
		console.log(err);
	});

enableValidation(validationConfig);