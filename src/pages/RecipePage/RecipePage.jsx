import './RecipePage.scss'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { supabase } from '../../supabase'
import Loading from '../../components/Loading/Loading'
import { motion, useScroll, useTransform } from 'framer-motion'
import Curtain from '../../components/Curtain/Curtain'
import arrow from '/arrow.svg'
import { AnimatePresence } from 'framer-motion'
import { useNavigationType } from 'react-router-dom'

const scaleVars = {
  initial: {
    scale: 1
  },
  animate: {
    scale: 1.05
  }
}

import { useNavigate } from 'react-router-dom'

export default function RecipePage() {

  const navigationType = useNavigationType()
  const navigate = useNavigate()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], ['0%', '50%'])
  const {id} = useParams()
  const [recipeData, setRecipeData] = useState('')
  const [isIngridientsVisible, setIsIngridientsVisible] = useState(true)

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

  return !recipeData ? (
    <Loading />
  ) : (
    <div className="recipepage">
      <span onClick={() => navigate('/profile')} className={`recipepage__back ${navigationType === 'PUSH' ? 'active' : ''}`}>
        <img src={arrow} alt="left arrow icon" />
      </span>
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
            <motion.span 
              className='recipepage__cuisine'
              whileHover='animate'
              initial='initial'
              variants={scaleVars}
              transition={{ type: 'spring', bounce: 0.7 }} 
            >
              <Curtain colorOnHover={'#F26C4F'} />
              {recipeData.cuisine}
            </motion.span>
            <motion.span 
              className='recipepage__mealtype'
              whileHover='animate'
              initial='initial'
              variants={scaleVars}
              transition={{ type: 'spring', bounce: 0.7 }} 
            >
              <Curtain colorOnHover={'#F26C4F'} />
              {recipeData.meal_type}
            </motion.span>
          </span>
          <span className="recipepage__timetocook">
            время приготовления - {recipeData.time_to_cook} минут
          </span>
        </div>
      </div>
      <div className="recipepage__container container">
        <div className="recipepage__selector hide-for-desktop">
          <span 
            onClick={() => setIsIngridientsVisible(true)} 
            className={isIngridientsVisible ? 'active' : ''}
          >
            ингредиенты
          </span>
          <span 
            onClick={() => setIsIngridientsVisible(false)} 
            className={!isIngridientsVisible ? 'active' : ''}
          >
            инструкция
          </span>
          <motion.div 
            layout 
            transition={{type: "spring", duration: 0.5, bounce: 0.3}}
            className={`recipepage__selector--bg ${!isIngridientsVisible ? 'active' : ''}`}
          />
        </div>
        <AnimatePresence onExitComplete>
          <div className="recipepage__content hide-for-desktop">
            {
              isIngridientsVisible ? (
                <motion.div 
                  className="recipepage__ingridients"
                  layout 
                  transition={{type: "spring", duration: 0.5, bounce: 0.3}}
                >
                  {
                    recipeData.ingridients.map(ingridient => {
                      return (
                        <motion.div
                          initial="initial"
                          whileHover='animate'
                          variants={scaleVars}
                          transition={{ type: 'spring', bounce: 0.7 }}
                          className='recipepage__ingridient'
                          key={ingridient.id}
                        >
                          <span className='recipepage__ingridient--dot' />{ingridient.value} {ingridient.name}
                        </motion.div>
                      )
                    })
                  }
                </motion.div>
              ) : (
                <motion.div 
                  className='recipepage__instructions'
                  layout 
                  transition={{type: "spring", duration: 0.5, bounce: 0.3}}
                >
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
                </motion.div>
              )
            }
          </div>
        </AnimatePresence>
        <div className="recipepage__container--left hide-for-mobile">
          <div className="recipepage__ingridients">
            {
              recipeData.ingridients.map(ingridient => {
                return (
                  <motion.div 
                    initial="initial" 
                    whileHover='animate'
                    variants={scaleVars}
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
        <div className="recipepage__container--right hide-for-mobile">
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
