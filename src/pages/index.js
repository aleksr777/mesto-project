// styles-------------------------------------------------------------------
import './index.css';

// import variables---------------------------------------------------------
import {
  apiConfig,
  validationConfig,
  cardBlank,
  cardPlace,
  formSelectors,
  popupSelectors,
  popupOpenButtons,
  profileSelectors,
  profileFormFields,
} from '../utils/constants.js';

// callbacks for components-------------------------------------------------
const handleCardClick = (description, link) => popupWithImage.open(description, link);

const handleHeartClick = card => {
  /*   if (card._heart.classList.contains('card__like-button_activ')) {
      api.deleteLike(card._cardId)
        .then((res) => {
          card._heartsCount.textContent = res.likes.length;
          card._heart.classList.remove('card__like-button_activ');
        })
        .catch(err => console.log(err));
    }
    else {
      api.putLike(card._cardId)
        .then((res) => {
          card._heartsCount.textContent = res.likes.length;
          card._heart.classList.add('card__like-button_activ');
        })
        .catch(err => console.log(err));
    } */
};

const handleCardDelete = card => {
  console.log(card._cardId);
  popupDeleteCard.open(card._cardId, card.card);
};

/* const deleteCardSubmit = evt => {
  evt.preventDefault();
  popupDeleteCard.isLoading(true);
  api.deleteCard(popupDeleteCard.getIdCard())
    .then((data) => console.log(data))
    //.then(() => popupDeleteCard.close())
    //.then(() => popupDeleteCard.delete())
    .catch((err) => console.log(err))
    .finally(() => popupDeleteCard.isLoading(false));
}; */

/* const profileFormSubmit = evt => {
  evt.preventDefault();
  profilePopup.isLoading(true);
  const inputValues = profilePopup.getFormValues();
  api.sendProfileInfo(inputValues.nameInput, inputValues.statusInput)
    .then(data => {
      userInfo.setUserInfo(userInfo.getUserInfo(data));
    })
    .then(() => profilePopup.close())
    .catch(err => console.log(err))
    .finally(() => profilePopup.isLoading(false));
}; */

/* const avatarFormSubmit = (event) => {
  event.preventDefault();
  console.log('hi');
  avatarPopup.isLoading(true);
  const inputValue = avatarPopup.getFormValues();
  api.sendNewAvatar(inputValue.avatarInput)
    .then(data => {
      userInfo.setUserInfo(userInfo.getUserInfo(data));
    })
    .then(() => avatarPopup.close())
    .catch(err => console.log(err))
    .finally(() => avatarPopup.isLoading(false));
}; */

/* const addCardFormSubmit = evt => {
  evt.preventDefault();
  addCardPopup.isLoading(true);
  const inputValues = addCardPopup.getFormValues();
  api.sendNewCard(inputValues.pictureNameInput, inputValues.linkCardImageInput)
    .then((item) => renderCard.addItem(createCard(item, item.owner._id)))
    .then(() => addCardPopup.close())
    .catch(err => console.log(err))
    .finally(() => addCardPopup.isLoading(false));
}; */

const renderer = {
  renderer: (item, id) => {
    renderCard._container.append(createCard(item, id));
  }
};

const callBacks = {
  handleCardClick: handleCardClick,
  handleHeartClick: handleHeartClick,
  handleCardDelete: handleCardDelete,
  /* profileFormSubmit: profileFormSubmit, */
  /* deleteCardSubmit: deleteCardSubmit, */
  /* avatarFormSubmit: avatarFormSubmit, */
  /* addCardFormSubmit, addCardFormSubmit, */
  renderer: renderer
};

// import components--------------------------------------------------------
import Api from '../components/api.js';
import Card from '../components/сard.js';
import Section from '../components/section.js';
import UserInfo from '../components/userInfo.js';
import PopupWithForm from '../components/popupWithForm.js';
import FormValidator from '../components/formValidator.js';
import PopupWithImage from '../components/popupWithImage.js';
import PopupDeleteCard from '../components/popupDeleteCard.js';


// initial components-------------------------------------------------------

const api = new Api(apiConfig);

const userInfo = new UserInfo(profileSelectors, profileFormFields);

const renderCard = new Section(cardPlace, callBacks.renderer);

const popupWithImage = new PopupWithImage(popupSelectors.viewCard);

const avatarPopup = new PopupWithForm(popupSelectors.editAvatar, (evt) => {
  evt.preventDefault();
  avatarPopup.isLoading(true);
  const inputValue = avatarPopup.getFormValues();
  api.sendNewAvatar(inputValue.userImgLinkInput)
    .then(data => userInfo.setUserInfo(data))
    .then(() => avatarPopup.close())
    .catch(err => console.log(err))
    .finally(() => avatarPopup.isLoading(false));
});

const profilePopup = new PopupWithForm(popupSelectors.profile, (evt) => {
  evt.preventDefault();
  profilePopup.isLoading(true);
  const inputValues = profilePopup.getFormValues();
  api.sendProfileInfo(inputValues.profileNameInput, inputValues.profileProfessionInput)
    .then(data => userInfo.setUserInfo(data))
    .then(() => profilePopup.close())
    .catch(err => console.log(err))
    .finally(() => profilePopup.isLoading(false));
});

const addCardPopup = new PopupWithForm(popupSelectors.addCard, (evt) => {
  evt.preventDefault();
  addCardPopup.isLoading(true);
  const inputValues = addCardPopup.getFormValues();
  api.sendNewCard(inputValues.cardNameInput, inputValues.cardLinkInput)
    .then((item) => renderCard.addItem(createCard(item, item.owner._id)))
    .then(() => addCardPopup.close())
    .catch(err => console.log(err))
    .finally(() => addCardPopup.isLoading(false));
});

const popupDeleteCard = new PopupDeleteCard(popupSelectors.deleteCard, (evt) => {
  evt.preventDefault();
  popupDeleteCard.isLoading(true);
  api.deleteCard(popupDeleteCard.getIdCard())
    .then((data) => console.log(data))
    .then(() => popupDeleteCard.close())
    .then(() => popupDeleteCard.delete())
    .catch((err) => console.log(err))
    .finally(() => popupDeleteCard.isLoading(false));
});

const avatarFormValidator = new FormValidator(validationConfig, formSelectors.avatar);
const profileFormValidator = new FormValidator(validationConfig, formSelectors.profile);
const addCardformValidator = new FormValidator(validationConfig, formSelectors.addCard);


//functions----------------------------------------------------------------
function createCard(item, userId) {
  const card = new Card(item, cardBlank, userId, callBacks);
  const markupCard = card.returnCard();
  return markupCard;
};

// executable code----------------------------------------------------------

// eventListeners-----------------------------------------------------------
popupOpenButtons.profile.addEventListener('click', () => {
  profilePopup.open();
  userInfo.setInput(userInfo.getUserInfo());
});

popupOpenButtons.avatar.addEventListener('click', () => {
  //avatarFormValidator.clearMistakes();
  avatarPopup.open();
});

popupOpenButtons.addCard.addEventListener('click', () => {
  //addCardformValidator.clearMistakes();
  addCardPopup.open();
});


Promise.all([api.getProfileInfo(), api.requestCards()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData);
    renderCard.renderItems(cardsData, userData._id);
  })
  .catch(err => console.log(err));

//profileFormValidator.enableValidation();
//vatarFormValidator.enableValidation();
//addCardformValidator.enableValidation();