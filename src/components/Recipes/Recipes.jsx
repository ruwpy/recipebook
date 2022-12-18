import { createEffect, createSignal } from "solid-js"
import SingleRecipe from "../SingleRecipe/SingleRecipe"
import data from './data'
import './Recipes.scss'

export default function Recipes() {

  const [recipes, setRecipes] = createSignal([])

  createEffect(() => {
    setRecipes(data)
  })

  return (
    <div className="container">
      <section class="recipes grid grid--recipes">
        {recipes().map((recipe) => {
          return (
            <SingleRecipe
              title={recipe.title}
              image={recipe.image}
              rating={recipe.rating}
            />
          )
        })}
      </section>
    </div>
  )
}
