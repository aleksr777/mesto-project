import './index.css';
import { renderCard, splashScreen } from '../components/card.js';
import { enableValidation, deactivateButton } from '../components/validate.js';

import {
	apiConfig,
	profilePicture,
	submitAvatar,
	inputLinkAvatar,
	errorLinkAvatar,
	cardsBlock,
	addCardButton,
	submitCardForm,
	inputPlaceName,
	inputLinkImg,
	errorPlaceName,
	errorLinkImg,
	editButton,
	inputName,
	inputProfession,
	errorName,
	errorProfession,
	popupImage,
	imgPopupImage,
	captionPopupImage,
	popupDeletingCard,
	popupProfile,
	selectors,
	validationConfig,
	popupCardForm,
	popupAvatar
} from '../utils/constants.js';

// Импорт классов
import Api from '../components/api.js';
//import Card from '../components/сard.js';
//import Section from '../components/section.js';
//import FormValidator from '../components/formValidator.js';
import UserInfo from '../components/userInfo.js';
import PopupWithForm from '../components/popupWithForm.js';
import PopupWithImage from '../components/popupWithImage.js';
import PopupDeleteCard from '../components/popupDeleteCard.js';

// Инициализация классов
export const api = new Api(apiConfig);

const userInfo = new UserInfo(selectors);

export const popupWithImage = new PopupWithImage(selectors, popupImage, imgPopupImage, captionPopupImage);

export const popupDeleteCard = new PopupDeleteCard(selectors, popupDeletingCard, (evt) => {
	evt.preventDefault();
	popupDeleteCard.isLoading(true);
	api.deleteCard(popupDeleteCard.getIdCard())
		.then(() => { popupDeleteCard.delete(); popupDeleteCard.close(); })
		.catch(err => console.log(err))
		.finally(() => popupDeleteCard.isLoading(false));
});

const profilePopup = new PopupWithForm(selectors, popupProfile, (evt) => {
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

const addCardPopup = new PopupWithForm(selectors, popupCardForm, (evt) => {
	evt.preventDefault();
	addCardPopup.isLoading(true);
	const inputValues = addCardPopup.getFormValues();
	api.sendNewCard(inputValues.cardNameInput, inputValues.cardLinkInput)
		.then((data) => cardsBlock.prepend(renderCard(data, splashScreen, data.owner._id)))
		.then(() => addCardPopup.close())
		.catch(err => console.log(err))
		.finally(() => addCardPopup.isLoading(false));
});

const avatarPopup = new PopupWithForm(selectors, popupAvatar, (evt) => {
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


// Функция нужна, чтобы отключить некорректный показ ошибки валидации поля при повторном открытии попапа
const hideerror = (inputText, inputerror) => {
	if (inputerror.classList.contains(selectors.error)) {
		inputerror.classList.remove(selectors.error);
	}
	if (inputText.classList.contains(selectors.inputError)) {
		inputText.classList.remove(selectors.inputError);
	}
};

editButton.addEventListener('click', (evt) => {
	profilePopup.open();
	hideerror(inputName, errorName);
	hideerror(inputProfession, errorProfession);
	api.getProfileInfo()
		.then((data) => {
			userInfo.setInput(userInfo.getUserInfo(data));
		})
		.catch((err) => {
			console.log(err);
		})
	evt.stopPropagation();
});

profilePicture.addEventListener('click', (evt) => {
	avatarPopup.open();
	if (!inputLinkAvatar.value) {
		deactivateButton(submitAvatar, selectors.inactiveButton);
		hideerror(inputLinkAvatar, errorLinkAvatar);
	}
	evt.stopPropagation();
});

addCardButton.addEventListener('click', (evt) => {
	addCardPopup.open();
	if (!inputPlaceName.value && !inputLinkImg.value) {
		deactivateButton(submitCardForm, selectors.inactiveButton);
		hideerror(inputPlaceName, errorPlaceName);
		hideerror(inputLinkImg, errorLinkImg);
	}
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

enableValidation(validationConfig);