export default class UserInfo {
  constructor(profileSelectors, profileFormFields) {
    this._userNameSelector = profileSelectors.userName;
    this._userDescriptionSelector = profileSelectors.userDescription;
    this._userAvatarSelector = profileSelectors.userAvatar;
    this._inputName = profileFormFields.userName;
    this._inputDescription = profileFormFields.userDescription;
  }

  getUserInfo() {
    return {
      name: this._userNameSelector.textContent,
      about: this._userDescriptionSelector.textContent,
      avatar: this._userAvatarSelector.src
    }
  }

  setUserInfo({ name, about, avatar }) {
    this._userNameSelector.textContent = name;
    this._userDescriptionSelector.textContent = about;
    this._userAvatarSelector.src = avatar;
  }

  setInput({ name, about }) {
    this._inputName.value = name;
    this._inputDescription.value = about;
  }
}