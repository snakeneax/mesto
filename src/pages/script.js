// Импортируем
import '../pages/index.css'
import initialCards from "../utils/initialCards.js";
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
} from '../utils/constants.js'
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
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

  const userName = userInfo.getUserInfo().name;
  const userProfession = userInfo.getUserInfo().profession;

  namePopup.value = userName;
  jobPopup.value = userProfession;
  
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