import './SingleRecipe.scss'
import like from '/like.svg'
import dislike from '/dislike.svg'
import fire from '/fire.svg'
import DescriptionOnHover from '../DescriptionOnHover/DescriptionOnHover'

export default function SingleRecipe({image, title, rating, author, isSpicy, timeToCook}) {

  return (
    <div className="recipe">
      <div className="recipe__container">
        <img className="recipe__image" src={image} alt="recipe image" />
        {isSpicy &&
        <span className='recipe__hot'>
          <img src={fire} alt="spicy icon" />
          <DescriptionOnHover position='left' description='Острый рецепт' />
        </span>
        }
      </div>
      <span className="recipe__title">{title}</span>
      <span className='recipe__author'>от: {author}</span>
      <div className='recipe__bottom'>
        <span className='recipe__time'>Время приготовления - <span className="hl">{timeToCook}</span> минут</span>
        <span className="recipe__rating">
          <span className="recipe__rating--likes">
            <img src={like} alt="like icon" />
            {rating.likes}
          </span>
          <span className="recipe__rating--dislikes">
            <img src={dislike} alt="dislike icon" />
            {rating.dislikes}
          </span>
        </span>
      </div>
    </div>
  )
}
