import { Popup } from './popup.js';

export default class PopupWithImage extends Popup {
  constructor(bodyNode, pageNode, selectors, popupElement, imgPopupImage, captionPopupImage, splashScreen, animationDuration) {
    super(bodyNode, pageNode, selectors, popupElement, animationDuration);
    this.popupPicture = imgPopupImage;
    this.popupDescription = captionPopupImage;
    this.splashScreen = splashScreen;
    this.animationDuration = animationDuration;
  }

  open(evt, caption, link) {
    super.open(evt);
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
