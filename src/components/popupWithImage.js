import { Popup } from './popup.js';

export default class PopupWithImage extends Popup {
  constructor(selectors, popupElement, pageNode, imgPopupImage, captionPopupImage, splashScreen) {
    super(selectors, popupElement, pageNode);
    this.popupPicture = imgPopupImage;
    this.popupDescription = captionPopupImage;
    this.splashScreen = splashScreen;
  }

  open(caption, link) {
    super.open();
    this.popupDescription.textContent = caption;
    this.popupPicture.alt = caption + '.';
    this.popupPicture.src = link;
    this.popupPicture.onerror = () => { this.popupPicture.src = this.splashScreen };
  }
};