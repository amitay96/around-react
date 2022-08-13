import React, { useState } from 'react';

function Card(props) {
    const [likesCount, setLikesCount] = useState(0);

    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <li className="card">
        <img 
        src={props.card.link}
        className="card__image"
        alt={props.card.name}
        onClick={handleClick}></img>
        <div className="card__title-area">
          <button type="button" className="card__delete_button"></button>
          <h2 className="card__title">{props.card.name}</h2>
          <div className=".card__like-area">
            <button className="card__like-button" type="button"></button>
            <span className="card__likes-count">{likesCount}</span>
          </div>
        </div>
      </li>
    );
}

export default Card;