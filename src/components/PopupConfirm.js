import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(selector) {
    super(selector);
    this._confirmButton = this._popup.querySelector('.popup__button-save')
  }

  loading (isLoading) {
    if(isLoading) {
      this._confirmButton.textContent = 'Удаление'
    } else {
      this._confirmButton.textContent = 'ДА'
    }
  }

  setConfirm (callback) {
    this._handleConfirmCallback = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', () => {
      this._handleConfirmCallback()
    })
  }
}

  