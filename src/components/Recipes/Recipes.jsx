import { useEffect, useState } from "react"
import SingleRecipe from "../SingleRecipe/SingleRecipe"
import { supabase } from "../../supabase"
import './Recipes.scss'
import { useSelector } from "react-redux"

export default function Recipes({type}) {

  const user = useSelector(state => state.user.userData)
  const [recipes, setRecipes] = useState([])
  const searchQuery = useSelector(state => state.search.query)

  useEffect(() => {
    async function getRecipes() {
      try {
        if(searchQuery) {
          const {data} = await supabase
            .from('recipes')
            .select()
            .ilike('title',  `%${searchQuery}%`)
            
          setRecipes(data)
        } else {
          const {data} = await supabase
            .from('recipes')
            .select()
  
          setRecipes(data)
        }
      } catch (error) {
        console.log(error);
      }
    }

    getRecipes()
  }, [searchQuery])

  return (
    <section className="recipes grid grid--recipes">
      {recipes && recipes.map((recipe) => {
        return (
          <SingleRecipe
            key={recipe.id}
            title={recipe.title}
            image={recipe.image}
            rating={recipe.rating}
            author={recipe.author}
            isSpicy={recipe.is_spicy}
            timeToCook={recipe.time_to_cook}
            id={recipe.id}
          />
        )
      })}
    </section>
  )
}
