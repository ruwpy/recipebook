import { animate, motion } from "framer-motion"
import './Curtain.scss'

export default function Curtain({colorOnHover}) {

  const variants = {
    initial: {
      top: '100%',
      backgroundColor: colorOnHover
    },
    animate: {
      top: 'inherit',
    }
  }
  return (
    <motion.div className="curtain">
      <motion.div
        variants={variants}
        className="curtain__box" 
      />
    </motion.div>
  )
}
