function Card(props) {

  const handleClick = () => props.onCardClick(props.card);

  return (
    <article className="card">
      <div className="card__img" style={{ background: `no-repeat center / cover url(${props.card.link}) #000` }} onMouseDown={handleClick}></div>
      <div className="card__container">
        <h2 className="card__text">{props.card.name}</h2>
        <div className="card__like-container">
          <button type="button" className="card__like-button"></button>
          <p className="card__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
      <button type="button" className="card__delete-button"></button>
    </article>
  );
}
export default Card;