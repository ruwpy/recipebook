import './Landing.scss'
import bludo from '/bludo.webp'
import Button from '../../components/Button/Button'

export default function Landing() {
  return (
    <div className='landing container'>
      <div className="landing__bg" />
      <div className="landing__content">
        <h1 className='landing__heading'>RecipeBook</h1>
        <span className='landing__desc'>ваша личная книга рецептов</span>
        <span className='landing__button'>
          <Button type='primary'>
            Перейти к рецептам
          </Button>
        </span>
      </div>
      <div className="landing__img">
        <img src={bludo} alt="dish image" />
      </div>
    </div>
  )
}
