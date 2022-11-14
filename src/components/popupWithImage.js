import { Popup } from './popup.js';

export default class PopupWithImage extends Popup {
  constructor({ popupImage, imgPopupImage, captionPopupImage, popupOpened, popupCloseButton }) {
    super(popupImage, popupOpened, popupCloseButton);
    this.popupPicture = this._popup.querySelector(imgPopupImage);
    this.popupDescription = this._popup.querySelector(captionPopupImage);
  }

  open(caption, link) {
    this.popupDescription.textContent = caption;
    this.popupPicture.alt = caption + '.';
    this.popupPicture.src = link;
    super.open();
  }
};