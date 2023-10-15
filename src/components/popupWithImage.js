import { Popup } from './popup.js';

export default class PopupWithImage extends Popup {
  constructor(selectors, popupElement, pageNode, imgPopupImage, captionPopupImage, splashScreen, animationDuration) {
    super(selectors, popupElement, pageNode, animationDuration);
    this.popupPicture = imgPopupImage;
    this.popupDescription = captionPopupImage;
    this.splashScreen = splashScreen;
    this.animationDuration = animationDuration;
  }

  open(caption, link) {
    super.open();
    this.popupPicture.src = link;
    this.popupDescription.textContent = caption;
    this.popupPicture.alt = caption + '.';
    this.popupPicture.onerror = () => {
      this.popupPicture.src = this.splashScreen
    };
  }

  close() {
    super.close();
    setTimeout(() => {
      this.popupPicture.src = '';
      this.popupDescription.textContent = '';
      this.popupPicture.alt = '';
    }, this.animationDuration);
  }
};
