import './Navbar.scss'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import search from '/search.svg'
import { motion } from 'framer-motion'
import DarkModeSwitcher from '../DarkModeSwitcher/DarkModeSwitcher'

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at -20px 10px)`,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 40
    }
  }),
  closed: {
    clipPath: "circle(0px at -20px 10px)",
    transition: {
      type: "spring",
      stiffness: 250,
      damping: 40
    }
  }
};

export default function Navbar() {

  const user = useSelector(state => state.user.userData)
  const [isNavOpen, setIsNavOpen] = useState(false);

  const openNavHandler = () => {
    if (isNavOpen) {
      setTimeout(() => {
        setIsNavOpen(false)
      }, 250)
    } else {
      setIsNavOpen(true)
    }
  }

  return (
    <>
      <motion.nav animate={isNavOpen ? 'open' : 'closed'} className="nav">
        <motion.div className="nav__menu">
          <motion.span className={`nav__burger ${isNavOpen ? 'active' : ''}`} onClick={() => openNavHandler()}>
            <motion.span 
              variants={{ open: {rotate: 45, translateY: 7.5}, closed: {rotate: 0, translateY: 0} }}
              transition={{type: 'spring', stiffness: 50}}
              />
            <motion.span 
              variants={{ open: {opacity: 0, left: '1rem'}, closed: {opacity: 1} }} 
              transition={{duration: 0.3}}
              />
            <motion.span 
              variants={{ open: {rotate: -45, translateY: -7}, closed: {rotate: 0, translateY: 0} }}
              transition={{type: 'spring', stiffness: 50}}
            />
          </motion.span>
          <span className='nav__search'>
            <img className='nav__search--image' src={search} alt="" />
          </span>
        </motion.div>
        <motion.div 
          variants={sidebar}
          onClick={() => openNavHandler()} 
          className='nav__bg'
        >
          <div className="nav__links">
            <NavLink to='/' className={`nav__link ${({isActive}) => isActive ? 'active' : undefined}`}>Главная</NavLink>
            <NavLink to='/profile' className={`nav__link ${({ isActive }) => isActive ? 'active' : undefined}`}>Профиль</NavLink>
            <NavLink to='/createrecipe' className={`nav__link ${({ isActive }) => isActive ? 'active' : undefined}`}>Создать рецепт</NavLink>
            <DarkModeSwitcher />
          </div>
        </motion.div>
      </motion.nav>
    </>
  )
}
