import React from 'react';
import Card from '../Card/Card.js';
import api from '../../utils/Api.js';

function Main(props) {

  const [userAvatar, setUserAvatar] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserData().then(res => {
      setUserAvatar(res.avatar);
      setUserName(res.name);
      setUserDescription(res.about);
    }).catch(err => console.log(err))
  }, []);

  React.useEffect(() => {
    api.getStartedCardsPack().then(res => {
      setCards(res);
    }).catch(err => console.log(err))
  }, []);

  return (
    <main className="main">

      <section className="profile position-center">
        <div className="profile__avatar-container" onClick={props.onEditAvatar} style={{ background: `no-repeat center / cover url(${userAvatar})` }}></div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__heading">{userName}</h1>
            <button type="button" className="profile__edit-button" aria-label="edit-profile" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__paragraph">{userDescription}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
      </section>

      <section className="gallery">
        <ul className="gallery__list position-center">
          {cards.map((card) => (<Card card={card} key={card._id} onCardClick={props.onCardClick} />))}
        </ul>
      </section>

    </main>
  )
}
export default Main;