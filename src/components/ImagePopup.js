import React from "react";

const ImagePopup = (props) => {
  return (
    <div className={`popup popup__image ${props.isOpen ? "popup__active" : ""}`}>
      <div className="popup__container image-popup__container">
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
        <img className="popup__image" src={props.card.link} alt="place"/>
        <p className="popup__caption">{props.card.name}</p>
      </div>
    </div>
  );
};

export default ImagePopup;
