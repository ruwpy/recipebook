import logo from '../../assets/logo.png'
import './Navbar.scss'

export default function Navbar() {
  return (
    <nav class="nav container">
      <div className="nav__inner">
        <img class='nav__logo hide-for-mobile' src={logo} alt="logo" />
        <input
          class='nav__input' 
          type="text"
          placeholder='введите название блюда...'
        />
        <span class='nav__burger'>
          <span></span>
          <span></span>
        </span>
      </div>
    </nav>
  )
}
