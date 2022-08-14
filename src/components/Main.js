import React, { useState, useEffect } from 'react';
import Card from './Card';
import { api } from '../utils/api.js';

const Main = (props) => {
  const [ userName, setUserName ] = useState("");
  const [ userDescription, setUserDescription ] = useState("");
  const [ userAvatar, setUserAvatar ] = useState("");
  const [ cards, setCards ] = useState([]);

  useEffect(() => {
    api.getUserInfo().then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      }).catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api.getInitialCards().then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
      <main className="content">
      <section className="profile">
        <div className="profile__image-container" onClick={props.onEditAvatarClick}>
          <img className="profile__image" src={userAvatar} alt="Users Round Avatar"/>
        </div>
        <div className="profile__info">
            <div className="profile__person">
                <h1 className="profile__name">{userName}</h1>
                <button className="profile__edit-button" type="button" onClick={props.onEditProfileClick}></button>
            </div>
            <p className="profile__title">{userDescription}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlaceClick}></button>
      </section>
      <section className="cards">
          <ul className="cards__list">
          {cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                onCardClick={props.onCardClick}
              />
            );
          })}
          </ul>
      </section>
    </main>
  );
};

export default Main;