export default class Card {
  constructor(data, selector, handleCardClick) {
    this._data = data;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
   
    this._handleLikeClick = this._handleLikeClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this); 
  }

// получаем карточку и нужные елементы
  _getElement() {
    this._element = document
    .querySelector(this._selector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    this.like = this._element.querySelector('.element__button_like');
    this.photo = this._element.querySelector('.element__photo');
    this.trash = this._element.querySelector('.element__button_delete');
  }

// лайк карточки
  _handleLikeClick () {
    this.like.classList.toggle('element__button_like_active');
  }

// удалить карточку
  _handleDeleteClick () {
    this._element.remove();
    this._element = null;
  }

// добавляем слушатели 
  _setEventListeners() {
    // открытие попапа по клику на фото
    this.photo.addEventListener('click', () => this._handleCardClick(this._data));

    // лайк карточки
    this.like.addEventListener('click', this._handleLikeClick);

    // удалить карточку
    this.trash.addEventListener('click', this._handleDeleteClick);
  }

//создаем карточки
  generate() {
    this._getElement();
    this._setEventListeners();
    
    this.photo.alt = this._data.title;
    this.photo.src = this._data.link;
    this._element.querySelector('.element__info').textContent = this._data.title;
    return this._element;
  }
}