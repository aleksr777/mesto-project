import { popupWithImage, popupDeleteCard, api } from '../pages/index.js';
import { selectors } from '../utils/constants.js';

const cardTemplate = document.querySelector(selectors.cardTemplate);
const cloneNodeTemplate = (template) => template.querySelector(selectors.card).cloneNode(true);
export const splashScreen = new URL('../images/no-image.jpg', import.meta.url);

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

const toggleLikeButton = (button, cardId) => {
  const card = button.closest('.card');
  button.setAttribute('disabled', true);
  if (button.classList.contains(selectors.likeButtonActive)) {
    api.deleteLike(cardId)
      .then((res) => {
        button.classList.remove(selectors.likeButtonActive);
        showNumberLikes(button, card, res.likes.length);
      })
      .catch((err) => {
        console.log(err);
        button.removeAttribute('disabled');
      });
  }
  else {
    api.putLike(cardId)
      .then(res => {
        button.classList.add(selectors.likeButtonActive);
        showNumberLikes(button, card, res.likes.length);
      })
      .catch((err) => {
        console.log(err);
        button.removeAttribute('disabled');
      });
  }
};

export const renderCard = (card, splashScreen, profileId) => {
  const newCard = cloneNodeTemplate(cardTemplate.content);
  const text = newCard.querySelector(selectors.cardText);
  const image = newCard.querySelector(selectors.cardImg);
  const picture = newCard.querySelector(selectors.cardPicture);
  const likeButton = newCard.querySelector(selectors.likeButton);
  const trashButton = newCard.querySelector(selectors.trashButton);
  text.textContent = card.name;
  image.src = card.link;
  image.onerror = () => { image.src = splashScreen }
  picture.addEventListener('click', (event) => {
    popupWithImage.open(card.name, card.link); event.stopPropagation();
  });
  likeButton.addEventListener('click', (event) => {
    toggleLikeButton(event.currentTarget, card._id); event.stopPropagation();
  });
  trashButton.addEventListener('click', (event) => {
    popupDeleteCard.open(card._id, event.currentTarget.closest(selectors.card)); event.stopPropagation();
  });
  showNumberLikes(likeButton, newCard, card.likes.length);
  card.likes.forEach((el) => { if (el._id === profileId) { likeButton.classList.add(selectors.likeButtonActive) } });
  if (profileId !== card.owner._id) { trashButton.remove() }
  return newCard;
};