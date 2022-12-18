import { createEffect, createSignal } from 'solid-js'
import logo from '/logo.png'
import './Navbar.scss'

export default function Navbar() {

  const [inputValue, setInputValue] = createSignal('')
  const [isInputActive, setIsInputActive] = createSignal(false)

  return (
    <nav class="nav container">
      <div className={`nav__inner${isInputActive() ? ' active' : ''}`}>
        <img class='nav__logo hide-for-mobile' src={logo} alt="logo" />
        <input
          class='nav__input' 
          type="text"
          maxLength={64}
          onFocus={() => setIsInputActive(true)}
          onBlur={() => setIsInputActive(false)}
          onInput={(e) => setInputValue(e.target.value)}
          value={inputValue()}
          placeholder='введите название блюда...'
        />
      </div>
    </nav>
  )
}
