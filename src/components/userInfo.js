export default class UserInfo {
  constructor(selectors) {
    this._userNameNode = document.querySelector(selectors.profileName);
    this._userAboutNode = document.querySelector(selectors.profileProfession);
    this._userAvatarNode = document.querySelector(selectors.profileAvatar);
    this._inputName = document.querySelector(selectors.inputName);
    this._inputAbout = document.querySelector(selectors.inputProfession); 
  }

  getUserInfo(data) {
    return {
      name: data.name,
      about: data.about,
      avatar: data.avatar
    }
  }

  setUserNameProfession({ name, about }) {
    this._userNameNode.textContent = name;
    this._userAboutNode.textContent = about;
  }

  setUserAvatar({ avatar }) {
    this._userAvatarNode.src = avatar;
  }

  setUserInfo(data) {
    this.setUserNameProfession(data);
    this.setUserAvatar(data);
  }

  setInput({ name, about }) {
    this._inputName.value = name;
    this._inputAbout.value = about;
  }
}