const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const createCardButton = document.querySelector('.form__button_type_card-form');
const saveProfileButton = document.querySelector('.form__button_type_profile');

const popupProfile = document.querySelector('.popup_type_profile');
const popupCardForm = document.querySelector('.popup_type_card-form');
const popupImage = document.querySelector('.popup_type_image');

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

const inputName = document.querySelector('#edit-input-name');
const inputProfession = document.querySelector('#edit-input-profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

const openPopup = (popup, event) => {
	popup.classList.add('popup_opened');
	if (popup.classList.contains('popup_type_profile')) {
		inputName.value = profileName.textContent;
		inputProfession.value = profileProfession.textContent;
	}
	event.stopPropagation();
};

const closePopup = (button, event) => {
	button.parentElement.parentElement.style.animationName = 'close-popup';
	setTimeout(() => {
		button.parentElement.parentElement.style.animationName = 'appearance-popup';
		button.parentElement.parentElement.classList.remove('popup_opened');
	}, 400);
	event.stopPropagation();
}

const toggleLikeButton = (button, event) => {
	button.classList.toggle('card__like-button_activ');
	event.stopPropagation();
}

const deleteCard = (button, event) => {
	button.parentElement.remove();
	event.stopPropagation();
}

const openPopupImage = (picture, event) => {
	popupImage.querySelector('.popup__img').src = picture.querySelector('.card__img').getAttribute('src');
	popupImage.querySelector('.popup__img').alt = picture.querySelector('.card__img').getAttribute('alt');
	popupImage.querySelector('.popup__webp').srcset = picture.querySelector('.card__webp').getAttribute('srcset');
	popupImage.querySelector('.popup__caption').textContent = picture.parentElement.querySelector('.card__text').textContent;
	openPopup(popupImage, event);
}

const cardTemplate = document.querySelector('#card-template').content;
const cardsBlock = document.querySelector('.cards-block');

const cloneNodeTemplate = (template) => {
	return template.querySelector('.cards-block__card').cloneNode(true);
}

const fillTemplate = (card, name, srcLink, srcsetLink) => {
	card.querySelector('.card__text').textContent = name;
	card.querySelector('.card__img').src = srcLink;
	card.querySelector('.card__webp').srcset = srcsetLink;
	card.querySelector('.card__img').onerror = function () {
		card.querySelector('.card__img').src = 'images/no-image.jpg';
	};
}

const createNewCard = (name, srcsetLink, srcLink, event) => {

	const newCard = cloneNodeTemplate(cardTemplate);

	fillTemplate(newCard, name, srcLink, srcsetLink);

	const cardPicture = newCard.querySelector('.card__picture');
	cardPicture.addEventListener('click', () => openPopupImage(cardPicture, event));

	const likeButton = newCard.querySelector('.card__like-button');
	likeButton.addEventListener('click', () => toggleLikeButton(likeButton, event));

	const deleteButton = newCard.querySelector('.card__trash-button');
	deleteButton.addEventListener('click', () => deleteCard(deleteButton, event));

	document.querySelector('#add-card-input-name').value = '';
	document.querySelector('#add-card-input-link').value = '';

	cardsBlock.append(newCard);

	const closeButton = event.currentTarget.parentElement.parentElement.querySelector('.popup__close-button');
	closePopup(closeButton, event);
};

const loadInitialCards = () => {
	initialCards.forEach(element => {
		const card = cloneNodeTemplate(cardTemplate);
		fillTemplate(card, element.name, element.src, element.srcset);
		cardsBlock.append(card);
	});
}

loadInitialCards();

const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const cardPictures = document.querySelectorAll('.card__picture');
const cardLikeButtons = document.querySelectorAll('.card__like-button');
const cardTrashButtons = document.querySelectorAll('.card__trash-button');

editButton.addEventListener('click', (event) => openPopup(popupProfile, event));

addCardButton.addEventListener('click', (event) => openPopup(popupCardForm, event));

popupCloseButtons.forEach(element => {
	element.addEventListener('click', (event) => {
		closePopup(event.currentTarget, event);
	});
});

cardPictures.forEach(element => {
	element.addEventListener('click', (event) => {
		openPopupImage(event.currentTarget, event);
	});
});

cardLikeButtons.forEach(element => {
	element.addEventListener('click', (event) => {
		toggleLikeButton(event.target, event);
	});
});

cardTrashButtons.forEach(element => {
	element.addEventListener('click', (event) => {
		deleteCard(event.currentTarget, event);
	});
});

createCardButton.addEventListener('click', (event) => {
	let newPlaceName = document.querySelector('#add-card-input-name').value;
	let newSrcLink = document.querySelector('#add-card-input-link').value;
	let newSrcsetLink = '';
	createNewCard(newPlaceName, newSrcsetLink, newSrcLink, event);
	event.preventDefault();
});

saveProfileButton.addEventListener('click', (event) => {
	profileName.textContent = inputName.value;
	profileProfession.textContent = inputProfession.value;
	event.preventDefault();
	const closeButton = event.currentTarget.parentElement.parentElement.querySelector('.popup__close-button');
	closePopup(closeButton, event);
});
