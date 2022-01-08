let anchor = document.querySelector ('.profile__edit')
let popup = document.querySelector ('.popup')
let closeBtn = document.querySelector ('.popup__exit')
let namePopup = document.querySelector('.popup__input_type_name');
let jobPopup = document.querySelector('.popup__input_type_profession');
let profileName = document.querySelector('.profile__name')
let profileProfession = document.querySelector('.profile__profession')
let formElement = document.querySelector ('.popup__form');

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = namePopup.value;
  profileProfession.textContent = jobPopup.value;
  closePopup();
}
 
formElement.addEventListener('submit', formSubmitHandler); 
anchor.addEventListener('click', openPopup) 
closeBtn.addEventListener('click', closePopup) 