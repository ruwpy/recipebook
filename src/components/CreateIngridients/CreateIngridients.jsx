import cross from '/cross.svg'
import DescriptionOnHover from '../DescriptionOnHover/DescriptionOnHover'

export default function CreateIngridients({ingridients, setIngridients}) {

    function deleteIngridient(id) {
    if(ingridients.length === 1) {
      setIngridients([
        {
          id: 1,
          name: '',
          value: ''
        }
      ])
      return
    }

    setIngridients(ingridients.filter(ingridient => ingridient.id !== id))
  }

  function changeIngridientHandler(e) {
    const {name, value} = e.target

    const newIngridients = ingridients.map((ingridient) => {
      if(ingridient.id == e.target.id) {
        return (
          {
            ...ingridient,
            [name]: value,
          }
        )
      }

      return ingridient
    })
    setIngridients(newIngridients)
  }

  function addNewIngridient() {
    setIngridients([
      ...ingridients,
      {
        id: ingridients[ingridients.length - 1].id + 1,
        name: '',
        value: ''
      }
    ])
  }

  return (
    <>
      <h3 className='heading'>Ингредиенты</h3>
      <div className="createrecipe__items">
        {
          ingridients.map((ingridient) => {
            return (
              <div className='createrecipe__single-item' key={ingridient.id}>
                <input
                  className='input__form input__form--basic'
                  value={ingridient.name}
                  onChange={(e) => changeIngridientHandler(e)}
                  placeholder='название'
                  name='name'
                  id={ingridient.id}
                />
                <input
                  className='input__form input__form--basic'
                  value={ingridient.value}
                  onChange={(e) => changeIngridientHandler(e)}
                  placeholder='кол-во'
                  name='value'
                  id={ingridient.id}
                />
                <span onClick={() => deleteIngridient(ingridient.id)} className="createrecipe__delete-item">
                  <img 
                    className='createrecipe__delete-icon' 
                    src={cross} 
                    alt="delete icon" 
                  />
                  <DescriptionOnHover description='Удалить ингредиент' position='top' />
                </span>
              </div>
            )
          })
        }
      </div>
        <span onClick={() => addNewIngridient()} className='createrecipe__add'>добавить ингредиент +</span>
    </>
  )
}
