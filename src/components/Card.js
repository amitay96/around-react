import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = (props) => {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;

  const isLikedByCurrentUser = props.card.likes.some(
    (user) => user._id === currentUser._id
  );

  const cardLikeButtonClassName = `card__like-button ${
    isLikedByCurrentUser && "card__like-button_active"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeCard() {
    props.onLikeCard(props.card);
  }

  function handleDeleteCard() {
    props.onDeleteButtonClick(props.card);
  }

  return (
    <li className="card">
      {isOwn && (
        <button className="card__delete_button" type="button" onClick={handleDeleteCard}></button>)}
      <img className="card__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
      <div className="card__title-area">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-area">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeCard}></button>
          <span className="card__likes-count">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
};

export default Card;