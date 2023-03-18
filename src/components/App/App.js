import React from 'react';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import ImagePopup from '../ImagePopup/ImagePopup.js';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState('');
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleCardClick = (card) => setSelectedCard(card);
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard('');
  }

  return (
    <>
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
      <Footer />

      <PopupWithForm name="edit-profile" title="Редактировать профиль" buttonText="Сохранить" isOpened={isEditProfilePopupOpen} onClose={closeAllPopups} />
      <PopupWithForm name="add-card" title="Новое место" buttonText="Создать" isOpened={isAddPlacePopupOpen} onClose={closeAllPopups} />
      <PopupWithForm name="change-avatar" title="Обновить аватар" buttonText="Сохранить" isOpened={isEditAvatarPopupOpen} onClose={closeAllPopups} />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </>
  );
}
export default App;
