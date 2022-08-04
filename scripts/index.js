const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const createCardForm = document.querySelector('.form_type_card-form');
const saveProfileForm = document.querySelector('.form_type_profile');

const popupProfile = document.querySelector('.popup_type_profile');
const popupCardForm = document.querySelector('.popup_type_card-form');
const popupImage = document.querySelector('.popup_type_image');

const inputName = document.querySelector('#edit-input-name');
const inputProfession = document.querySelector('#edit-input-profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

const inputPlaceName = document.querySelector('#add-card-input-name');
const inputSrcLink = document.querySelector('#add-card-input-link');

const popupCloseButtons = document.querySelectorAll('.popup__close-button');

const imgPopupImage = popupImage.querySelector('.popup__img');
const webpPopupImage = popupImage.querySelector('.popup__webp');
const captionPopupImage = popupImage.querySelector('.popup__caption');

const cardsBlock = document.querySelector('.cards-block');
const cardTemplate = document.querySelector('#card-template');
const cloneNodeTemplate = (template) => template.querySelector('.cards-block__card').cloneNode(true);

const card = {
	placeName: '',
	srcLink: '',
	srcsetLink: '',
};

const initialCards = [
	{
		name: 'Камчатка',
		srcset: 'images/kamchatka.webp',
		src: 'images/kamchatka.jpg'
	},
	{
		name: 'Гора Эльбрус',
		srcset: 'images/mountain-elbrus.webp',
		src: 'images/mountain-elbrus.jpg'
	},
	{
		name: 'Домбай',
		srcset: 'images/dombai.webp',
		src: 'images/dombai.jpg'
	},
	{
		name: 'Озеро Байкал',
		srcset: 'images/baikal.webp',
		src: 'images/baikal.jpeg'
	},
	{
		name: 'Столбы выветривания – Маньпупунер',
		srcset: 'images/stolby-vyvetrivaniya.webp',
		src: 'images/stolby-vyvetrivaniya.jpg'
	},
	{
		name: 'Карачаево-Черкессия',
		srcset: 'images/karachaevsk.webp',
		src: 'images/karachaevsk.jpg'
	}
];

const openPopup = (popup) => {
	popup.classList.add('popup_opened');
};

const closePopup = (popup) => {
	popup.style.animationName = 'close-popup';
	popup.style.playState = 'running';
	setTimeout(() => {
		popup.classList.remove('popup_opened');
		popup.style.animationName = 'appearance-popup';
	}, 300);
};

const toggleLikeButton = (likeButton) => {
	likeButton.classList.toggle('card__like-button_activ');
};

const deleteCard = (closeButton) => {
	closeButton.closest('.card').remove();
};

const openPopupProfile = () => {
	inputName.value = profileName.textContent;
	inputProfession.value = profileProfession.textContent;
	openPopup(popupProfile);
}

const openPopupImage = (event) => {
	imgPopupImage.src = event.currentTarget.querySelector('.card__img').getAttribute('src');
	imgPopupImage.alt = event.currentTarget.querySelector('.card__img').getAttribute('alt');
	webpPopupImage.srcset = event.currentTarget.querySelector('.card__webp').getAttribute('srcset');
	captionPopupImage.textContent = event.currentTarget.closest('.card').querySelector('.card__text').textContent;
	event.stopPropagation();
	openPopup(popupImage);
}

const closeCurrentPopup = (event) => {
	closePopup(event.currentTarget.closest('.popup'));
	event.stopPropagation();
}

const toggleLikeCurrentButton = (event) => {
	toggleLikeButton(event.currentTarget);
	event.stopPropagation();
}

const deleteCurrentCard = (event) => {
	deleteCard(event.currentTarget);
	event.stopPropagation();
}

const createCard = (card) => {
	const newCard = cloneNodeTemplate(cardTemplate.content);
	newCard.querySelector('.card__text').textContent = card.placeName;
	newCard.querySelector('.card__img').src = card.srcLink;
	newCard.querySelector('.card__webp').srcset = card.srcsetLink;
	newCard.querySelector('.card__img').onerror = () => newCard.querySelector('.card__img').src = 'images/no-image.jpg';
	newCard.querySelector('.card__picture').addEventListener('click', (event) => openPopupImage(event));
	newCard.querySelector('.card__like-button').addEventListener('click', (event) => toggleLikeCurrentButton(event));
	newCard.querySelector('.card__trash-button').addEventListener('click', (event) => deleteCurrentCard(event));
	return newCard;
}

const loadInitialCards = () => {
	initialCards.forEach(initCard => {
		card.placeName = initCard.name;
		card.srcLink = initCard.src;
		card.srcsetLink = initCard.srcset;
		cardsBlock.prepend(createCard(card));
	});
}

editButton.addEventListener('click', openPopupProfile);

addCardButton.addEventListener('click', () => openPopup(popupCardForm));

popupCloseButtons.forEach(element => {
	element.addEventListener('click', (event) => {
		closeCurrentPopup(event)
	});
});

createCardForm.addEventListener('submit', (event) => {
	card.placeName = inputPlaceName.value;
	card.srcLink = inputSrcLink.value;
	card.srcsetLink = '';
	cardsBlock.prepend(createCard(card));
	inputPlaceName.value = '';
	inputSrcLink.value = '';
	closePopup(popupCardForm);
	event.preventDefault();
});

saveProfileForm.addEventListener('submit', () => {
	profileName.textContent = inputName.value;
	profileProfession.textContent = inputProfession.value;
	closePopup(popupProfile);
	event.preventDefault();
});

loadInitialCards();
