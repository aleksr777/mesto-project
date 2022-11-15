// settings for components--------------------------------------------------
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
  inputErrorClass: 'form__input-text_type_error',
};


// popups
export const popupSelectors = {
  profile: '.popup_type_profile',
  addCard: '.popup_type_card-form',
  editAvatar: '.popup_type_user-img',
  viewCard: '.popup_type_image',
  deleteCard: '.popup_type_deleting-card'
};

// buttons for open popup
export const popupOpenButtons = {
  profile: document.querySelector('.profile__edit-button'),
  avatar: document.querySelector('.profile__picture'),
  addCard: document.querySelector('.profile__add-button')
};

// forms
export const formSelectors = {
  profile: document.querySelector('.form_type_profile'),
  avatar: document.querySelector('.form_type_user-img'),
  addCard: document.querySelector('.form_type_card-form')
};

// profile form fields
export const profileFormFields = {
  userName: document.querySelector('.form__input-text_type_profile-name'),
  userDescription: document.querySelector('.form__input-text_type_profile-profession')
};

// profile selectors
export const profileSelectors = {
  userName: document.querySelector('.profile__name'),
  userDescription: document.querySelector('.profile__profession'),
  userAvatar: document.querySelector('.profile__img')
};

// card selectors
export const cardPlace = document.querySelector('.cards-block');
export const cardBlank = document.querySelector('#card-template').content;