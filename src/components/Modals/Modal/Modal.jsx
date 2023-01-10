import { createPortal } from 'react-dom'
import './Modal.scss'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'

export default function Modal({isModalActive, setIsModalActive, children}) {

  if (isModalActive) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'visible'
  }

  const animation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1}
  }

  return createPortal(
    <AnimatePresence mode='wait'>
      {isModalActive && (
        <motion.div
          className="modal" 
          onClick={() => setIsModalActive(false)}
          variants={animation}
          initial='hidden'
          animate='visible'
          exit='hidden'
          transition={{duration: 0.08}}
        >
          <div className="modal__content" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById('modal')
  )
}
