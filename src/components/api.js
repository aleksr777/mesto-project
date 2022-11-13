export default class Api {
  constructor({baseUrl, headers}) {
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

  sendProfileInfo(name, profession) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: profession
      })
    })
      .then((res) => { return this._getResponseData(res) });
  }

  sendAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      })
    })
      .then((res) => { return this._getResponseData(res) });
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then((res) => { return this._getResponseData(res) });
  }

  sendNewCard(cardName, cardLink) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      })
    })
      .then((res) => { return this._getResponseData(res) });
  }

  deleteCard(card, cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
        _id: cardId
      })
    })
      .then((res) => { return this._getResponseData(res) });
  }

  putLike(likeButton, card, cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
      body: JSON.stringify({
        _id: cardId
      })
    })
      .then((res) => { return this._getResponseData(res) });
  }

  deleteLike(button, card, cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
        _id: cardId
      })
    })
      .then((res) => { return this._getResponseData(res) });
  }
};