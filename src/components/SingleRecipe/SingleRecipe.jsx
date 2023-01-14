import './SingleRecipe.scss'
import DescriptionOnHover from '../DescriptionOnHover/DescriptionOnHover'
import { useNavigate } from 'react-router-dom'
import fire from '/fire.svg'
import timer from '/timer.svg'

export default function SingleRecipe({image, title, author, isSpicy, timeToCook, id}) {

  const navigate = useNavigate()

  return (
    <div onClick={() => navigate('/recipe/' + id)} className="recipe">
      <div className="recipe__container">
        <img className="recipe__image" src={'https://fddqymmrolabclbttaxr.supabase.co/storage/v1/object/public/recipe-images/' + image} alt="recipe image" />
        {isSpicy &&
        <span className='recipe__hot'>
          <img src={fire} alt="spicy icon" />
          <DescriptionOnHover position='left' description='Острый рецепт' />
        </span>
        }
      </div>
      <span className="recipe__title">{title}</span>
      <span className='recipe__time'>
        <img src={timer} alt="timer icon" /> - {timeToCook === '0' ? '< 10' : timeToCook} мин.
      </span>
    </div>
  )
}