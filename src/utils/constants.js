export const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
  headers: {
    authorization: 'f31bf66b-98c5-4066-9b1a-67f29063c0e2',
    'Content-Type': 'application/json'
  }
};

export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input-text',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input-text_type_error',
  errorClass: 'form__input-error'
};

export const popupWindows = document.querySelectorAll('.popup');

export const popupAvatar = document.querySelector('.popup_type_user-img');
export const avatarForm = popupAvatar.querySelector('.form_type_user-img');
export const profilePicture = document.querySelector('.profile__picture');
export const profileAvatar = document.querySelector('.profile__img');
export const submitAvatar = avatarForm.querySelector('.form__submit_type_avatar');
export const inputLinkAvatar = avatarForm.querySelector('#user-img-link-input');
export const ErrorLinkAvatar = avatarForm.querySelector('.user-img-link-input-error');

export const cardsBlock = document.querySelector('.cards-block');
export const popupCardForm = document.querySelector('.popup_type_card-form');
export const popupDeletingCard = document.querySelector('.popup_type_deleting-card');
export const deletionConfirmationButton = popupDeletingCard.querySelector('.form__submit_type_deleting-card');
export const cardForm = popupCardForm.querySelector('.form_type_card-form');
export const addCardButton = document.querySelector('.profile__add-button');
export const submitCardForm = cardForm.querySelector('.form__submit_type_card-form');
export const inputPlaceName = cardForm.querySelector('#card-name-input');
export const inputLinkImg = cardForm.querySelector('#card-link-input');
export const ErrorPlaceName = cardForm.querySelector('.card-name-input-error');
export const ErrorLinkImg = cardForm.querySelector('.card-link-input-error');

export const popupProfile = document.querySelector('.popup_type_profile');
export const profileForm = popupProfile.querySelector('.form_type_profile');
export const editButton = document.querySelector('.profile__edit-button');
export const submitProfile = profileForm.querySelector('.form__submit_type_profile');
export const profileName = document.querySelector('.profile__name');
export const profileProfession = document.querySelector('.profile__profession');
export const inputName = profileForm.querySelector('#profile-name-input');
export const inputProfession = profileForm.querySelector('#profile-profession-input');
export const ErrorName = profileForm.querySelector('.profile-name-input-error');
export const ErrorProfession = profileForm.querySelector('.profile-profession-input-error');

export const popupImage = document.querySelector('.popup_type_image');
export const imgPopupImage = popupImage.querySelector('.popup__img');
export const captionPopupImage = popupImage.querySelector('.popup__caption');