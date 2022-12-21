import './Navbar.scss'
import addrecipe from '/addrecipe.svg'
import book from '/book.svg'
import user from '/user.svg'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav__menu">
        <Link to='/'>
          <img className='nav__link-image' src={book} alt="recipe book icon" />
        </Link>
        <Link to='/profile'>
          <img className='nav__link-image'  src={user} alt="add recipe icon" />
        </Link>
        <Link to='/createrecipe'>
          <img className='nav__link-image'  src={addrecipe} alt="add recipe icon" />
        </Link>
      </div>
    </nav>
  )
}
