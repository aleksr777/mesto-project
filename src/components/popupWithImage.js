import Popup from './popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.popupPicture = this._popup.querySelector('.popup__img');
    this.popupDescription = this._popup.querySelector('.popup__caption');
  }

  open(description, link) {
    super.open();
    this.popupDescription.textContent = description;
    this.popupPicture.alt = description + '.';
    this.popupPicture.src = link;
  }
};
