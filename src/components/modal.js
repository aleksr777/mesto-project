import { openPopup, closePopup } from './utils.js';

const popupWindows = document.querySelectorAll('.popup');

const popupProfile = document.querySelector('.popup_type_profile');
const popupCardForm = document.querySelector('.popup_type_card-form');
const popupImage = document.querySelector('.popup_type_image');
const createCardForm = document.querySelector('.form_type_card-form');
const saveProfileForm = document.querySelector('.form_type_profile');

const inputName = document.querySelector('#profile-name-input');
const inputProfession = document.querySelector('#profile-profession-input');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const profileAvatar = document.querySelector('.profile__img');

const imgPopupImage = popupImage.querySelector('.popup__img');
const webpPopupImage = popupImage.querySelector('.popup__webp');
const captionPopupImage = popupImage.querySelector('.popup__caption');

const openPopupProfile = (event) => {
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
  openPopup(popupProfile);
}

const closeCurrentPopup = (event) => {
  if (event.target.classList.contains('popup__close-button') || event.target.classList.contains('popup_opened')) {
    closePopup(event.currentTarget.closest('.popup'));
    event.stopPropagation();
  }
}

const openPopupImage = (event) => {
  imgPopupImage.src = event.currentTarget.querySelector('.card__img').getAttribute('src');
  imgPopupImage.alt = event.currentTarget.querySelector('.card__img').getAttribute('alt');
  webpPopupImage.srcset = event.currentTarget.querySelector('.card__webp').getAttribute('srcset');
  captionPopupImage.textContent = event.currentTarget.closest('.card').querySelector('.card__text').textContent;
  event.stopPropagation();
  openPopup(popupImage);
}

export { popupWindows, popupProfile, popupCardForm, createCardForm, saveProfileForm, inputName, inputProfession, profileName, profileProfession, profileAvatar, openPopupProfile, closeCurrentPopup, openPopupImage }; 