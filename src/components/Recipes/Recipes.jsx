import { useEffect, useState } from "react"
import SingleRecipe from "../SingleRecipe/SingleRecipe"
import { supabase } from "../../supabase"
import './Recipes.scss'
import { useSelector } from "react-redux"

export default function Recipes() {

  const [recipes, setRecipes] = useState([])
  const searchQuery = useSelector(state => state.search.query)

  useEffect(() => {
    async function getRecipes() {
      if(searchQuery) {
        const {data, error} = await supabase
          .from('global-recipes')
          .select()
          .textSearch('title', `'${searchQuery}'`)
          console.log(data);
          
        setRecipes(data)
      } else {
        const {data, error} = await supabase
          .from('global-recipes')
          .select()

        setRecipes(data)
      }
    }

    getRecipes()
  }, [searchQuery])

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
