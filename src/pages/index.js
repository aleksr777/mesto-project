import './index.css';

import { apiConfig } from '../utils/apiConfig.js';

import { renderCard } from '../components/card777.js';

import {
	validationConfig,
	page,
	profilePicture,
	cardsBlock,
	addCardButton,
	editButton,
	popupImage,
	imgPopupImage,
	captionPopupImage,
	popupDeletingCard,
	popupProfile,
	selectors,
	popupCardForm,
	popupAvatar,
	profileForm,
	cardForm,
	avatarForm
} from '../utils/constants.js';

// Импорт классов
import Api from '../components/api.js';
//import Card from '../components/сard.js';
//import Section from '../components/section.js';
import FormValidator from '../components/formValidator.js';
import UserInfo from '../components/userInfo.js';
import PopupWithForm from '../components/popupWithForm.js';
import PopupWithImage from '../components/popupWithImage.js';
import PopupDeleteCard from '../components/popupDeleteCard.js';

// Инициализация классов
export const api = new Api(apiConfig);

export const splashScreen = new URL('../images/no-image.jpg', import.meta.url);

const profileFormValidator = new FormValidator(validationConfig, profileForm);
const cardFormValidator = new FormValidator(validationConfig, cardForm);
const avatarFormValidator = new FormValidator(validationConfig, avatarForm);

const userInfo = new UserInfo(selectors);

export const popupWithImage = new PopupWithImage(selectors, popupImage, page, imgPopupImage, captionPopupImage);

export const popupDeleteCard = new PopupDeleteCard(selectors, popupDeletingCard, page, (evt) => {
	evt.preventDefault();
	popupDeleteCard.isLoading(true);
	api.deleteCard(popupDeleteCard.getIdCard())
		.then(() => { popupDeleteCard.delete(); popupDeleteCard.close(); })
		.catch(err => console.log(err))
		.finally(() => popupDeleteCard.isLoading(false));
});

const profilePopup = new PopupWithForm(selectors, popupProfile, page, (evt) => {
	evt.preventDefault();
	profilePopup.isLoading(true);
	const inputValues = profilePopup.getFormValues();
	api.sendProfileInfo(inputValues.profileNameInput, inputValues.profileProfessionInput)
		.then(data => {
			userInfo.setUserNameProfession(userInfo.getUserInfo(data));
		})
		.then(() => profilePopup.close())
		.catch(err => console.log(err))
		.finally(() => profilePopup.isLoading(false));
});

const addCardPopup = new PopupWithForm(selectors, popupCardForm, page, (evt) => {
	evt.preventDefault();
	addCardPopup.isLoading(true);
	const inputValues = addCardPopup.getFormValues();
	api.sendNewCard(inputValues.cardNameInput, inputValues.cardLinkInput)
		.then((data) => cardsBlock.prepend(renderCard(data, splashScreen, data.owner._id)))
		.then(() => addCardPopup.close())
		.catch(err => console.log(err))
		.finally(() => addCardPopup.isLoading(false));
});

const avatarPopup = new PopupWithForm(selectors, popupAvatar, page, (evt) => {
	evt.preventDefault();
	avatarPopup.isLoading(true);
	const inputValue = avatarPopup.getFormValues();
	api.sendAvatar(inputValue.userImgLinkInput)
		.then(data => {
			userInfo.setUserAvatar(userInfo.getUserInfo(data));
		})
		.then(() => avatarPopup.close())
		.catch(err => console.log(err))
		.finally(() => avatarPopup.isLoading(false));
});

editButton.addEventListener('click', (evt) => {
	profilePopup.open();
	profilePopup.setBeforeServerResponse();
	profileFormValidator.clearMistakes();
	profileFormValidator.disableButtonState();
	api.getProfileInfo()
		.then((data) => {
			profilePopup.setAfterServerResponse();
			userInfo.setInput(userInfo.getUserInfo(data));
		})
		.catch((err) => {
			console.log(err);
		})
	evt.stopPropagation();
});

profilePicture.addEventListener('click', (evt) => {
	avatarPopup.open();
	avatarFormValidator.clearMistakes();
	avatarFormValidator.disableButtonState();
	evt.stopPropagation();
});

addCardButton.addEventListener('click', (evt) => {
	addCardPopup.open();
	cardFormValidator.clearMistakes();
	cardFormValidator.disableButtonState();
	evt.stopPropagation();
});

Promise.all([api.getProfileInfo(), api.getCards()])
	.then(([profileData, cardsData]) => {
		userInfo.setUserInfo(profileData);
		cardsData = cardsData.reverse()
		cardsData.forEach(card => {
			cardsBlock.prepend(renderCard(card, splashScreen, profileData._id));
		});
	})
	.catch((err) => {
		console.log(err);
	});

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();