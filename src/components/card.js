export default class Card {
  constructor(selectors, cardTemplate, handleCardClick, handleLikeButtonClick, handleTrashButtonClick, showNumberLikes) {
    this._cardTemplate = cardTemplate;
    this._selectors = selectors;
    this._handleCardClick = handleCardClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
    this._handleTrashButtonClick = handleTrashButtonClick;
    this._showNumberLikes = showNumberLikes;
  }

  // отрисовка карточки
  renderer(card, profileId, splashScreen) {
    const newCard = this._cardTemplate.content.querySelector(this._selectors.card).cloneNode(true);
    const text = newCard.querySelector(this._selectors.cardText);
    const image = newCard.querySelector(this._selectors.cardImg);
    const picture = newCard.querySelector(this._selectors.cardPicture);
    const likeButton = newCard.querySelector(this._selectors.likeButton);
    const trashButton = newCard.querySelector(this._selectors.trashButton);
    text.textContent = card.name;
    image.src = card.link;
    image.onerror = () => { image.src = splashScreen }
    picture.addEventListener('click', evt => this._handleCardClick(evt, card.name, card.link));
    likeButton.addEventListener('click', evt => this._handleLikeButtonClick(evt, evt.currentTarget, card._id));
    trashButton.addEventListener('click', evt => this._handleTrashButtonClick(evt, card._id, evt.currentTarget.closest(this._selectors.card)));
    this._showNumberLikes(likeButton, newCard, card.likes.length);
    card.likes.forEach((element) => { if (element._id === profileId) { likeButton.classList.add(this._selectors.likeButtonActive) } });
    if (profileId !== card.owner._id) { trashButton.remove() }
    return newCard;
  }
}