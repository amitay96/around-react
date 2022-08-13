import React, { useCallback, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';

function App() {
  const[isEditProfilePopupOpen, setEditProfilePopupActive] = useState(false);
  const[isAddPlacePopupOpen, setAddCardPopupActive] = useState(false);
  const[isEditAvatarPopupOpen, setEditAvatarPopupActive] = useState(false);
  const[imagePopupActive, setImagePopupActive] = useState(false);
  const[card, setCard] = useState({name: "", link: ""});

  const handleEditProfileClick = () => {
    setEditProfilePopupActive(true);
  };

  const handleAddCardClick = () => {
    setAddCardPopupActive(true);
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupActive(true);
  };

  const handleCardClick = (card) => {
    setImagePopupActive(true);
    setCard({
      name: card.name,
      link: card.link
    });
  };

  const closeAllPopups = () => {
    setEditProfilePopupActive(false);
    setAddCardPopupActive(false);
    setEditAvatarPopupActive(false);
    setImagePopupActive(false);
    setCard({
      name: "",
      link: ""
    });
  };

  return (
    <div className="App body">
      <Header />
      <Main
      onEditProfileClick={handleEditProfileClick}
      onAddPlaceClick={handleAddCardClick}
      onEditAvatarClick={handleEditAvatarClick}
      onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
      title= "Edit profile"
      name= "edit-form"
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
      buttonText="Save"> 
      <fieldset className="form__fieldset">
        <input id="name-input" type="text" name="name" placeholder="Name" className="form__input" minLength="2" maxLength="40" required/>
        <span id="name-input-error"></span>
        <input id="title-input" type="text" name="job" placeholder="About me" className="form__input" minLength="2" maxLength="200" required/>
        <span id="title-input-error"></span>
      </fieldset>
    </PopupWithForm>

    <PopupWithForm
      title= "New Place"
      name= "add-form"
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      buttonText="Create">
      <fieldset className="form__fieldset">
        <input id="place-name" type="text" name="name" placeholder="Title" className="form__input" minLength="1" maxLength="30" required/>
        <span id="place-name-error"></span>
        <input id="place-url" type="url" name="link" placeholder="Image URL" className="form__input" required/>
        <span id="place-url-error"></span>
      </fieldset>
    </PopupWithForm>
    
    <PopupWithForm
      title= "Change profile picture"
      name= "edit-avatar-form"
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
      buttonText="Save">
      <fieldset className="form__fieldset">
        <input id="new-avatar" type="url" name="avatar" placeholder="Link to new Picture" className="form__input" required/>
        <span id="new-avatar-error"></span>
      </fieldset>
    </PopupWithForm>

    <PopupWithForm
      title= "Are you sure?"
      name= "delete-form"
      buttonText="Yes">
    </PopupWithForm>

    <div className="popup image-popup">
      <figure className="image-popup__container">
          <button className="popup__close-button" type="button"></button>
          <img className="popup__image" alt="preview of place card"></img>
          <figcaption className="popup__caption"></figcaption>
        </figure>
    </div>
    <div className="popup delete-popup">
      <div className="popup__container">
        <button className="popup__close-button popup__close-button_type_form" type="button"></button>
        <h2 className="popup__title">Are you sure?</h2>
        <form className="form" name="delete-form" >
            <button className="form__button" type="submit">Yes</button>
        </form>
      </div>
    </div>
  </div>
  );
}

export default App;
