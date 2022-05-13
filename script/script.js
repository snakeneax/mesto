let editButton = document.querySelector ('.profile__edit');
let popupEdit = document.querySelector ('#popupEdit');
let closeBtnEdit = document.querySelector ('.popup__exit_edit');
let formElementEdit = document.querySelector ('.popup__form_type_edit');
let namePopup = document.querySelector('.popup__input_type_name');
let jobPopup = document.querySelector('.popup__input_type_profession');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let popupForm = document.querySelector('.popup__form')
let AddButton = document.querySelector ('.profile__button');
let popupAddCard = document.querySelector ('#popupAddCard');
let closeBtnAdd = document.querySelector ('.popup__exit_add');
let elements = document.querySelector ('.elements');
let inputPlace = document.querySelector ('.popup__input_type_place');
let inputImage = document.querySelector ('.popup__input_type_image');
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

function openAddModal() {
  openPopup(popupAddCard);
};

formElementEdit.addEventListener('submit', formSubmitHandlerEdit); 
editButton.addEventListener('click', openEditModal);
AddButton.addEventListener('click', openAddModal);
closeBtnEdit.addEventListener('click', () => closePopup(popupEdit));
closeBtnAdd.addEventListener('click', () => closePopup(popupAddCard));

//cards render 

const cardsTemplate = document.querySelector("#cardTemplate").content;

const cardsInfo = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link
  };
});

function render() {
  cardsInfo.forEach(renderCards);
};

const ActiveLikeBtn = (event) => {
  event.target.closest('.element__button_like').classList.toggle('element__button_like_active')
};

const DeleteCard = (event) => {
  event.target.closest('.element').remove();
};

function renderCards({ name, link }) {
  const cardsElement = cardsTemplate.querySelector(".element").cloneNode(true);
  cardsElement.querySelector(".element__info").textContent = name;
  cardsElement.querySelector(".element__photo").src = link;
  elements.prepend(cardsElement);

  const likeBtn = cardsElement.querySelector('.element__button_like')
  likeBtn.addEventListener('click', ActiveLikeBtn)

  const deleteBtn = cardsElement.querySelector('.element__button_delete')
  deleteBtn.addEventListener('click', DeleteCard)
}
render();

// add cards 

const addCard = document.querySelector('.popup__save')

const formSubmitHandlerAdd = (evt) => {
  evt.preventDefault();
  renderCards({ name: inputPlace.value, link: inputImage.value })
  closePopup(popupAddCard);
  evt.target.reset();
};

popupAddCard.addEventListener('submit', formSubmitHandlerAdd);



//like card 

//const likebtn = cardsTemplate.querySelector(".element__button_like");

//likebtn.addEventListener('click',function (evt) {
  //evt.target.classList.toggle('element__button_like_active');
//});
