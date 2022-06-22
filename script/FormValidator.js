export default class FormValidator {
  constructor(validationSettings, formElement) {
    this._validationSettings = validationSettings;
    this._formElement = formElement;
    this._submitButtonElement = this._formElement.querySelector(this._validationSettings.submitButtonSelector);
    this._errorFields = this._formElement.querySelectorAll(this._validationSettings.formSelector);
    this._inputs = this._formElement.querySelectorAll(this._validationSettings.inputSelector);
  }

// получить ошибку
  _getErrorElement(formElement, inputElement) {
    return formElement.querySelector(`#${inputElement.id}-error`);
  }

// показать ошибки
  _showError(formElement, inputElement, errorMessage, errorClass, inputErrorClass){
    const errorElement = this._getErrorElement(formElement, inputElement);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
    inputElement.classList.add(inputErrorClass);
  }

// спрятать ошибку
  _hideError(formElement, inputElement, errorClass, inputErrorClass){
    const errorElement = this._getErrorElement(formElement, inputElement);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
    inputElement.classList.remove(inputErrorClass)
  }

// проверяем валидацию 
  _checkValidity (formElement, inputElement, errorClass, inputErrorClass) {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
      const errorMessage = inputElement.validationMessage;
      this._showError(formElement, inputElement, errorMessage, errorClass, inputErrorClass);
    } else {
      this._hideError(formElement, inputElement, errorClass, inputErrorClass);
    }
  }

// дизейблим либо активируем кнопку сабмита 
  _toggleButtonState (inputList, submitButtonElement, inactiveButtonClass) {
    const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid);

    if (hasInvalidInput) {
      submitButtonElement.classList.add(inactiveButtonClass);
      submitButtonElement.setAttribute('disabled', true);
    } else {
      submitButtonElement.classList.remove(inactiveButtonClass);
      submitButtonElement.removeAttribute('disabled');
    }
  }

// добавляем слушатели 
  _setEventListeners(formElement, validationObj) {
    const {inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass} = validationObj;
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButtonElement = formElement.querySelector(submitButtonSelector);

    const inputListIterator = (inputElement) => {
      const handleInput = () => {
        this._checkValidity(formElement, inputElement, errorClass, inputErrorClass);
        this._toggleButtonState(inputList, submitButtonElement, inactiveButtonClass);
      }

    inputElement.addEventListener('input', handleInput);
    }
    this._toggleButtonState(inputList, submitButtonElement, inactiveButtonClass);
    inputList.forEach(inputListIterator);
  }

  _enableValidation () {
    this._formElement.addEventListener('submot', (e) => e.preventDefault());
    this._setEventListeners(this._formElement, this._validationSettings);
  }

  _setDisabledOnSubmitButton () {
    this._submitButtonElement.classList.add('popup__button-save_disabled');
    this._submitButtonElement.disabled = true;
  }

  resetPopupForm (){
    this._errorFields.forEach((field) => field.textContent = '');
    this._inputs.forEach((input) => input.classList.remove('popup__input_type_error'));
    this._setDisabledOnSubmitButton();
  }
}