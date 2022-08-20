import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

function App() {
  //----------------Variables----------------
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });

  //----------------Hooks----------------
  useEffect(() => {
    api.getUserInfo().then((user) => {
        setCurrentUser(user);
      }).catch((err) => console.log(err));
  }, []);


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


  const closeAllPopups = () => {
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setImagePopupOpen(false);
  };


  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCardClick = (card) => {
    setImagePopupOpen(true);
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    api.toggleLike(card._id, isLiked).then((newCard) => {
        setCards((cards) =>
          cards.map((currentCard) =>currentCard._id === card._id ? newCard : currentCard)
        );
      }).catch(err => console.log(err));
  }

  function handleCardDelete(e) {
    e.preventDefault();
    //setIsLoading(true);
    api.deleteCard(selectedCard._id).then(() => {
        //setIsLoading(false);
        const newCards = cards.filter(
          (currentCard) => currentCard._id !== selectedCard._id
        );
        setCards(newCards);
        closeAllPopups();
      }).catch(err => console.log(err));
  }

  const handleUpdateUser = ({ name, about }) => {
    //setIsLoading(true);
    api.setUserInfo({ name, about }).then((res) => {
        //setIsLoading(false);
        setCurrentUser(res);
        closeAllPopups();
      }).catch(err => console.log(err));
  };

  const handleUpdateAvatar = (url) => {
    //setIsLoading(true);
    api.setUserAvatar(url).then((res) => {
        //setIsLoading(false);
        setCurrentUser(res);
        closeAllPopups();
      }).catch(err => console.log(err));
  };

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        
        <Main
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          cards={cards}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <Footer />

        <EditProfilePopup
          //isLoading={isLoading}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          //isLoading={isLoading}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          name="add-popup"
          title="New Place"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          buttonText="Create"
        >
          <fieldset className="form__fieldset">
            <input
              className="form__input"
              id="place-name"
              type="text"
              name="name"
              placeholder="Title"
              minLength="1"
              maxLength="30"
              required
            />
            <span id="place-name-error" />
            <input
              className="form__input"
              id="place-url"
              type="url"
              name="link"
              placeholder="Image URL"
              required
            />
            <span id="place-url-error" />
          </fieldset>
        </PopupWithForm>

        <PopupWithForm
          name="delete-popup"
          title="Are you sure?"
          buttonText="Yes"
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;