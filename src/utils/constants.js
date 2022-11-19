// Используемые селекторы в коде JS
export const selectors = {
  page: '.page',

  popup: '.popup',
  popupOpened: 'popup_opened',
  popupCloseButton: 'popup__close-button',

  cardsBlock: '.cards-block',
  card: '.cards-block__card',
  cardTemplate : '#card-template',
  likeNumber: '.card__like-number',
  likeNumberHidden: 'card__like-number_hidden',
  likeButton: '.card__like-button',
  likeButtonTop: 'card__like-button_position_top',
  likeButtonActive: 'card__like-button_active',
  trashButton: '.card__trash-button',
  cardText: '.card__text',
  cardImg: '.card__img',
  cardPicture: '.card__picture',  

  popupAvatar: '.popup_type_user-img',
  avatarForm: '.form_type_user-img',
  profilePicture: '.profile__picture',
  profileAvatar: '.profile__img',
  submitAvatar: '.form__submit_type_avatar',
  inputLinkAvatar: '#user-img-link-input',
  errorLinkAvatar: '.user-img-link-input-error',

  popupCardForm: '.popup_type_card-form',
  cardForm: '.form_type_card-form',
  addCardButton: '.profile__add-button',
  submitCardForm: '.form__submit_type_card-form',
  inputPlaceName: '#card-name-input',
  inputLinkImg: '#card-link-input',
  errorPlaceName: '.card-name-input-error',
  errorLinkImg: '.card-link-input-error',

  popupDeletingCard: '.popup_type_deleting-card',
  deleteСheckButton: '.form__submit_type_deleting-card',

  popupProfile: '.popup_type_profile',
  profileForm: '.form_type_profile',
  editButton: '.profile__edit-button',
  submitProfile: '.form__submit_type_profile',
  profileName: '.profile__name',
  profileProfession: '.profile__profession',
  inputName: '#profile-name-input',
  inputProfession: '#profile-profession-input',
  errorName: '.profile-name-input-error',
  errorProfession: '.profile-profession-input-error',

  popupImage: '.popup_type_image',
  imgPopupImage: '.popup__img',
  captionPopupImage: '.popup__caption',
  
  form: '.form',
  input: '.form__input-text',
  submitButton: '.form__submit',
  inactiveButton: 'form__submit_inactive',
  inputError: 'form__input-text_type_error',
  error: 'form__input-error_active',
};

// настройка и экспорт настроек валидации (объект с используемыми селекторами)
export const validationConfig = {
  formSelector: selectors.form,
  inputSelector: selectors.input,
  submitButtonSelector: selectors.submitButton,
  inactiveButtonClass: selectors.inactiveButton,
  inputErrorClass: selectors.inputError,
  errorClass: selectors.error,
};

//  Создание и экспорт переменных
export const page = document.querySelector(selectors.page);

export const cardsBlock = document.querySelector(selectors.cardsBlock);

export const popupAvatar = document.querySelector(selectors.popupAvatar);
export const avatarForm = popupAvatar.querySelector(selectors.avatarForm);
export const profilePicture = document.querySelector(selectors.profilePicture);
export const profileAvatar = document.querySelector(selectors.profileAvatar);
export const submitAvatar = avatarForm.querySelector(selectors.submitAvatar);
export const inputLinkAvatar = avatarForm.querySelector(selectors.inputLinkAvatar);
export const errorLinkAvatar = avatarForm.querySelector(selectors.errorLinkAvatar);

export const popupCardForm = document.querySelector(selectors.popupCardForm);
export const cardForm = popupCardForm.querySelector(selectors.cardForm);
export const addCardButton = document.querySelector(selectors.addCardButton);
export const submitCardForm = cardForm.querySelector(selectors.submitCardForm);
export const inputPlaceName = cardForm.querySelector(selectors.inputPlaceName);
export const inputLinkImg = cardForm.querySelector(selectors.inputLinkImg);
export const errorPlaceName = cardForm.querySelector(selectors.errorPlaceName);
export const errorLinkImg = cardForm.querySelector(selectors.errorLinkImg);

export const popupDeletingCard = document.querySelector(selectors.popupDeletingCard);
export const deleteСheckButton = popupDeletingCard.querySelector(selectors.deleteСheckButton);

export const popupProfile = document.querySelector(selectors.popupProfile);
export const profileForm = popupProfile.querySelector(selectors.profileForm);
export const editButton = document.querySelector(selectors.editButton);
export const submitProfile = profileForm.querySelector(selectors.submitProfile);
export const profileName = document.querySelector(selectors.profileName);
export const profileProfession = document.querySelector(selectors.profileProfession);
export const inputName = profileForm.querySelector(selectors.inputName);
export const inputProfession = profileForm.querySelector(selectors.inputProfession);
export const errorName = profileForm.querySelector(selectors.errorName);
export const errorProfession = profileForm.querySelector(selectors.errorProfession);

export const popupImage = document.querySelector(selectors.popupImage);
export const imgPopupImage = popupImage.querySelector(selectors.imgPopupImage);
export const captionPopupImage = popupImage.querySelector(selectors.captionPopupImage);