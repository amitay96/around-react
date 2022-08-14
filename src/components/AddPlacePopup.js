import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isLoading, isOpen, onClose, onAddPlaceSubmit }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleNewName(e) {
    setName(e.target.value);
  }

  function handleNewLink(e) {
    console.log(e.target.value);
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit({ name, link });
    setName("");
    setLink("");
  }

  return (
    <PopupWithForm
      title="New place"
      name="add-place"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={`${isLoading ? "Creating..." : "Create"}`}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fieldset">
        <input id="place-name" type="text" name="name" placeholder="Title" className="form__input" minLength="1" maxLength="30" value={name || ""} onChange={handleNewName} required/>
        <span id="place-name-error"></span>
        <input id="place-url" type="url" name="link" placeholder="Image URL" className="form__input" value={link || ""} onChange={handleNewLink} required/>
        <span id="place-url-error"></span>
      </fieldset>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
