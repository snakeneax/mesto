import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor (selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
  }

  _getInputValues () {
    this._formValues = {};
    this._inputs.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  close () {
    this._form.reset();
    super.close();
  }

  setEventListeners () {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  } 
}