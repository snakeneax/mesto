export default class UserInfo {
  constructor (nameSelector, professionSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._profession = document.querySelector(professionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo () {
    return {
      name: this._name.textContent,
      profession: this._profession.textContent
    }
  }

  setUserInfo ({name, about, avatar}) {
    this._name.textContent = name;
    this._profession.textContent = about;
    this._avatar.style.backgroundImage = `url(${avatar})`;
  }
}