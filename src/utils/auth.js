import BadRequestError from '../errors/BadRequestError';
import UnauthorizedError from '../errors/UnauthorizedError';
import { BASE_URL } from './constants';

export const register = (password, email) => fetch(`${BASE_URL}/signup`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ password, email }),
})
  .then((res) => {
    if (!res.ok) {
      return res.json()
        .then((err) => {
          if (err.error) {
            throw new BadRequestError(err.error);
          } else {
            throw new BadRequestError(err.message);
          }
        });
    }
    return res.json();
  });

export const authorize = (password, email) => fetch(`${BASE_URL}/signin`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ password, email }),
})
  // Коды ошибок из задания: 400 - не передано одно из полей,  401 - пользователь с email не найден
  // не соответствуют реальности. Хотя это может быть мой косяк
  .then((res) => {
    if (res.status === 400) {
      throw new BadRequestError('Данные переданы не полностью или с ошибкой');
    }
    if (res.status === 401) {
      throw new UnauthorizedError('Данные переданы не полностью или с ошибкой');
    }
    return res.json();
  })
  // eslint-disable-next-line consistent-return
  .then((data) => {
    if (data.token) {
      localStorage.setItem('jwt', data.token);

      return data.token;
    }
  });

export const getContent = (token) => fetch(`${BASE_URL}/users/me`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => {
    if (!res.ok) {
      return res.json()
        .then((err) => {
          throw new UnauthorizedError(err.message);
        });
    }
    return res.json();
  })
  .then((data) => data);
