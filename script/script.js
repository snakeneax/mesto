const editButton = document.querySelector ('.profile__edit');
const popupEdit = document.querySelector ('#popupEdit');
const formElementEdit = document.querySelector ('.popup__form_type_edit');
const namePopup = document.querySelector('.popup__input_type_name');
const jobPopup = document.querySelector('.popup__input_type_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const addButton = document.querySelector ('.profile__button');
const popupAddCard = document.querySelector ('#popupAddCard');
const popupZoomCard = document.querySelector ('#popup__ShowPhoto');
const popupZoomPhoto = popupZoomCard.querySelector ('.popup__image');
const popupZoomTitle = popupZoomCard.querySelector ('.popup__image-caption')
const elements = document.querySelector ('.elements');
const inputPlace = document.querySelector ('.popup__input_type_place');
const inputImage = document.querySelector ('.popup__input_type_image');
const addCard = document.querySelector('.popup__save');
const popups = document.querySelectorAll('.popup')
const cardsTemplate = document.querySelector("#cardTemplate").content.querySelector(".element");
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

function openPopup(popup) {
  popup.classList.add('popup_opened'); 
  document.addEventListener('keydown', handleEscPress);
  popup.addEventListener('click', closePopupByClickOnOverlay);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscPress);
  popup.removeEventListener('click', closePopupByClickOnOverlay);
};

const handleEscPress = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

const closePopupByClickOnOverlay = (evt) => {
  if (evt.target !== evt.currentTarget) {
    return;
  }
  const popup = document.querySelector('.popup_opened');
  closePopup(popup);
};

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
     if (evt.target.classList.contains('popup__button-close')) {
        closePopup(popup)
      }
  })
});

function handleProfileFormSubmitEdit (evt) {
  evt.preventDefault();
  profileName.textContent = namePopup.value;
  profileProfession.textContent = jobPopup.value;
  closePopup(popupEdit);
};  

function openEditModal() {
  openPopup(popupEdit);
  namePopup.value = profileName.textContent;
  jobPopup.value = profileProfession.textContent;
};

const activeLikeBtn = (event) => {
  event.target.closest('.element__button_like').classList.toggle('element__button_like_active');
};

const deleteCard = (event) => {
  event.target.closest('.element').remove();
};

const handleProfileFormSubmitAdd = (evt) => {
  evt.preventDefault();
  const placeName = inputPlace.value
  const placePic = inputImage.value
  cardsElement = renderCards(placeName, placePic)
  createCard(cardsElement)
  evt.target.reset();
};

popupAddCard.addEventListener('submit', handleProfileFormSubmitAdd);
formElementEdit.addEventListener('submit', handleProfileFormSubmitEdit); 
editButton.addEventListener('click', openEditModal);
addButton.addEventListener('click', () => openPopup(popupAddCard));

function renderCards(title, img) {
  const cardsElement = cardsTemplate.cloneNode(true);
  const likeBtn = cardsElement.querySelector('.element__button_like');
  const deleteBtn = cardsElement.querySelector('.element__button_delete');
  const titleCard = cardsElement.querySelector(".element__info");
  const linkCard = cardsElement.querySelector(".element__photo");
  titleCard.textContent = title;
  linkCard.src = img;
  linkCard.alt = title;
  likeBtn.addEventListener('click', activeLikeBtn);
  deleteBtn.addEventListener('click', deleteCard);
  cardsElement.querySelector(".element__photo").addEventListener("click", function () {
  popupZoomPhoto.src = img;
  popupZoomTitle.textContent = title;
  popupZoomPhoto.alt = title;
  openPopup(popupZoomCard);
  });
  return cardsElement;
};

function createCard (cardsElement){
  elements.prepend(cardsElement);
};

initialCards.forEach(function (item) {
  cardsElement = renderCards(item.name,item.link);
  createCard(cardsElement);
});
