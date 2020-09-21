import React from "react";
import trash from "../images/trash.svg";
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card(props) {
  const card = props.card;

  const currentUser = React.useContext(CurrentUserContext);

// Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

// Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `button card__button-delete ${isOwn ? '' : 'card__button-delete_invisible'}`
  );

// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);

// Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `button card__button-like ${isLiked ? 'card__button-like_solid' : ''}`
  );


  const handleZoomClick = () => {
    props.onCardZoom(card);
  };

  const handleLikeClick = () => {
    props.onCardLike(card);
  };

  const handleDeleteClick = () => {
    props.onCardDelete(card);
  };

  return (
    <li className="card">
      <img src={card.link} alt={card.name} className="card__image" onClick={handleZoomClick}/>
      <button className={cardDeleteButtonClassName} type="submit" onClick={handleDeleteClick}>
        <img alt="Удалить" className="card__button-delete-vector" src={trash}  />
      </button>
      <div className="card__description">
        <h2 className="card__name">{card.name}</h2>
        <div className="card__likes-container">
          <button className={cardLikeButtonClassName} type="submit" onClick={handleLikeClick}/>
          <p className="card__count-likes">{card.likes.length}</p>
        </div>
      </div>

    </li>
  );
}

export default Card;