import './Navbar.scss'
import addrecipe from '/addrecipe.svg'
import book from '/book.svg'
import user from '/user.svg'
import { A } from '@solidjs/router'

export default function Navbar() {
  return (
    <nav class="nav">
      <div className="nav__menu">
        <A href='/'>
          <img class='nav__link-image' src={book} alt="recipe book icon" />
        </A>
        <A href='/profile'>
          <img class='nav__link-image'  src={user} alt="add recipe icon" />
        </A>
        <A href='/createrecipe'>
          <img class='nav__link-image'  src={addrecipe} alt="add recipe icon" />
        </A>
      </div>
    </nav>
  )
}
