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
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
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

  return (
    <>
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
      <Footer />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <PopupWithForm name="edit-profile" title="Редактировать профиль" buttonText="Сохранить" isOpened={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <div className="popup__input-wrapper">
          <input name="formName" type="text" className="popup__input" placeholder="Имя" required minLength="2" maxLength="40" />
          <p className="popup__error-text"></p>
        </div>
        <div className="popup__input-wrapper">
          <input name="formJob" type="text" className="popup__input" placeholder="Род занятий" required minLength="2" maxLength="200" />
          <p className="popup__error-text"></p>
        </div>
      </PopupWithForm>
      <PopupWithForm name="add-card" title="Новое место" buttonText="Создать" isOpened={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <div className="popup__input-wrapper">
          <input id="add-card-input-name" name="addFormName" type="text" className="popup__input" placeholder="Название" required minLength="2" maxLength="30" />
          <p className="popup__error-text"></p>
        </div>
        <div className="popup__input-wrapper">
          <input id="add-card-input-url" name="addFormUrl" type="url" className="popup__input" placeholder="Ссылка на картинку" required />
          <p className="popup__error-text"></p>
        </div>
      </PopupWithForm>
      <PopupWithForm name="change-avatar" title="Обновить аватар" buttonText="Сохранить" isOpened={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <div className="popup__input-wrapper">
          <input id="change-avatar-input-url" name="avatar" type="url" className="popup__input" placeholder="Ссылка на картинку" required />
          <p className="popup__error-text"></p>
        </div>
      </PopupWithForm>

    </>
  );
}
export default App;
