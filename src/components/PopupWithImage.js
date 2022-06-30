import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor (selector) {
    super(selector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupCaption = this._popup.querySelector(".popup__image-caption");
  }

  open ({title, link}) {
    this._popupCaption.textContent = title;
    this._popupImage.src = link;
    this._popupImage.alt = title;
    super.open();
  }
}