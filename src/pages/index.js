import './index.css';

import { apiConfig } from '../utils/apiConfig.js';

import {
	validationConfig,
	page,
	cardsBlock,
	cardTemplate,
	profilePicture,
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
import Section from '../components/section.js';
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
		.then(cardData => section.renderItem(cardData, cardData.owner._id))
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

const showNumberLikes = (button, card, numLikes) => {
	const likeNumber = card.querySelector(selectors.likeNumber);
	likeNumber.textContent = numLikes;
	if (numLikes === 0) {
		likeNumber.classList.add(selectors.likeNumberHidden);
		setTimeout(() => {
			button.classList.remove(selectors.likeButtonTop);
			button.removeAttribute('disabled');
		}, 200);
	}
	else {
		button.classList.add(selectors.likeButtonTop);
		setTimeout(() => {
			likeNumber.classList.remove(selectors.likeNumberHidden);
			button.removeAttribute('disabled');
		}, 200);
	}
}

const toggleLikeButton = (buttonElement, cardId) => {
	const cardElement = buttonElement.closest(selectors.card);
	buttonElement.setAttribute('disabled', true);
	if (buttonElement.classList.contains(selectors.likeButtonActive)) {
		api.deleteLike(cardId)
			.then((res) => {
				buttonElement.classList.remove(selectors.likeButtonActive);
				showNumberLikes(buttonElement, cardElement, res.likes.length);
			})
			.catch((err) => console.log(err))
			.finally(() => buttonElement.removeAttribute('disabled'));
	}
	else {
		api.putLike(cardId)
			.then(res => {
				buttonElement.classList.add(selectors.likeButtonActive);
				showNumberLikes(buttonElement, cardElement, res.likes.length);
			})
			.catch((err) => console.log(err))
			.finally(() => buttonElement.removeAttribute('disabled'));
	}
};

const handleCardClick = (evt, name, link) => {
	popupWithImage.open(name, link);
	evt.stopPropagation();
}

const handleLikeButtonClick = (evt, buttonElement, cardId) => {
	toggleLikeButton(buttonElement, cardId);
	evt.stopPropagation();
}

const handleTrashButtonClick = (evt, cardId, cardElement) => {
	popupDeleteCard.open(cardId, cardElement);
	evt.stopPropagation();
}

const cloneNodeTemplate = (template) => template.querySelector(selectors.card).cloneNode(true);

const renderer = (card, profileId) => {
	const newCard = cloneNodeTemplate(cardTemplate.content);
	const text = newCard.querySelector(selectors.cardText);
	const image = newCard.querySelector(selectors.cardImg);
	const picture = newCard.querySelector(selectors.cardPicture);
	const likeButton = newCard.querySelector(selectors.likeButton);
	const trashButton = newCard.querySelector(selectors.trashButton);
	text.textContent = card.name;
	image.src = card.link;
	image.onerror = () => { image.src = splashScreen }
	picture.addEventListener('click', evt => handleCardClick(evt, card.name, card.link));
	likeButton.addEventListener('click', evt => handleLikeButtonClick(evt, evt.currentTarget, card._id));
	trashButton.addEventListener('click', evt => handleTrashButtonClick(evt, card._id, evt.currentTarget.closest(selectors.card)));
	showNumberLikes(likeButton, newCard, card.likes.length);
	card.likes.forEach((element) => { if (element._id === profileId) { likeButton.classList.add(selectors.likeButtonActive) } });
	if (profileId !== card.owner._id) { trashButton.remove() }
	return newCard;
};

const section = new Section(renderer, cardsBlock);

// Исполняемый код

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
		cardsData = cardsData.reverse(); // меняем порядок, чтобы новые карточки добавлялись первыми
		section.renderInitialItems(cardsData, profileData._id);
	})
	.catch((err) => {
		console.log(err);
	});

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();