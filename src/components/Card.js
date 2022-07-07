export default class Card {
  constructor(data, selector, handleCardClick, handleTrashClick, handleLikeClick, userId) {
    this._selector = selector;
    this._handleCardClick = handleCardClick; 
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
    this._data = data;
    this._id = data.id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id 
    this._userId = userId;
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

// обновляем информацию о лайках
  updateLikes(data) {
    this._likes = data.likes;
  }

// Лайк
  isLiked () {
    return Boolean(this._likes.find((item) => 
    item._id === this._userId));
  }

// Активация кнопки лайка
  updateLikesActive() {
    this._likesCounter.textContent = this._likes.length;
    if (this.isLiked()) {
      this.like.classList.add('element__button_like_active');
    } else {
      this.like.classList.remove('element__button_like_active');
    }
  }

// удалить карточку
  deleteCard () {
    this._element.remove();
    this._element = null;
  }

// добавляем слушатели 
  _setEventListeners() {
    // открытие попапа по клику на фото
    this.photo.addEventListener('click', () => this._handleCardClick(this._data));

    // лайк карточки
    this.like.addEventListener('click', () => this._handleLikeClick());

    // удалить карточку
    this.trash.addEventListener('click', () => this._handleTrashClick());
  }

//создаем карточки
  generate() {
    this._getElement();

    this._element.querySelector('.element__info').textContent = this._name;
    
    this.photo.alt = this._name;
    this.photo.src = this._link;

    this._likesCounter = this._element.querySelector('.element__like-counter')
    this._likesCounter.textContent = this._likes.length;

    if (this._ownerId !== this._userId) {
      this.trash.classList.add('element__button_delete_hidden')
    } 

    if (this.isLiked()) {
      this.like.classList.add('element__button_like_active')
    }

    this._setEventListeners();
    return this._element;
  }
}