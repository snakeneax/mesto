let editButton = document.querySelector ('.profile__edit');
let popupEdit = document.querySelector ('#popupEdit');
let closeBtnEdit = document.querySelector ('.popup__exit');
let namePopup = document.querySelector('.popup__input_type_name');
let jobPopup = document.querySelector('.popup__input_type_profession');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let formElementEdit = document.querySelector ('.popup__form');

function openPopupEdit() {
  popupEdit.classList.add('popup_opened');
};

function closePopupEdit() {
  popupEdit.classList.remove('popup_opened');
};

function formSubmitHandlerEdit (evt) {
  evt.preventDefault();
  profileName.textContent = namePopup.value;
  profileProfession.textContent = jobPopup.value;
  closePopupEdit(popupEdit);
};  

function openEditModal() {
  openPopupEdit();
  namePopup.value = profileName.textContent;
  jobPopup.value = profileProfession.textContent;
};

formElementEdit.addEventListener('submit', formSubmitHandlerEdit); 
editButton.addEventListener('click', openEditModal);
closeBtnEdit.addEventListener('click', closePopupEdit);
