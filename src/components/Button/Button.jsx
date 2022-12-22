import './Button.scss'

export default function Button({type, onClick, children, hasIcon}) {
  return (
    <button 
      className={`btn btn--${type} ${hasIcon ? 'icon' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
