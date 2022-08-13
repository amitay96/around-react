import React from 'react';

function PopupWithForm(props) {
    return (
      <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup__active" : " "}`}>
        <div className="popup__container">
          <button className="popup__close-button" type="button" onClick={props.onClose}></button>
          <h2 className="popup__title">{props.title}</h2>
          <form className="form" name={props.name} >
            {props.children}
            <fieldset className="form__fieldset">
              <button className="form__button" type="submit">{props.buttonText}</button>
            </fieldset>
          </form>
        </div>
      </div>
    );
}

export default PopupWithForm;