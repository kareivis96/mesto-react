import logo from '../../images/logo_white.svg';

function Header() {
  return (
    <header className="header position-center">
      <img src={logo} alt="логотип" className="header__logo" />
    </header>
  )
}
export default Header;