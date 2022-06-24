import openPopup from "./script.js";

const _popupZoomCard = document.querySelector ('#popup__ShowPhoto');
const _popupZoomPhoto = _popupZoomCard.querySelector ('.popup__image');
const _popupZoomTitle = _popupZoomCard.querySelector ('.popup__image-caption');

export default class Card {

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

    this.like = this._element.querySelector('.element__button_like');
    this.photo = this._element.querySelector('.element__photo');
  }

// сбрасываем значения попапа
  _resetShowPhotoPopup(){
    _popupZoomPhoto.src = '';
    _popupZoomPhoto.alt = '';
    _popupZoomTitle.textContent = '';
  }

// открываем попап
  _openShowPhotoPopup({name, link}) {
    this._resetShowPhotoPopup();
    _popupZoomPhoto.src = link;
    _popupZoomPhoto.alt = name;
    _popupZoomTitle.textContent = name;

    openPopup(_popupZoomCard);
  }

// лайк карточки
  _handleLikeClick () {
    this.like.classList.toggle('element__button_like_active');
  }

// удалить карточку
  _handleDeleteClick () {
    this._element.remove();
  }

// добавляем слушатели 
  _setEventListeners() {
    // открытие попапа по клику на фото
    this.photo.addEventListener('click', () => this._openShowPhotoPopup(this._data));

    // лайк карточки
    this.like.addEventListener('click', this._handleLikeClick);

    // удалить карточку
    const trash = this._element.querySelector('.element__button_delete');
    trash.addEventListener('click', this._handleDeleteClick);
  }

//создаем карточку
  generate() {
    this._getElement();
    this._setEventListeners();
    
    this.photo.alt = this._data.name;
    this.photo.src = this._data.link;

    this._element.querySelector('.element__info').textContent = this._data.name;

    return this._element;
  }
}