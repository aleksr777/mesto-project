
let popupWindow = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let editButton = document.querySelector('.profile__edit-button');

editButton.addEventListener('click', openPopupWindow);
closeButton.addEventListener('click', closePopupWindow);

function openPopupWindow() {
	console.log(popupWindow);
	popupWindow.classList.add('popup_opened');
}

function closePopupWindow() {
	console.log(popupWindow);
	popupWindow.classList.remove('popup_opened');
}