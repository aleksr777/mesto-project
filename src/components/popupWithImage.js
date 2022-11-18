import { Popup } from './popup.js';

export default class PopupWithImage extends Popup {
  constructor(selectors, popup, imgPopupImage, captionPopupImage) {
    super(selectors, popup);
    this.popupPicture = imgPopupImage;
    this.popupDescription = captionPopupImage;
  }

  open(caption, link) {
    super.open();
    this.popupDescription.textContent = caption;
    this.popupPicture.alt = caption + '.';
    this.popupPicture.src = link;
  }
};