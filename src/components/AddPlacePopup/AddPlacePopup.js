import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  const handleNameInput = (evt) => setName(evt.target.value);
  const handleLinkInput = (evt) => setLink(evt.target.value);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onAddPlace({ name, link });
    props.onClose();
    setName('');
    setLink('');
  }

  return (
    <PopupWithForm name="add-card" title="Новое место" buttonText="Создать" isOpened={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <div className="popup__input-wrapper">
        <input value={name} onChange={handleNameInput} type="text" className="popup__input" placeholder="Название" required minLength="2" maxLength="30" />
        <p className="popup__error-text"></p>
      </div>
      <div className="popup__input-wrapper">
        <input value={link} onChange={handleLinkInput} type="url" className="popup__input" placeholder="Ссылка на картинку" required />
        <p className="popup__error-text"></p>
      </div>
    </PopupWithForm>
  );
}
export default AddPlacePopup;