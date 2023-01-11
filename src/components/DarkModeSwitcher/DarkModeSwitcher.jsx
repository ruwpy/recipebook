import { useEffect } from "react"
import { useState } from "react"
import './DarkModeSwitcher.scss'
import sun from '/sun.svg'
import moon from '/moon.svg'
import { motion } from "framer-motion"

export default function DarkModeSwitcher() {
  
  const [appTheme, setAppTheme] = useState(localStorage.getItem('theme') === null ? 'light' : localStorage.getItem('theme'))

  useEffect(() => {
    localStorage.setItem('theme', appTheme)
  }, [appTheme])

  const themeHandler = (e) => {
    e.stopPropagation()
    if(appTheme === 'light') {
      setAppTheme('dark')
    } else {
      setAppTheme('light')
    }
  }

  document.body.dataset.theme = appTheme

  return (
    <div onClick={(e) => themeHandler(e)} className="switcher">
      <motion.div layout transition={{type: "spring", duration: 0.5, bounce: 0.5}} className={`switcher__round ${appTheme === 'dark' ? 'active' : ''}`}>
      </motion.div>
        {appTheme === 'light' ? (
          <img className="switcher__icon switcher__icon--sun" src={sun} alt="" />
        ) : (
          <img className="switcher__icon switcher__icon--moon" src={moon} alt="" />
        )
        }
    </div>
  )
}
