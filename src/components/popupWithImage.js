import { selectors } from '../utils/constants.js';
import { Popup } from './popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.popupPicture = this._popup.querySelector(selectors.imgPopupImage);
    this.popupDescription = this._popup.querySelector(selectors.captionPopupImage);
  }

  open(description, link) {
    this.popupDescription.textContent = description;
    this.popupPicture.alt = description + '.';
    this.popupPicture.src = link;
    super.open();
  }
};