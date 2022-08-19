import React from "react";

const ImagePopup = (props) => {
  return (
    <div className={`popup image-popup ${props.isOpen ? "popup__active" : ""}`}>
      <figure  className="image-popup__container">
        <button className="popup__close-button" type="button" onClick={props.onClose} />
        <img className="popup__image" src={props.card.link} alt="place"/>
        <p className="popup__caption">{props.card.name}</p>
      </figure>
    </div>
  );
};

export default ImagePopup;
