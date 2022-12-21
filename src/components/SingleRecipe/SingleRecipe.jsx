import './SingleRecipe.scss'
import like from '/like.svg'
import dislike from '/dislike.svg'
import fire from '/fire.svg'
import plus from '/plus.svg'
import check from '/check.svg'
import { createSignal } from 'solid-js'
import DescriptionOnHover from '../DescriptionOnHover/DescriptionOnHover'

export default function SingleRecipe({image, title, rating, author, isSpicy, timeToCook}) {

  return (
    <div class="recipe">
      <div className="recipe__container">
        <img class="recipe__image" src={image} alt="recipe image" />
        {isSpicy &&
        <span class='recipe__hot'>
          <img src={fire} alt="spicy icon" />
          <DescriptionOnHover position='left' description='Острый рецепт' />
        </span>
        }
      </div>
      <span class="recipe__title">{title}</span>
      <span class='recipe__author'>от: {author}</span>
      <div class='recipe__bottom'>
        <span class='recipe__time'>Время приготовления - <span className="hl">{timeToCook}</span> минут</span>
        <span className="recipe__rating">
          <span class="recipe__rating--likes">
            <img src={like} alt="like icon" />
            {rating.likes}
          </span>
          <span class="recipe__rating--dislikes">
            <img src={dislike} alt="dislike icon" />
            {rating.dislikes}
          </span>
        </span>
      </div>
    </div>
  )
}
