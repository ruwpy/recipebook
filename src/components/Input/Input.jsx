import { useState } from "react"
import './Input.scss'

export default function Input({inputValue, setInputValue, name, placeholder, id, maxLength}) {

  const [isActive, setIsActive] = useState(false)

  return (
    <div className="input">
      <input 
        type='text'
        className="input__form"
        id={name}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        maxLength={maxLength ? maxLength : 256}
        itemID={id}
      />
      <label htmlFor={name} className={`input__label${isActive || inputValue ? ' active' : ''}`}>
        {placeholder}
      </label>
    </div>
  )
}
