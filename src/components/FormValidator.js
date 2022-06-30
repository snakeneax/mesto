
export default class FormValidator {
  constructor(validationSettings, formElement) {
    this._validationSettings = validationSettings;
    this._formElement = formElement;
    this._submitButtonElement = this._formElement.querySelector(this._validationSettings.submitButtonSelector);
    this._inputs = Array.from(this._formElement.querySelectorAll(this._validationSettings.inputSelector));
  }

// получить ошибку
  _getErrorElement(inputElement) {
    return this._formElement.querySelector(`#${inputElement.id}-error`);
  }

// показать ошибки
  _showError(inputElement, errorMessage) {
    const {errorClass, inputErrorClass} = this._validationSettings;
    const errorElement = this._getErrorElement(inputElement);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
    inputElement.classList.add(inputErrorClass);
  }

// спрятать ошибку
  _hideError(inputElement){
    const {errorClass, inputErrorClass} = this._validationSettings
    const errorElement = this._getErrorElement(inputElement);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
    inputElement.classList.remove(inputErrorClass)
  }

// проверяем валидацию 
  _checkValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  }
// дизейблим кнопку
  _disableButton () {
    this._submitButtonElement.classList.add(this._validationSettings.inactiveButtonClass);
    this._submitButtonElement.disabled = true;
  }

  
  // проверяем инпаты на валдиность
  _hasInvalidInput () {
    return this._inputs.some ((inputElement) => {
      return !inputElement.validity.valid
    })
  }


// дизейблим либо активируем кнопку сабмита 
  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._submitButtonElement.classList.remove(this._validationSettings.inactiveButtonClass);
      this._submitButtonElement.removeAttribute('disabled');
    }
  }

// добавляем слушатели 
  _setEventListeners() {
    const inputListIterator = (inputElement) => {
      const handleInput = () => {
        this._checkValidity(inputElement);
        this._toggleButtonState(this._inputs);
      }
      inputElement.addEventListener('input', handleInput);
    }
    this._toggleButtonState();
    this._inputs.forEach(inputListIterator);
  }

  enableValidation () {
    this._formElement.addEventListener('submit', (e) => e.preventDefault());
    this._setEventListeners();
  }

  resetPopupForm () {
    this._inputs.forEach((input) =>  this._hideError(input))
    this._disableButton();
  }
}