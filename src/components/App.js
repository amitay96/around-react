import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";

function App() {
  //----------------Variables----------------
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });

  //----------------Event Handlers----------------
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setImagePopupOpen(true);
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
  };

  const closeAllPopups = () => {
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setImagePopupOpen(false);
  };

  return (
    <div className="App body">
      <Header />
      <Main
      onEditProfileClick={handleEditProfileClick}
      onAddPlaceClick={handleAddPlaceClick}
      onEditAvatarClick={handleEditAvatarClick}
      onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        name="edit-popup"
        title="Edit profile"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        buttonText="Save"
        >
          <fieldset className="form__fieldset">
            <input className="form__input" id="name-input" type="text" name="name" placeholder="Name" minLength="2" maxLength="40" required/>
            <span id="name-input-error"></span>
            <input className="form__input" id="title-input" type="text" name="job" placeholder="About me" minLength="2" maxLength="200" required/>
            <span id="title-input-error"></span>
          </fieldset>
      </PopupWithForm>

      <PopupWithForm
        name="add-popup"
        title="New Place"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        buttonText="Create"
        >
          <fieldset className="form__fieldset">
            <input className="form__input" id="place-name" type="text" name="name" placeholder="Title" minLength="1" maxLength="30" required/>
            <span id="place-name-error"></span>
            <input className="form__input" id="place-url" type="url" name="link" placeholder="Image URL" required/>
            <span id="place-url-error"></span>
          </fieldset>
      </PopupWithForm>

      <PopupWithForm
        name="avatar-popup"
        title="Change profile picture"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        buttonText="Save"
        >
          <fieldset className="form__fieldset">
            <input className="form__input" id="new-avatar" type="url" name="avatar" placeholder="Link to new Picture" required/>
            <span id="new-avatar-error"></span>
          </fieldset>
      </PopupWithForm>

      <PopupWithForm
        name="delete-popup"
        title="Are you sure?"
        buttonText="Yes"
        >
      </PopupWithForm>
    
      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;