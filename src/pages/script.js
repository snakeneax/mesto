// Импортируем
import '../pages/index.css'
import { 
  buttonEdit,
  buttonAdd,
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
  profileAvatarSelector,
  avatar,
  popupConfirmationSelector
} from '../utils/constants.js'
import Api from '../components/Api.js';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupConfirm from '../components/PopupConfirm';

//------------------------------------------------------------//

// шаблон подключения к апи
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
  headers: {
    authorization: 'd61fdded-02a0-493a-acc6-abf5a9809994',
    'Content-Type': 'application/json'
  }
}); 

//------------------------------------------------------------//

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([me, cards]) => {
    userId = me._id;
    userInfo.setUserInfo(me);
    cardsList.renderItems(cards);
  })
  .catch((err) => 
    console.log(err))
  .finally(() => 
  {})

let userId;

//------------------------------------------------------------//

// запускаем валидацию у popupEdit
const validationPopupEdit = new FormValidator (validationSettings, formElementEdit);
validationPopupEdit.enableValidation();

// запускаем валидацию у popupAdd
const validationPopupAdd = new FormValidator (validationSettings, formElementAdd);
validationPopupAdd.enableValidation();

// запускаем валидацию у popupChangeAvatar
const validationPopupAvatar = new FormValidator (validationSettings, formPopupAvatar);
validationPopupAvatar.enableValidation();

//------------------------------------------------------------//

// получение данных 
const userInfo = new UserInfo(
  profileNameSelector,
  profileProfessionSelector,
  profileAvatarSelector,
);

//------------------------------------------------------------//

// попап показа фото
const popupShowPhoto = new PopupWithImage (popupShowPhotoSelector)
popupShowPhoto.setEventListeners();

//------------------------------------------------------------//

//попап изменения аватара
const popupChangeAvatar = new PopupWithForm (popupChangeAvatarSelector, (formData) => {
  popupChangeAvatar.loading(true);
  api.changeAvatar(formData)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupChangeAvatar.close()
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupChangeAvatar.loading(false);
    })
});
popupChangeAvatar.setEventListeners();
avatar.addEventListener('click', () => {
  validationPopupAvatar.resetPopupForm();
  popupChangeAvatar.open();
})

//------------------------------------------------------------//

// попап добавления фото
const popupAdd = new PopupWithForm (popupAddCardSelector, (formData) => {
  popupAdd.loading(true)
  api.addCard(formData)
    .then((data) => {
      cardsList.addItem(data);
      popupAdd.close()
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupAdd.loading(false)
    })
});
popupAdd.setEventListeners();
buttonAdd.addEventListener('click', () => {
  validationPopupAdd.resetPopupForm();
  popupAdd.open();
});

//------------------------------------------------------------//

// попап изменения профиля
const popupEdit = new PopupWithForm (popupEditSelector, (formData) => {
  popupEdit.loading(true);
  api.changeUserInfo(formData)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupEdit.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEdit.loading(false)
    })
});
popupEdit.setEventListeners();
buttonEdit.addEventListener('click', () => {
  validationPopupEdit.resetPopupForm();
  popupEdit.setInputValues(userInfo.getUserInfo());
  popupEdit.open();
})

//------------------------------------------------------------//

// Попап подтверждения 
const popupConfirm = new PopupConfirm(popupConfirmationSelector);
popupConfirm.setEventListeners();

//------------------------------------------------------------//


// фунция создания карточки
const createCard = (data) => {
  const card = new Card(data, cardTemplateSelector, () => popupShowPhoto.open(data), () => {
    popupConfirm.setConfirm(() => {
      popupConfirm.loading(true);
      api.deleteCard(data._id)
        .then(() => {
          card.deleteCard();
          popupConfirm.close();
        })
        .catch((err) => 
          console.log(err))
        .finally(() => 
        popupConfirm.loading(false))
    })
    popupConfirm.open()
  },
  () => {
    if (!card.isLiked()) {
      api.addLike(data._id)
        .then((data) => {
          card.updateLikes(data);
          card.updateLikesActive();
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      api.deleteLike(data._id)
        .then((data) => {
          card.updateLikes(data);
          card.updateLikesActive();
        })
        .catch((err) => {
          console.log(err);
        })
    }
  },
  userId,
  )
return card.generate();
}

const cardsList = new Section(
  (cardItem) => createCard(cardItem),
  elementSelector
);