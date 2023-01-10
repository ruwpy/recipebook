import Input from '../../Input/Input'
import Button from '../../Button/Button'
import FormIngridients from '../FormIngridients/FormIngridients'
import FormInstructions from '../FormInstructions/FormInstructions'
import { useRef } from 'react'
import { useEffect } from 'react'
import SelectButtons from '../../SelectButtons/SelectButtons'
import { initialCuisines, initialIngridients, initialInstructions, initialMealTypes } from '../../../initialData'
import { nanoid } from '@reduxjs/toolkit'
import { supabase } from '../../../supabase'
import { useState } from 'react'
import SuccessModal from '../../Modals/Success/SuccessModal'
import './RecipeForm.scss'

export default function RecipeForm({user}) {

  const [image, setImage] = useState('')
  const [titleValue, setTitleValue] = useState('')
  const [ingridients, setIngridients] = useState(initialIngridients)
  const [instructions, setInstructions] = useState(initialInstructions)
  const [timeToCook, setTimeToCook] = useState('0')
  const [cuisine, setCuisine] = useState('')
  const [mealType, setMealType] = useState('')
  const [isSpicy, setIsSpicy] = useState(false)

  const [formError, setFormError] = useState('')
  const [mealTypes, setMealTypes] = useState(initialMealTypes)
  const [cuisines, setCuisines] = useState(initialCuisines)
  const [imagePreview, setImagePreview] = useState('')
  const timeRef = useRef() 
  const [isSuccessModalActive, setIsSuccessModalActive] = useState(false)
  
  const recipeData = {
    user_id: user.id,
    image: null,
    title: titleValue,
    cuisine: cuisine ? cuisine[0]?.name : null,
    meal_type: mealType ? mealType[0]?.name : null,
    is_spicy: isSpicy,
    time_to_cook: timeToCook,
    ingridients: ingridients,
    instructions: instructions,
    author: user.username ? user.username : user.full_name
  }

  useEffect(() => {
    if(timeRef.current) timeRef.current.style.left = timeToCook / 3.9 + '%'
  }, [timeToCook])

  useEffect(() => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
    if(image) {
      reader.readAsDataURL(image)
    }
  }, [image])

  useEffect(() => {
    if (formError) {
      setFormError('')
    }
  }, [image, titleValue, ingridients, instructions, timeToCook, mealType, cuisine])

  const imageHandler = (e) => {
    if(e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }
  
  const uploadHandler = async () => {
    if(!cuisine) {
      setFormError('Необходимо указать происхождение кухни')
      return
    }
    if(!mealType) {
      setFormError('Необходимо указать тип блюда')
      return
    }
    if(instructions.length === 1 && instructions[0].instruction === '') {
      setFormError('Необходимо добавить инструкцию')
      return
    }
    if(ingridients.length === 1 && ingridients[0].value === '') {
      setFormError('Необходимо добавить ингридиенты')
      return
    }
    if(!titleValue) {
      setFormError('Необходимо указать название блюда')
      return
    }
    if(!image) {
      setFormError('Необходимо добавить фото блюда')
      return
    }

    await getImagePath()

    try {
      await supabase
        .from('recipes')
        .insert([recipeData])

      setIsSuccessModalActive(true)

      recipeData.image = null
      setTitleValue('')
      setCuisine('')
      setMealType('')
      setIsSpicy(false)
      setTimeToCook('0')
      setIngridients(initialIngridients)
      setInstructions(initialInstructions)
      setMealTypes(initialMealTypes)
      setCuisines(initialCuisines)
      setImage('')
      setImagePreview('')
    } catch (error) {
      console.log(error);
    }
  }
  
  const getImagePath = async () => {
    if (!image) return

    const { data, error } = await supabase.storage
      .from('recipe-images')
      .upload(`/${nanoid()}.png`, image)

      if (data) {
        recipeData.image = data.path
      }

      if (error) {
        console.log(error);
      }
  }

  return (
    <>
    <div className="recipeform__content">
      <div className="recipeform__image-upload">
        <input
          className='recipeform__image-input'
          onChange={(e) => imageHandler(e)}
          accept='image/png jpg jpeg'
          type='file'
          id='fileUpload'
        />
        <label
          className={`recipeform__image-label ${image ? 'disabled' : ''}`}
          htmlFor="fileUpload"
        >
          {image ? 'Изменить изображение' : 'Добавьте изображение вашего блюда'}
        </label>
        {imagePreview && <img className='recipeform__image' src={imagePreview} alt="recipe image" />}
      </div>
      <div className="recipeform__content--right">
        <Input
          inputValue={titleValue}
          setInputValue={setTitleValue}
          placeholder='название блюда'
          name='title'
        />
        <div className='recipeform__createingridients'>
          <FormIngridients ingridients={ingridients} setIngridients={setIngridients} />
        </div>
        <div className='recipeform__createinstructions'>
          <FormInstructions instructions={instructions} setInstructions={setInstructions} />
        </div>
        <div className='recipeform__timetocook'>
          <h3 className='heading'>Время приготовления</h3>
          <div className="recipeform__range">
            <input
              type='range'
              step={10}
              min={0}
              max={370}
              className='input__form--range'
              value={timeToCook}
              onChange={(e) => setTimeToCook(e.target.value)}
              />
            <span 
              className='recipeform__time' 
              ref={timeRef}
            >
              {
                timeToCook === '370' ? `> 360 минут` :
                timeToCook === '0' ? '< 10 минут' : `${timeToCook} минут`
              }
            </span>
          </div>
        </div>
        <div className='recipeform__spicyness'>
          <h3 className='heading'>Острота блюда</h3>
          <div className="recipeform__buttons">
            <span onClick={() => setIsSpicy(false)} className={`recipeform__spicy-button ${!isSpicy ? 'active' : null}`}>Не острое</span>
            <span onClick={() => setIsSpicy(true)} className={`recipeform__spicy-button ${isSpicy ? 'active' : null}`}>Острое</span>
          </div>
        </div>
        <div className="recipeform__mealtype">
          <h3 className='heading'>Тип блюда</h3>
          <SelectButtons 
            isOnlyOneSelectable={true}
            initialListOfItems={initialMealTypes}
            listOfItems={mealTypes}
            setListOfItems={setMealTypes}
            setItem={setMealType}
            buttonSize={'big'}
            />
        </div>
        <div className="recipeform__cuisine">
          <h3 className='heading'>Происхождение кухни</h3>
          <SelectButtons 
            isOnlyOneSelectable={true}
            initialListOfItems={initialCuisines}
            listOfItems={cuisines}
            setListOfItems={setCuisines}
            setItem={setCuisine}
            buttonSize={'big'}
            />
        </div>
        <div className='recipeform__submit'>
          <Button onClick={() => uploadHandler()} type='primary'>
            Добавить рецепт
          </Button>
          {formError && (
            <span className='hl'>
              {formError}
            </span>
          )}
        </div>
      </div>
    </div>
    <SuccessModal isModalActive={isSuccessModalActive} setIsModalActive={setIsSuccessModalActive} />
    </>
  )
}
