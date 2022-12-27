import './Search.scss'
import lupa from '/lupa.svg'
import Filter from '../Filter/Filter'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearch } from '../../store/slices/searchSlice'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState('')
  const [isInputActive, setIsInputActive] = useState(false)

  function searchHandle() {
    navigate('/')
    dispatch(setSearch(inputValue))
  }

  function handleKeypress(e) {
    if (e.keyCode === 13) {
      searchHandle()
    }
  }

  return (
    <div className="search" onKeyDown={handleKeypress}>
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
        <img onClick={() => searchHandle()} className={`search__confirm ${inputValue ? 'active' : ''}`} src={lupa} alt="arrow to right" />
      </div>
    </div>
  )
}
