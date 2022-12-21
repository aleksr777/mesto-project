import './index.css';

// Настройки конфигурации API
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
import Card from '../components/card.js';
import Section from '../components/section.js';
import FormValidator from '../components/formValidator.js';
import UserInfo from '../components/userInfo.js';
import PopupWithForm from '../components/popupWithForm.js';
import PopupWithImage from '../components/popupWithImage.js';
import PopupDeleteCard from '../components/popupDeleteCard.js';


// Инициализация классов

const api = new Api(apiConfig);

// Заставка на случай, если картинка по ссылке не загрузится
const splashScreen = new URL('../images/no-image.svg', import.meta.url);

const profileFormValidator = new FormValidator(validationConfig, profileForm);
const cardFormValidator = new FormValidator(validationConfig, cardForm);
const avatarFormValidator = new FormValidator(validationConfig, avatarForm);

const userInfo = new UserInfo(selectors);

const popupWithImage = new PopupWithImage(selectors, popupImage, page, imgPopupImage, captionPopupImage, splashScreen);

const popupDeleteCard = new PopupDeleteCard(selectors, popupDeletingCard, page, (evt) => {
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

// показывает количество лайков (скрывает, если нет лайков)
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

// Обработчик клика по картинке с последующим открытием popup
const handleCardClick = (evt, name, link) => {
	popupWithImage.open(name, link);
	evt.stopPropagation();
}

// Обработчик клика кнопке 'Like'
const handleLikeButtonClick = (evt, buttonElement, cardId) => {
	toggleLikeButton(buttonElement, cardId);
	evt.stopPropagation();
}

// Обработчик клика кнопке удаления карточки
const handleTrashButtonClick = (evt, cardId, cardElement) => {
	popupDeleteCard.open(cardId, cardElement);
	evt.stopPropagation();
}

const card = new Card(selectors, cardTemplate, handleCardClick, handleLikeButtonClick, handleTrashButtonClick, showNumberLikes);

const renderer = (data, profileId, splashScreen) => { 
	// без вложенности не удаётся передать 'card.renderer' в качестве аргумента
	 return card.renderer(data, profileId, splashScreen);
}

const section = new Section(renderer, cardsBlock, splashScreen);


// Исполняемый код //

// Слушатель на нопку редактирования профиля
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

// Слушатель на нопку редактирования аватара профиля
profilePicture.addEventListener('click', (evt) => {
	avatarPopup.open();
	avatarFormValidator.clearMistakes();
	avatarFormValidator.disableButtonState();
	evt.stopPropagation();
});

// Слушатель на нопку добавления новой карточки
addCardButton.addEventListener('click', (evt) => {
	addCardPopup.open();
	cardFormValidator.clearMistakes();
	cardFormValidator.disableButtonState();
	evt.stopPropagation();
});

// Загрузка и прорисовка компонентов на странице при загрузке страницы и после загрузки данных с сервера 
Promise.all([api.getProfileInfo(), api.getCards()])
	.then(([profileData, cardsData]) => {
		userInfo.setUserInfo(profileData);
		cardsData = cardsData.reverse(); // меняем порядок, чтобы новые карточки добавлялись первыми
		section.renderInitialItems(cardsData, profileData._id);
	})
	.catch((err) => {
		console.log(err);
	});

// Включение валидации для форм
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();