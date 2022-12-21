import { For, createEffect, createSignal } from "solid-js"
import SingleRecipe from "../SingleRecipe/SingleRecipe"
import data from './data'
import './Recipes.scss'

export default function Recipes() {

  const [recipes, setRecipes] = createSignal([])

  createEffect(() => {
    setRecipes(data)
  })

  return (
    <main class="main">
      <div className="container">
        <section class="recipes grid grid--recipes">
          <For each={recipes()}>
            {(recipe) => {
              return (
                <SingleRecipe
                  title={recipe.title}
                  image={recipe.image}
                  rating={recipe.rating}
                  author={recipe.author}
                  isSpicy={recipe.isSpicy}
                  timeToCook={recipe.timeToCook}
                />)
              }
            }
          </For>
        </section>
      </div>
    </main>
  )
}
