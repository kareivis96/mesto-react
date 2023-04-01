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
  React.useEffect(() => {
    api.getUserData().then(res => setCurrentUser(res));
  }, []);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const handleCardClick = (card) => setSelectedCard(card);
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  }

  const handleUpdateUser = (data) => api.editProfile(data).then(res => setCurrentUser(res));
  const handleUpdateAvatar = (avatar) => api.editAvatar(avatar).then(res => setCurrentUser(res));

  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    api.getStartedCardsPack().then(res => {
      setCards(res);
    }).catch(err => console.log(err))
  }, []);

  const handleLikeClick = (card) => {
    const isLiked = card.likes.some(el => el._id === currentUser._id);
    (isLiked ? api.removeLike(card._id) : api.setLike(card._id))
      .then(newCard => setCards(cards.map(el => el._id === card._id ? newCard : el)));
  }

  const handleDeleteClick = (card) => {
    api.removeCard(card._id).then(res => setCards(cards.filter(el => !(el._id === card._id))));
  }

  const handlePlaceAdd = (data) => api.addNewCard(data).then(newCard => setCards([newCard, ...cards]));

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
