import './Landing.scss'
import bludo from '/bludo.webp'
import Button from '../../components/Button/Button'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoginModal from '../../components/Modals/Login/LoginModal'
import { useState } from 'react'

export default function Landing() {

  const user = useSelector(state => state.user.userData)
  const [isLoginModalActiev, setIsLoginModalActive] = useState(false)

  return (
    <>
    <div className='landing container'>
      <div className="landing__bg" />
      <div className="landing__content">
        <h1 className='landing__heading'>RecipeBook</h1>
        <span className='landing__desc'>ваша личная книга рецептов</span>
        <span className='landing__button'>
          
          {
              Object.keys(user).length > 1 ? (
                <Link to='/recipes'>
                  <Button type='primary'>
                    Перейти к рецептам
                  </Button>
                </Link>
              ) : (
                <span 
                  onClick={() => setIsLoginModalActive(true)}
                >
                  <Button type='primary'>
                    Перейти к рецептам
                  </Button>
                </span>
              )
            }
        </span>
      </div>
      <div className="landing__img">
        <img src={bludo} alt="dish image" />
      </div>
    </div>
    <LoginModal isLoginModalActive={isLoginModalActiev} setIsLoginModalActive={setIsLoginModalActive} />
    </>
  )
}
