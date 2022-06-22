import initialCards from "./initialCards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileProfession = profile.querySelector('.profile__profession');
const buttonEdit = profile.querySelector ('.profile__edit');
const buttonAdd = profile.querySelector ('.profile__button');

const popupEdit = document.querySelector ('#popupEdit');
const formElementEdit = popupEdit.querySelector ('.popup__form_type_edit');
const namePopup = popupEdit.querySelector('.popup__input_type_name');
const jobPopup = popupEdit.querySelector('.popup__input_type_profession');

const popupAddCard = document.querySelector ('#popupAddCard');
const formElementAdd = document.querySelector('.popup__form_type_add')
const inputTitle = document.querySelector('#place')
const inputLink = document.querySelector('#link')

const popups = document.querySelectorAll('.popup')

const element = document.querySelector ('.elements');

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const validationPopupEdit = new FormValidator (validationSettings, formElementEdit);
const validationPopupAdd = new FormValidator (validationSettings, formElementAdd);

validationPopupEdit._enableValidation();
validationPopupAdd._enableValidation();

const generateCard = (card) => new Card (card, '#cardTemplate').generate();

const renderCards = (cards) => (
  cards.reverse().forEach((card) => element.append(generateCard(card)))
);

const addCard = () => {
  const newCard = generateCard({
    name: inputTitle.value,
    link: inputLink.value,
  }, '#cardTemplate');
  element.prepend(newCard);
};

const profileDataChange = () => {
  const name = namePopup.value;
  const profession = jobPopup.value;
  if (name !== profileName.textContent) {
    profileName.textContent = name;
  }
  if (profession !==  profileProfession.textContent){
    profileProfession.textContent = profession;
  }
}

const handleProfileFormSubmitEdit = (evt) => {
  evt.preventDefault();
  profileDataChange();
  closePopup(popupEdit);
};

const handleProfileFormSubmitAdd = (evt) => {
  evt.preventDefault();
  addCard();
  closePopup(popupAddCard);
};

const openEditPopup = () => {
  openPopup(popupEdit);
  namePopup.value = profileName.textContent;
  jobPopup.value = profileProfession.textContent;
  validationPopupEdit.resetPopupForm();
};

export default function openPopup(popup) {
  popup.classList.add('popup_opened'); 
  document.addEventListener('keydown', handleEscPress);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscPress);
};

const handleEscPress = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened')
    closePopup(popup);
  }
}

const openAddPhotoPopup = () => {
  formElementAdd.reset();
  validationPopupAdd.resetPopupForm();
  openPopup(popupAddCard);
}

buttonEdit.addEventListener('click', openEditPopup);
buttonAdd.addEventListener('click', openAddPhotoPopup);

formElementAdd.addEventListener('submit', handleProfileFormSubmitAdd);
formElementEdit.addEventListener('submit', handleProfileFormSubmitEdit); 

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    }
  })
})  

renderCards(initialCards);