import React from 'react';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup.js';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup.js';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup.js';
import ImagePopup from '../ImagePopup/ImagePopup.js';
import CurrentUserContext from '../../contexts/CurrentUserContexts.js';
import api from '../../utils/Api.js';

function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [cards, setCards] = React.useState([]);

  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleCardClick = (card) => setSelectedCard(card);
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  }
  const handleUpdateUser = (data) => api.editProfile(data)
    .then(res => setCurrentUser(res))
    .catch(err => console.log(err));
  const handleUpdateAvatar = (avatar) => api.editAvatar(avatar)
    .then(res => setCurrentUser(res))
    .catch(err => console.log(err));

  React.useEffect(() => {
    api.getUserData().then(res => setCurrentUser(res));
  }, []);

  React.useEffect(() => {
    api.getStartedCardsPack().then(res => {
      setCards(res);
    }).catch(err => console.log(err))
  }, []);

  const handleLikeClick = (card) => {
    const isLiked = card.likes.some(el => el._id === currentUser._id);
    (isLiked ? api.removeLike(card._id) : api.setLike(card._id))
      .then(newCard => setCards(cards.map(el => el._id === card._id ? newCard : el)))
      .catch(err => console.log(err));
  }

  const handleDeleteClick = (card) => {
    api.removeCard(card._id)
      .then(res => setCards(cards.filter(el => !(el._id === card._id))))
      .catch(err => console.log(err));
  }

  const handlePlaceAdd = (data) => api.addNewCard(data)
    .then(newCard => setCards([newCard, ...cards]))
    .catch(err => console.log(err));

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        cards={cards}
        onLikeClick={handleLikeClick}
        onDeleteClick={handleDeleteClick}
      />
      <Footer />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handlePlaceAdd}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

    </CurrentUserContext.Provider>
  );
}
export default App;
