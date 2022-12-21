import { createEffect, createSignal } from 'solid-js'
import './Filter.scss'

export default function Filter() {

  const [selectedMeals, setSelectedMeals] = createSignal({
    pasta: false, soups: false, porridges: false, baking: false, pies: false, desserts: false, cakes: false, salads: false
  })
  const [ingridientsInputValue, setIngridientsInputValue] = createSignal('')

  const handleMeals = (e) => {
    const {id, value} = e.target
    setSelectedMeals(prevState => {
      return {
        ...prevState,
        [id]: !value
      }
    })
  }

  return (
    <div class='filter' onClick={(e) => e.stopPropagation()}>
      <div class="filter__ingridients">
        <h3 class='filter__heading'>Поиск по ингредиентам</h3>
        <input
          className="filter__input"
          placeholder='перечислите ингредиенты через пробел'
          type="text"
          onChange={(e) => setIngridientsInputValue(e.target.value)}
          value={ingridientsInputValue()}
        />
      </div>
      <h3 class='filter__heading'>Поиск по типу блюда</h3>
      <div class="filter__meals">
        <span 
          onClick={(e) => handleMeals(e)} 
          id='pasta' 
          class={`filter__meal ${selectedMeals().pasta ? 'selected' : ''}`}
          value={selectedMeals().pasta}
        >
          паста
        </span>
        <span 
          onClick={(e) => handleMeals(e)} 
          id='soups' 
          class={`filter__meal ${selectedMeals().soups ? 'selected' : ''}`}
          value={selectedMeals().soups}
        >
          супы
        </span>
        <span 
          onClick={(e) => handleMeals(e)} 
          id='porridges' 
          class={`filter__meal ${selectedMeals().porridges ? 'selected' : ''}`}
          value={selectedMeals().porridges}
        >
          каши
        </span>
        <span 
          onClick={(e) => handleMeals(e)} 
          id='baking' 
          class={`filter__meal ${selectedMeals().baking ? 'selected' : ''}`}
          value={selectedMeals().baking}
        >
          выпечка
        </span>
        <span 
          onClick={(e) => handleMeals(e)} 
          id='pies' 
          class={`filter__meal ${selectedMeals().pies ? 'selected' : ''}`}
          value={selectedMeals().pies}
        >
          пироги
        </span>
        <span 
          onClick={(e) => handleMeals(e)} 
          id='desserts' 
          class={`filter__meal ${selectedMeals().desserts ? 'selected' : ''}`}
          value={selectedMeals().desserts}
        >
          десерты
        </span>
        <span 
          onClick={(e) => handleMeals(e)} 
          id='cakes' 
          class={`filter__meal ${selectedMeals().cakes ? 'selected' : ''}`}
          value={selectedMeals().cakes}
        >
          торты
        </span>
        <span 
          onClick={(e) => handleMeals(e)} 
          id='salads' 
          class={`filter__meal ${selectedMeals().salads ? 'selected' : ''}`}
          value={selectedMeals().salads}
        >
          салаты
        </span>
      </div>
      <h3 class='filter__heading'>Поиск по происхождению</h3>
      <div class="filter__cuisine">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}
