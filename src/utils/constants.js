// Используемые селекторы из HTML
export const selectors = {
  body: 'body',
  page: '.page',

  popup: '.popup',
  popupContainer: '.popup__container',
  popupOpened: 'popup_opened',
  popupCloseButton: 'popup__close-button',

  cardsBlock: '.cards-block',
  card: '.cards-block__card',
  cardTemplate: '#card-template',
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

// настройка валидации (объект с используемыми селекторами)
export const validationConfig = {
  formSelector: selectors.form,
  inputSelector: selectors.input,
  submitButtonSelector: selectors.submitButton,
  inactiveButtonClass: selectors.inactiveButton,
  inputErrorClass: selectors.inputError,
  errorClass: selectors.error,
};

export const bodyNode = document.querySelector(selectors.body);
export const pageNode = bodyNode.querySelector(selectors.page);

export const cardsBlock = bodyNode.querySelector(selectors.cardsBlock);
export const cardTemplate = cardsBlock.querySelector(selectors.cardTemplate);

export const popupAvatar = bodyNode.querySelector(selectors.popupAvatar);
export const avatarForm = popupAvatar.querySelector(selectors.avatarForm);
export const profilePicture = bodyNode.querySelector(selectors.profilePicture);
export const profileAvatar = bodyNode.querySelector(selectors.profileAvatar);

export const popupCardForm = bodyNode.querySelector(selectors.popupCardForm);
export const cardForm = popupCardForm.querySelector(selectors.cardForm);
export const addCardButton = bodyNode.querySelector(selectors.addCardButton);

export const popupDeletingCard = bodyNode.querySelector(selectors.popupDeletingCard);

export const popupProfile = bodyNode.querySelector(selectors.popupProfile);
export const profileForm = popupProfile.querySelector(selectors.profileForm);
export const editButton = bodyNode.querySelector(selectors.editButton);

export const popupImage = bodyNode.querySelector(selectors.popupImage);
export const imgPopupImage = popupImage.querySelector(selectors.imgPopupImage);
export const captionPopupImage = popupImage.querySelector(selectors.captionPopupImage);

export const POPUP_ANIMATION_DURATION = 500;
