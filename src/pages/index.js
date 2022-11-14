import './index.css';
import { renderCard, splashScreen } from '../components/card.js';
import { enableValidation, deactivateButton } from '../components/validate.js';
import { closeCurrentPopup, openPopup, closePopup } from '../components/modal.js';

import {
	apiConfig,
	popupWindows,
	popupAvatar,
	avatarForm,
	profilePicture,
	profileAvatar,
	submitAvatar,
	inputLinkAvatar,
	errorLinkAvatar,
	cardsBlock,
	popupCardForm,
	popupDeletingCard,
	deleteСheckButton,
	cardForm,
	addCardButton,
	submitCardForm,
	inputPlaceName,
	inputLinkImg,
	errorPlaceName,
	errorLinkImg,
	popupProfile,
	profileForm,
	editButton,
	submitProfile,
	profileName,
	profileProfession,
	inputName,
	inputProfession,
	errorName,
	errorProfession,
	popupImage,
	imgPopupImage,
	captionPopupImage,
	selectors,
	validationConfig,
} from '../utils/constants.js';

// Импорт классов
import Api from '../components/api.js';
//import Card from '../components/сard.js';
//import Section from '../components/section.js';
//import UserInfo from '../components/userInfo.js';
//import PopupWithForm from '../components/popupWithForm.js';
//import FormValidator from '../components/formValidator.js';
import PopupWithImage from '../components/popupWithImage.js';
//import PopupDeleteCard from '../components/popupDeleteCard.js';

// Инициализация классов
export const api = new Api(apiConfig);
const popupWithImage = new PopupWithImage(selectors);

// Функция нужна, чтобы отключить некорректный показ ошибки валидации поля при повторном открытии попапа
const hideerror = (inputText, inputerror) => {
	if (inputerror.classList.contains(selectors.error)) {
		inputerror.classList.remove(selectors.error);
	}
	if (inputText.classList.contains(selectors.inputError)) {
		inputText.classList.remove(selectors.inputError);
	}
};

export const openPopupImage = (caption, link) => popupWithImage.open(caption, link);

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
	deleteСheckButton.addEventListener('click', () => {
		waitServerResponse(deleteСheckButton, 'Удаление...');
		api.deleteCard(card, id)
			.then(() => {
				closePopup(popupDeletingCard);
				card.remove();
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				restoreButtonState(deleteСheckButton, 'Да');
			});
	});
};

editButton.addEventListener('click', (event) => {
	inputName.value = profileName.textContent;
	inputProfession.value = profileProfession.textContent;
	hideerror(inputName, errorName);
	hideerror(inputProfession, errorProfession);
	openPopup(popupProfile);
	event.stopPropagation();
});

profilePicture.addEventListener('click', (event) => {
	openPopup(popupAvatar);
	if (!inputLinkAvatar.value) {
		deactivateButton(submitAvatar, selectors.inactiveButton);
		hideerror(inputLinkAvatar, errorLinkAvatar);
	}
	event.stopPropagation();
});

addCardButton.addEventListener('click', (event) => {
	openPopup(popupCardForm);
	if (!inputPlaceName.value && !inputLinkImg.value) {
		deactivateButton(submitCardForm, selectors.inactiveButton);
		hideerror(inputPlaceName, errorPlaceName);
		hideerror(inputLinkImg, errorLinkImg);
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
	api.sendNewCard(inputPlaceName.value, inputLinkImg.value)
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
	api.sendProfileInfo(inputName.value, inputProfession.value)
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
	api.sendAvatar(inputLinkAvatar.value)
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

Promise.all([api.getProfileInfo(), api.getCards()])
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