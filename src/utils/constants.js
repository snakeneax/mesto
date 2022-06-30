// профиль 
const profile = document.querySelector('.profile');
const buttonEdit = profile.querySelector ('.profile__edit');
const buttonAdd = profile.querySelector ('.profile__button');

// попап изменения профиля
const popupEdit = document.querySelector ('#popupEdit');
const formElementEdit = popupEdit.querySelector ('.popup__form_type_edit');
const namePopup = popupEdit.querySelector('.popup__input_type_name');
const jobPopup = popupEdit.querySelector('.popup__input_type_profession');

//попап добавления карточки
const formElementAdd = document.querySelector('.popup__form_type_add')

// Селекторы для валидации
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  errorMessage: 'popup__error',
};

// Селекторы попапов
const profileNameSelector = '.profile__name';
const profileProfessionSelector = '.profile__profession';
const popupShowPhotoSelector = '#popup__ShowPhoto';
const popupAddCardSelector = '#popupAddCard';
const popupEditSelector = '#popupEdit';
const cardTemplateSelector = '#cardTemplate';
const elementSelector = '.elements'

export { 
  buttonEdit,
  buttonAdd,
  popupEdit,
  formElementEdit,
  namePopup,
  jobPopup,
  formElementAdd,
  validationSettings,
  profileNameSelector,
  profileProfessionSelector,
  popupShowPhotoSelector,
  popupAddCardSelector,
  popupEditSelector,
  cardTemplateSelector,
  elementSelector,
}
