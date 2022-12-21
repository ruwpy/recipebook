import { createSignal } from 'solid-js'
import './Search.scss'
import lupa from '/lupa.svg'
import caretdown from '/caretdown.svg'
import Filter from '../Filter/Filter'

export default function Navbar() {

  const [inputValue, setInputValue] = createSignal('')
  const [isInputActive, setIsInputActive] = createSignal(false)

  return (
    <div class="search">
      <div class={`search__overlay${isInputActive() ? ' active' : ''}`} onClick={() => setIsInputActive(false)}>
        <Filter />
      </div>
      <div className={`search__form${isInputActive() ? ' active' : ''}`}>
        <input
          class='search__input' 
          type="text"
          maxLength={64}
          onFocus={() => setIsInputActive(true)}
          onInput={(e) => setInputValue(e.target.value)}
          value={inputValue()}
          placeholder='поиск рецептов'
        />
        <span onClick={() => setIsInputActive(false)} class={`search__confirm${inputValue() ? ' active' : ''}`}>
          <span class='search__confirm--result'>найдено 5 рецептов</span>
          <img class='search__confirm--icon' src={lupa} alt="arrow to right" />
        </span>
      </div>
    </div>
  )
}
