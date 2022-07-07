// профиль 
const profile = document.querySelector('.profile');
const buttonEdit = profile.querySelector ('.profile__edit');
const buttonAdd = profile.querySelector ('.profile__button');


// попап изменения профиля
const popupEdit = document.querySelector ('#popupEdit');
const formElementEdit = popupEdit.querySelector ('.popup__form_type_edit');

//попап добавления карточки
const formElementAdd = document.querySelector('.popup__form_type_add')

//попап изменения аватара
const popupAvatar = document.querySelector('#popupChangeAvatar')
const formPopupAvatar = popupAvatar.querySelector('.popup__form_type_change-avatar')
const avatar = profile.querySelector ('.profile__avatar')

// попап подтверждения 



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
const profileAvatarSelector = '.profile__avatar';
const popupShowPhotoSelector = '#popup__ShowPhoto';
const popupAddCardSelector = '#popupAddCard';
const popupEditSelector = '#popupEdit';
const cardTemplateSelector = '#cardTemplate';
const elementSelector = '.elements';
const popupChangeAvatarSelector = '#popupChangeAvatar'
const popupConfirmationSelector = '#popupConfirm'



export { 
  buttonEdit,
  buttonAdd,
  popupEdit,
  formElementEdit,
  formElementAdd,
  validationSettings,
  profileNameSelector,
  profileProfessionSelector,
  popupShowPhotoSelector,
  popupAddCardSelector,
  popupEditSelector,
  cardTemplateSelector,
  elementSelector,
  popupChangeAvatarSelector,
  formPopupAvatar,
  avatar,
  profileAvatarSelector,
  popupConfirmationSelector
}
