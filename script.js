let anchor = document.querySelector (".profile__edit")
let popup = document.querySelector (".popup")
let closeBtn = document.querySelector (".popup__exit")

function openPopup() {
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

anchor.addEventListener("click", openPopup) 
closeBtn.addEventListener("click", closePopup) 

let formElement = document.querySelector (".popup__form");

function formSubmitHandler (evt) {

  evt.preventDefault();

  let namePopup = document.querySelector(".popup__name").value;
  let jobPopup = document.querySelector(".popup__profession").value;

  let profileName = document.querySelector(".profile__name")
  let profileProfession = document.querySelector(".profile__profession")

  profileName.textContent = namePopup;
  profileProfession.textContent = jobPopup;

  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler); 