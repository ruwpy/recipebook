import './Navbar.scss'
import addrecipe from '/addrecipe.svg'
import book from '/book.svg'
import userIcon from '/user.svg'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoginModal from '../LoginModal/LoginModal'
import { useState } from 'react'

export default function Navbar() {

  const user = useSelector(state => state.user)
  const [isLoginModalActive, setIsLoginModalActive] = useState(false)

  async function openLoginModal() {
    setIsLoginModalActive(true)
  }

  return (
    <>
      <nav className="nav">
        <div className="nav__menu">
          <NavLink to='/'>
            <img className='nav__link-image' src={book} alt="recipe book icon" />
          </NavLink>
          {
            user.userData ? (
              <NavLink to='/profile'>
                <img className='nav__link-image' src={userIcon} alt="add recipe icon" />
              </NavLink>
            ) : (
              <span className='nav__link' onClick={() => openLoginModal()}>
                <img className='nav__link-image' src={userIcon} alt="add recipe icon" />
              </span>
            )
          }
          <NavLink to='/createrecipe'>
            <img className='nav__link-image' src={addrecipe} alt="add recipe icon" />
          </NavLink>
        </div>
      </nav>
      <LoginModal isLoginModalActive={isLoginModalActive} setIsLoginModalActive={setIsLoginModalActive} />
    </>
  )
}
