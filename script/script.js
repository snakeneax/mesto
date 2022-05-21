const buttonEdit = document.querySelector ('.profile__edit');
const popupEdit = document.querySelector ('#popupEdit');
const formElementEdit = document.querySelector ('.popup__form_type_edit');
const namePopup = document.querySelector('.popup__input_type_name');
const jobPopup = document.querySelector('.popup__input_type_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const buttonAdd = document.querySelector ('.profile__button');
const popupAddCard = document.querySelector ('#popupAddCard');
const popupZoomCard = document.querySelector ('#popup__ShowPhoto');
const popupZoomPhoto = popupZoomCard.querySelector ('.popup__image');
const popupZoomTitle = popupZoomCard.querySelector ('.popup__image-caption')
const element = document.querySelector ('.elements');
const inputPlace = document.querySelector ('.popup__input_type_place');
const inputImage = document.querySelector ('.popup__input_type_image');
const errorText = document.querySelectorAll ('.popup__error')
const popups = document.querySelectorAll('.popup')
const cardsTemplate = document.querySelector("#cardTemplate").content.querySelector(".element");

function openPopup(popup) {
  popup.classList.add('popup_opened'); 
  document.addEventListener('keydown', handleEscPress);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscPress);
};

const handleEscPress = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__button-close') || (evt.target === evt.currentTarget)) {
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

const resetPopupEdit = () => {
  errorText.forEach((text) => text.textContent = '');
  namePopup.classList.remove('popup__input_type_error');
  jobPopup.classList.remove('popup__input_type_error');
}

function openEditModal() {
  openPopup(popupEdit);
  namePopup.value = profileName.textContent;
  jobPopup.value = profileProfession.textContent;
  resetPopupEdit()
};

const handleLikeClick = (event) => {
  event.target.closest('.element__button_like').classList.toggle('element__button_like_active');
};

const handleDeleteClick = (event) => {
  event.target.closest('.element').remove();
};

const handleProfileFormSubmitAdd = (evt) => {
  evt.preventDefault();
  const placeName = inputPlace.value;
  const placePic = inputImage.value;
  const submitButtonElement = popupAddCard.querySelector('.popup__button-save')
  const inactiveButtonClass = popupAddCard.querySelector('.popup__button-save_disabled')
  cardsElement = createCard(placeName, placePic);
  setDisabledOnSubmitButton (submitButtonElement, inactiveButtonClass);
  renderCards(cardsElement);
  closePopup(popupAddCard);
  evt.target.reset();
};

popupAddCard.addEventListener('submit', handleProfileFormSubmitAdd);
formElementEdit.addEventListener('submit', handleProfileFormSubmitEdit); 
buttonEdit.addEventListener('click', openEditModal);
buttonAdd.addEventListener('click', () => openPopup(popupAddCard));

function createCard({ name, link }) {
  const cardsElement = cardsTemplate.cloneNode(true);
  const buttonLike = cardsElement.querySelector('.element__button_like');
  const buttonDelete = cardsElement.querySelector('.element__button_delete');
  const titleCard = cardsElement.querySelector(".element__info");
  const linkCard = cardsElement.querySelector(".element__photo");
  titleCard.textContent = name;
  linkCard.src = link;
  linkCard.alt = name;
  buttonLike.addEventListener('click', handleLikeClick);
  buttonDelete.addEventListener('click', handleDeleteClick);
  cardsElement.querySelector(".element__photo").addEventListener("click", function () {
  popupZoomPhoto.src = link;
  popupZoomTitle.textContent = name;
  popupZoomPhoto.alt = name;
  openPopup(popupZoomCard);
  });
  return cardsElement;
};

function renderCards (cardsElement){
  element.prepend(cardsElement);
};

initialCards.forEach(function (item) {
  cardsElement = createCard({ name: item.name, link: item.link });
  renderCards(cardsElement);
});
