import { useEffect, useState } from "react"
import SingleRecipe from "../SingleRecipe/SingleRecipe"
import data from './data'
import './Recipes.scss'

export default function Recipes() {

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    setRecipes(data)
  }, [])

  return (
    <main className="main">
      <div className="container">
        <section className="recipes grid grid--recipes">
          {recipes.map((recipe) => {
            return (
              <SingleRecipe
                key={recipe.id}
                title={recipe.title}
                image={recipe.image}
                rating={recipe.rating}
                author={recipe.author}
                isSpicy={recipe.isSpicy}
                timeToCook={recipe.timeToCook}
              />
            )
          })}
        </section>
      </div>
    </main>
  )
}
