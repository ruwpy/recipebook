import './SingleRecipe.scss'
import like from '/like.svg'
import dislike from '/dislike.svg'
import { createEffect, createSignal } from 'solid-js'

export default function SingleRecipe({image, title, rating}) {

  const [isFavorite, setIsFavorite] = createSignal(false)

  return (
    <div class="recipe">
      <img class="recipe__image" src={image} alt="recipe image" />
      <span class="recipe__title">{title}</span>
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
      <span onClick={() => setIsFavorite(!isFavorite())} class='recipe__favorite'>
        <svg class='recipe__heart' width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class={`recipe__heart--inside${isFavorite() ? ' favorite' : ''}`} d="M5 12.3175C5 16.0468 9.01943 19.991 11.9617 22.3786C13.2937 23.4595 13.9597 24 15 24C16.0403 24 16.7063 23.4596 18.0383 22.3787C20.9806 19.991 25 16.0468 25 12.3175C25 6.08748 19.4998 3.7615 15 8.57412C10.5002 3.7615 5 6.08748 5 12.3175Z" fill="#D9D9D9"/>
          <path class={`recipe__heart--outline${isFavorite() ? ' favorite' : ''}`} d="M11.9617 22.3786L11.4891 22.961L11.9617 22.3786ZM15 8.57412L14.4522 9.08635C14.594 9.23803 14.7923 9.32412 15 9.32412C15.2077 9.32412 15.406 9.23803 15.5478 9.08635L15 8.57412ZM18.0383 22.3787L18.5109 22.961L18.5109 22.961L18.0383 22.3787ZM15 24L15 23.25L15 24ZM12.4343 21.7963C10.9844 20.6197 9.29166 19.077 7.96771 17.3884C6.62931 15.6814 5.75 13.9289 5.75 12.3175H4.25C4.25 14.4354 5.38041 16.5196 6.78729 18.3139C8.20863 20.1267 9.99671 21.7499 11.4891 22.961L12.4343 21.7963ZM5.75 12.3175C5.75 9.41289 7.01766 7.61731 8.58602 7.00319C10.1509 6.39043 12.3404 6.82778 14.4522 9.08635L15.5478 8.06189C13.1598 5.50784 10.3492 4.70187 8.0391 5.60645C5.73242 6.50967 4.25 8.99209 4.25 12.3175H5.75ZM18.5109 22.961C20.0033 21.7499 21.7914 20.1268 23.2127 18.314C24.6196 16.5196 25.75 14.4354 25.75 12.3175H24.25C24.25 13.9289 23.3707 15.6814 22.0323 17.3884C20.7084 19.077 19.0156 20.6197 17.5657 21.7963L18.5109 22.961ZM25.75 12.3175C25.75 8.99208 24.2676 6.50966 21.9609 5.60645C19.6508 4.70187 16.8402 5.50784 14.4522 8.06189L15.5478 9.08635C17.6596 6.82778 19.8491 6.39042 21.414 7.00319C22.9823 7.6173 24.25 9.41287 24.25 12.3175H25.75ZM11.4891 22.961C12.7606 23.9928 13.6423 24.75 15 24.75L15 23.25C14.2771 23.25 13.8269 22.9263 12.4343 21.7963L11.4891 22.961ZM17.5657 21.7963C16.1731 22.9263 15.7229 23.25 15 23.25L15 24.75C16.3577 24.75 17.2394 23.9928 18.5109 22.961L17.5657 21.7963Z" fill="#222222"/>
        </svg>
      </span>
    </div>
  )
}
