import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from "./ImagePopup";
import { api } from '../utils/api.js';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePopup from "./DeletePopup";

function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePreviewOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    api.getUserInfo().then((user) => {
        setCurrentUser(user);
      }).catch(console.log);
  }, []);

  useEffect(() => {
    api.getInitialCards().then((res) => {
        setCards(res);
      })
      .catch(console.log);
  }, []);

  //Event Handlers
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleDeleteButtonClick = (card) => {
    setDeletePopupOpen(true);
    setSelectedCard(card);
  };

  const handleCardClick = (card) => {
    setImagePreviewOpen(true);
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
  };

  const closeAllPopups = () => {
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setImagePreviewOpen(false);
    setDeletePopupOpen(false);
  };

  const handleUpdateUser = ({ name, about }) => {
    setIsLoading(true);
    api.setUserInfo({ name, about }).then((res) => {
        setIsLoading(false);
        setCurrentUser(res);
        closeAllPopups();
      }).catch(console.log);
  };

  const handleUpdateAvatar = (url) => {
    setIsLoading(true);
    api.setUserAvatar(url).then((res) => {
        setIsLoading(false);
        setCurrentUser(res);
        closeAllPopups();
      }).catch(console.log);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    api.toggleLike(card._id, isLiked).then((newCard) => {
        setCards((cards) =>
          cards.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      }).catch(console.log);
  }

  function handleCardDelete(e) {
    e.preventDefault();
    setIsLoading(true);
    api.deleteCard(selectedCard._id).then(() => {
        setIsLoading(false);
        const newCards = cards.filter(
          (currentCard) => currentCard._id !== selectedCard._id
        );
        setCards(newCards);
        closeAllPopups();
      }).catch(console.log);
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api.createCard(card).then((card) => {
        setIsLoading(false);
        setCards([card, ...cards]);
        closeAllPopups();
      }).catch(console.log);
  }

  return (
    <div className="App body">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
        onDeleteButtonClick={handleDeleteButtonClick}
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onEditAvatarClick={handleEditAvatarClick}
        onCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        />
        <Footer />

        <EditProfilePopup
          isLoading={isLoading}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isLoading={isLoading}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isLoading={isLoading}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <DeletePopup
          isLoading={isLoading}
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmitDelete={handleCardDelete}
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
