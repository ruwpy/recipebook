import { useEffect, useState } from "react"
import SingleRecipe from "../SingleRecipe/SingleRecipe"
import { supabase } from "../../supabase"
import './Recipes.scss'

export default function Recipes() {

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    async function getRecipes() {
      const {data, error} = await supabase
        .from('recipes')
        .select()
      setRecipes(data)
    }

    getRecipes()
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
