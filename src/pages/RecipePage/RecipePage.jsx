import './RecipePage.scss'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { supabase } from '../../supabase'
import Loading from '../../components/Loading/Loading'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function RecipePage() {

  const { scrollY } = useScroll()
  
  const y = useTransform(scrollY, [0, 500], ['0%', '50%'])
  const {id} = useParams()
  const [recipeData, setRecipeData] = useState('')

  useEffect(() => {
    async function getRecipe() {
      try {
        const {data} = await supabase
          .from('recipes')
          .select()
          .eq('id', id)

        if(data) setRecipeData(data[0])
      } catch (error) {
        console.log(error);
      }
    }

    getRecipe()
  }, [])

  console.log(recipeData);

  return !recipeData ? (
    <Loading />
  ) : (
    <div className="recipepage">
      <div className="recipepage__top">
        <motion.div style={{y}}>
          <img
            className='recipepage__image'
            src={'https://fddqymmrolabclbttaxr.supabase.co/storage/v1/object/public/recipe-images/' + recipeData.image}
            alt="recipe image"
          />
        </motion.div>
        <div className="recipepage__title-desc">
          <span className='recipepage__title'>
            {recipeData.title}
          </span>
          <span className='recipepage__tags'>
            <span className='recipepage__cuisine'>{recipeData.cuisine}</span>
            <span className='recipepage__mealtype'>{recipeData.meal_type}</span>
          </span>
          <span className="recipepage__timetocook">
            время приготовления - {recipeData.time_to_cook} минут
          </span>
        </div>
      </div>
      <div className="recipepage__container container">
        <div className="recipepage__container--left">
          <div className="recipepage__ingridients">
            {
              recipeData.ingridients.map(ingridient => {
                return (
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', bounce: 0.7 }} 
                    className='recipepage__ingridient' 
                    key={ingridient.id}
                  >
                    <span className='recipepage__ingridient--dot' />{ingridient.value} {ingridient.name}
                  </motion.div>
                )
              })
            }
          </div>
        </div>
        <div className="recipepage__container--right">
          <div className='recipepage__instructions'>
            {
              recipeData.instructions.map(instruction => {
                return (
                  <div className='recipepage__instruction' key={instruction.id}>
                    <span className='recipepage__instruction--number'>
                      {instruction.id}
                    </span>
                    <span className='recipepage__instruction--value'>
                      {instruction.value}
                    </span>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}
