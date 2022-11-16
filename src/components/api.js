export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then((res) => { return this._getResponseData(res) })
  }

  sendProfileInfo(newName, newDescription) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newDescription
      })
    })
      .then(res => this._getResponseData(res));
  }

  requestCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
      .then(res => this._getResponseData(res));
  }


  sendNewCard(imageName, imageLink) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: imageName,
        link: imageLink
      })
    })
      .then(res => this._getResponseData(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, { method: 'DELETE', headers: this._headers })
      .then(res => this._getResponseData(res));
  }

  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, { method: 'PUT', headers: this._headers })
      .then(res => this._getResponseData(res));
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, { method: 'DELETE', headers: this._headers })
      .then(res => this._getResponseData(res));
  }

  sendNewAvatar(imageLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: imageLink })
    })
      .then(res => this._getResponseData(res));
  }
}