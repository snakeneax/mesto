// Импортируем
import initialCards from "./initialCards.js";
import { 
  buttonEdit,
  buttonAdd,
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
} from './constants.js'
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
//------------------------------------------------------------//

// запускаем валидацию у popupEdit
const validationPopupEdit = new FormValidator (validationSettings, formElementEdit);
validationPopupEdit.enableValidation();

// запускаем валидацию у popupAdd
const validationPopupAdd = new FormValidator (validationSettings, formElementAdd);
validationPopupAdd.enableValidation();

// попап показа фото
const popupShowPhoto = new PopupWithImage (popupShowPhotoSelector)
popupShowPhoto.setEventListeners();

// попап добавления фото
const popupAdd = new PopupWithForm (popupAddCardSelector, (data) => {
  cards.addItem(data);
});
popupAdd.setEventListeners();
buttonAdd.addEventListener('click', () => {
  validationPopupAdd.resetPopupForm();
  popupAdd.open();
});

// получение данных 
const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  professionSelector: profileProfessionSelector
});

// попап изменения профиля
const popupEdit = new PopupWithForm (popupEditSelector, ({ name, profession }) => {
  userInfo.setUserInfo({ name, profession });
});
popupEdit.setEventListeners();
buttonEdit.addEventListener('click', () => {
  validationPopupEdit.resetPopupForm();
  namePopup.value = userInfo.getUserInfo().name;
  jobPopup.value = userInfo.getUserInfo().profession;
  popupEdit.open();
});

// фунция создания карточки
const createCard = (card) => new Card (card, cardTemplateSelector, () => popupShowPhoto.open(card)).generate();

const cards = new Section({
    items: initialCards,
    renderer: (cardItem) => createCard(cardItem),
  },  
  elementSelector
);

// рендер карточек
cards.renderItems();