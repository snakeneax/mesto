const editButton = document.querySelector ('.profile__edit');
const popupEdit = document.querySelector ('#popupEdit');
const closeBtnEdit = document.querySelector ('.popup__exit_edit');
const formElementEdit = document.querySelector ('.popup__form_type_edit');
const namePopup = document.querySelector('.popup__input_type_name');
const jobPopup = document.querySelector('.popup__input_type_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const popupForm = document.querySelector('.popup__form');
const AddButton = document.querySelector ('.profile__button');
const popupAddCard = document.querySelector ('#popupAddCard');
const popupZoomCard = document.querySelector ('#popup__ShowPhoto');
const popupZoomPhoto = popupZoomCard.querySelector ('.popup__image');
const popupZoomTitle = popupZoomCard.querySelector ('.popup__image-caption')
const closeBtnAdd = document.querySelector ('.popup__exit_add');
const elements = document.querySelector ('.elements');
const inputPlace = document.querySelector ('.popup__input_type_place');
const inputImage = document.querySelector ('.popup__input_type_image');
const cardsTemplate = document.querySelector("#cardTemplate").content;
const addCard = document.querySelector('.popup__save');
const ClosePopupImg = popupZoomCard.querySelector('.popup__exit_add')
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
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

function openAddModal() {
  openPopup(popupAddCard);
};

function render() {
  cardsInfo.forEach(renderCards);
};

function formSubmitHandlerEdit (evt) {
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

function renderCards({ name, link }) {
  const cardsElement = cardsTemplate.querySelector(".element").cloneNode(true);
  const likeBtn = cardsElement.querySelector('.element__button_like');
  const deleteBtn = cardsElement.querySelector('.element__button_delete');
  cardsElement.querySelector(".element__info").textContent = name;
  cardsElement.querySelector(".element__photo").src = link;
  elements.prepend(cardsElement);
  likeBtn.addEventListener('click', ActiveLikeBtn);
  deleteBtn.addEventListener('click', DeleteCard);
  cardsElement.querySelector(".element__photo").addEventListener("click", function () {
  popupZoomPhoto.src = link;
  popupZoomTitle.textContent = name;
  popupZoomCard.classList.add("popup_opened");
  });

};

function openZoomModal() {
  openPopup(popupZoomCard);
};

function closeZoomModal() {
  popupZoomCard.classList.remove("popup_opened");
}

const cardsInfo = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link
  };
});

const ActiveLikeBtn = (event) => {
  event.target.closest('.element__button_like').classList.toggle('element__button_like_active');
};

const DeleteCard = (event) => {
  event.target.closest('.element').remove();
};

const formSubmitHandlerAdd = (evt) => {
  evt.preventDefault();
  renderCards({ name: inputPlace.value, link: inputImage.value });
  closePopup(popupAddCard);
  evt.target.reset();
};


popupAddCard.addEventListener('submit', formSubmitHandlerAdd);
formElementEdit.addEventListener('submit', formSubmitHandlerEdit); 
editButton.addEventListener('click', openEditModal);
AddButton.addEventListener('click', openAddModal);
closeBtnEdit.addEventListener('click', () => closePopup(popupEdit));
closeBtnAdd.addEventListener('click', () => closePopup(popupAddCard));
ClosePopupImg.addEventListener('click', closeZoomModal)
render();
