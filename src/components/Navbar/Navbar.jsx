import './Navbar.scss'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import search from '/search.svg'
import { motion } from 'framer-motion'
import DarkModeSwitcher from '../DarkModeSwitcher/DarkModeSwitcher'
import LoginModal from '../Modals/Login/LoginModal'
import logout from '/logout.svg'
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUserdata } from '../../store/slices/userSlice';
import userIcon from '/user.svg'

const sidebar = {
  open: {
    top: '0',
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 40
    },
  },
  closed: {
    top: '-120%',
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 40,
      delay: 0.25
    }
  }
};

export default function Navbar() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user.userData)
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isLoginModalActive, setIsLoginModalActive] = useState(false)

  const openProfile = () => {
    if (!user.id) {
      setIsLoginModalActive(true)
      return
    }
    setIsProfileOpen(prev => !prev)
  }

  const openLoginModalHandler = (e) => {
    e.stopPropagation()
    setIsLoginModalActive(true)
  }

  const logoutHandler = async () => {
    try {
      await supabase.auth.signOut()
      dispatch(clearUserdata())
      navigate('/')
      setIsProfileOpen(false)
    } catch (error) {
      console.log(error);
    }
  }

  console.log(!!Object.keys(user).length > 1);

  return (
    <>
      <motion.nav animate={isNavOpen ? 'open' : 'closed'} className="nav">

        {/* nav menu buttons */}
        <motion.div className="nav__menu">

          {/* burger button */}
          <motion.span className={`nav__burger ${isNavOpen ? 'active' : ''}`} onClick={() => setIsNavOpen(prev => !prev)}>
            <motion.span 
              variants={{ open: {rotate: 45, translateY: 7.5}, closed: {rotate: 0, translateY: 0} }}
              transition={{type: 'spring', stiffness: 150, damping: 15}}
              />
            <motion.span 
              variants={{ open: {opacity: 0, left: '-1rem'}, closed: {opacity: 1} }} 
              transition={{duration: 0.25}}
              />
            <motion.span 
              variants={{ open: {rotate: -45, translateY: -7}, closed: {rotate: 0, translateY: 0} }}
              transition={{type: 'spring', stiffness: 150, damping: 15}}
            />
          </motion.span>

          {/* search button */}
          <span className='nav__search'>
            <img className='nav__search--image' src={search} alt="search icon" />
          </span>
        </motion.div>

        {/* profile button */}
        <motion.div className={`nav__profile ${isProfileOpen ? 'active' : ''}`}>
          <span onClick={() => logoutHandler()} className='nav__logout'>
            <img src={logout} alt="logout icon" />
          </span>
          <motion.span className={`nav__pfp`} onClick={() => openProfile()}>
            {
              user.avatar_url ? (
                <img src={user.avatar_url} alt="user pfp" />
              ) : (
                <img src={userIcon} alt="blank user pfp" />
              )
            }
          </motion.span>
        </motion.div>

        {/* nav bg */}
        <motion.div 
          variants={sidebar}
          onClick={() => setIsNavOpen(false)} 
          className='nav__bg'
        >
          <div className="nav__links">
            <NavLink 
              to='/' 
              className={`nav__link ${({isActive}) => isActive ? 'active' : undefined}`}
            >
              Главная
            </NavLink>
            {
              Object.keys(user).length > 1 ? (
                <NavLink 
                  to='/profile' 
                  className={`nav__link ${({ isActive }) => isActive ? 'active' : undefined}`}
                >
                  Ваши рецепты
                </NavLink>
              ) : (
                <span 
                  onClick={(e) => openLoginModalHandler(e)}
                  className='nav__link'>
                  Ваши рецепты
                </span>
              )
            }
            <DarkModeSwitcher />
          </div>
        </motion.div>
      </motion.nav>
      <LoginModal isLoginModalActive={isLoginModalActive} setIsLoginModalActive={setIsLoginModalActive} />  
    </>
  )
}
