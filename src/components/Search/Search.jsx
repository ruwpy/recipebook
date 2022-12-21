import './Search.scss'
import lupa from '/lupa.svg'
import Filter from '../Filter/Filter'
import { useState } from 'react'

export default function Navbar() {

  const [inputValue, setInputValue] = useState('')
  const [isInputActive, setIsInputActive] = useState(false)

  return (
    <div className="search">
      <div className={`search__overlay${isInputActive ? ' active' : ''}`} onClick={() => setIsInputActive(false)}>
        <Filter />
      </div>
      <div className={`search__form${isInputActive ? ' active' : ''}`}>
        <input
          className='search__input' 
          type="text"
          maxLength={64}
          onFocus={() => setIsInputActive(true)}
          onInput={(e) => setInputValue(e.target.value)}
          value={inputValue}
          placeholder='поиск рецептов'
        />
        <span onClick={() => setIsInputActive(false)} className={`search__confirm${inputValue ? ' active' : ''}`}>
          <span className='search__confirm--result'>найдено 5 рецептов</span>
          <img className='search__confirm--icon' src={lupa} alt="arrow to right" />
        </span>
      </div>
    </div>
  )
}
