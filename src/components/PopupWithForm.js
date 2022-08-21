import React from "react";

function PopupWithForm({
  isOpen,
  onClose,
  onSubmit,
  name,
  title,
  buttonText,
  children,
}) {
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup__active" : " "}`}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form className="form" name={name} action="submit" onSubmit={onSubmit}>
          {children}
          <fieldset className="form__fieldset">
            <button className="form__button" type="submit">
              {buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
