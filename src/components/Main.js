import React from "react";
import edit from "../images/edit.svg";
import plus from "../images/plus.svg";
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';


function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__position">

          <button className="button profile__avatar-edit" type="button" onClick={props.onEditAvatar}
                  onKeyDown={props.onEditAvatar}>
            <img src={currentUser.avatar} alt={currentUser.name} className="profile__avatar-image"/>
          </button>

          <div className="profile__user-info">
            <div className="profile__name-edit-position">
              <h1 className="profile__user-info-name">{currentUser.name}</h1>
              <button className="button profile__button-edit" type="button" onClick={props.onEditProfile}
                      onKeyDown={props.onEditProfile}>
                <img
                  alt="Редактировать профиль"
                  className="profile__button-edit-vector"
                  src={edit}/>
              </button>
            </div>
            <p className="profile__user-info-about">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="button profile__button-add"
          type="button"
          onClick={props.onAddCard}
          onKeyDown={props.onAddCard}
        >
          <img
            alt="Добавить карточку"
            className="profile__button-add-vector"
            src={plus}
          />
        </button>
      </section>

      <ul className="card-container">
        {props.cards.map(card => {
          return <Card
            key={card._id}
            card={card}
            onCardLike={props.onCardLike}
            onCardZoom={props.onCardZoom}
            onCardDelete={props.onCardDelete}
          />
        })}
      </ul>

    </main>
  );
}

export default Main;