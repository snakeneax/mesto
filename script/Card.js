import openPopup from "./script.js";

export default class Card {
  _popupZoomCard = document.querySelector ('#popup__ShowPhoto');
  _popupZoomPhoto = this._popupZoomCard.querySelector ('.popup__image');
  _popupZoomTitle = this._popupZoomCard.querySelector ('.popup__image-caption');
  
 
  constructor(data, cardSelector) {
    this._data = data;
    this._cardSelector = cardSelector;

  this._handleLikeClick = this._handleLikeClick.bind(this);
  this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

// получаем карточку
  _getElement() {
    this._element = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);
  }

// сбрасываем значения попапа
  _resetShowPhotoPopup(){
    this._popupZoomPhoto.src = '';
    this._popupZoomPhoto.alt = '';
    this._popupZoomTitle.textContent = '';
  }

// открываем попап
  _openShowPhotoPopup({name, link}) {
    this._resetShowPhotoPopup();
    this._popupZoomPhoto.src = link;
    this._popupZoomPhoto.alt = name;
    this._popupZoomTitle.textContent = name;

    openPopup(this._popupZoomCard);
  }

// лайк карточки
  _handleLikeClick () {
    this._element.querySelector('.element__button_like').classList.toggle('element__button_like_active');
  }

// удалить карточку
  _handleDeleteClick () {
    this._element.remove();
  }

// добавляем слушатели 
  _setEventListeners() {
    // открытие попапа по клику на фото
    const photo = this._element.querySelector('.element__photo');
    photo.addEventListener('click', () => this._openShowPhotoPopup(this._data));

    // лайк карточки
    const like = this._element.querySelector('.element__button_like');
    like.addEventListener('click', this._handleLikeClick);

    // удалить карточку
    const trash = this._element.querySelector('.element__button_delete');
    trash.addEventListener('click', this._handleDeleteClick);
  }

//создаем карточку
  generate() {
    this._getElement();
    this._setEventListeners();

    const photo = this._element.querySelector('.element__photo');
    photo.alt = this._data.name;
    photo.src = this._data.link;

    this._element.querySelector('.element__info').textContent = this._data.name;

    return this._element;
  }
}