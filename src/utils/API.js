import {
  authorization,
  baseUrl,
} from './constants.js';

class API {
  constructor({baseUrl, authorization}) {
    this._baseUrl = baseUrl;
    this._authorization = authorization;
  }

  _fetch(url, params) {
    return fetch(this._baseUrl + url, params)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ну вот, все пропало (Ошибка: ${res.status})`);
      })
  }

  getInitialUserInfo() {
    return this._fetch('/users/me', {
      method: 'GET',
      headers: {
        authorization: this._authorization
      }
    });
  }

  editUserInfo({name, about}) {
    return this._fetch('/users/me', {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, about})
    });
  }

  editUserAvatar({avatar}) {
    return this._fetch('/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    });
  }

  getInitialCards() {
    return this._fetch('/cards', {
      method: 'GET',
      headers: {
        authorization: this._authorization
      }
    });
  }

  postUserCard({name, link}) {
    return this._fetch('/cards', {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, link})
    });
  }

  deleteCard(cardId) {
    return this._fetch('/cards/' + cardId, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    });
  }

  changeLikeCardStatus(cardID, like) {
    return this._fetch('/cards/likes/' + cardID, {
      method: like ? 'PUT' : 'DELETE',
      headers: {
        authorization: this._authorization
      }
    });
  }

}

const api = new API({baseUrl, authorization});

export default api;

