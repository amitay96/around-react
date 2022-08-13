import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isLoading }) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Edit profile"
      name="edit-profile"
      buttonText={`${isLoading ? "Saving..." : "Save"}`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>

    <fieldset className="form__fieldset">
        <input id="name-input" type="text" name="name" placeholder="Name" className="form__input" minLength="2" maxLength="40" value={name || ""} onChange={handleNameChange} required/>
        <span id="name-input-error"></span>
        <input id="title-input" type="text" name="job" placeholder="About me" className="form__input" minLength="2" maxLength="200" value={description || ""} onChange={handleDescriptionChange} required/>
        <span id="title-input-error"></span>
    </fieldset>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
