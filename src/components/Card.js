import React from "react";

const Card = (props) => {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="card">
      <button className="card__delete_button" type="button" />
      <img
        className="card__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="card__title-area">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-area">
          <button className="card__like-button" type="button" />
          <span className="card__likes-count">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
};

export default Card;