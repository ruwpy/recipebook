import './Navbar.scss'
import addrecipe from '/addrecipe.svg'
import book from '/book.svg'
import userIcon from '/user.svg'
import { Link } from 'react-router-dom'
import { createClient } from "@supabase/supabase-js";
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {

  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const supabase = createClient(
    import.meta.env.VITE_SUPA_URL,
    import.meta.env.VITE_SUPA_KEY
  )

  async function Login() {
    if(user.user?.id) {
      navigate('/profile')
    } else {
      await supabase.auth.signInWithOAuth({
        provider: 'google'
      })
    }
  }

  return (
    <nav className="nav">
      <div className="nav__menu">
        <Link to='/'>
          <img className='nav__link-image' src={book} alt="recipe book icon" />
        </Link>
        <Link to='/profile'>
          <img onClick={() => Login()} className='nav__link-image' src={userIcon} alt="add recipe icon" />
        </Link>
        <Link to='/createrecipe'>
          <img className='nav__link-image' src={addrecipe} alt="add recipe icon" />
        </Link>
      </div>
    </nav>
  )
}
