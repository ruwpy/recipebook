import cross from '/cross.svg'
import DescriptionOnHover from '../../DescriptionOnHover/DescriptionOnHover'

export default function FormInstructions({instructions, setInstructions}) {

  function deleteInstruction(id) {
    if(instructions.length === 1) {
      setInstructions([
        {
          id: 1,
          value: '',
        }
      ])
      return
    }

    setInstructions(instructions.filter(instructions => instructions.id !== id))
  }

  function changeInstructionHandler(e) {
    const {name, value} = e.target

    const newInstructions = instructions.map((instruction) => {
      if(instruction.id == e.target.id) {
        return (
          {
            ...instruction,
            [name]: value,
          }
        )
      }

      return instruction
    })
    setInstructions(newInstructions)
  }

  function addNewInstruction() {
    setInstructions([
      ...instructions,
      {
        id: instructions[instructions.length - 1].id + 1,
        value: '',
      }
    ])
  }

  return (
    <>
      <h3 className='heading'>Инструкции</h3>
      <div className="recipeform__items">
        {
          instructions.map((instruction, index) => {
            return (
              <div className='recipeform__single-item instruction' key={instruction.id}>
                <textarea
                  value={instruction.value}
                  onChange={(e) => changeInstructionHandler(e)}
                  name='value'
                  id={instruction.id}
                  maxLength={512}
                />
                <label className='recipeform__label' htmlFor="recipe instruction">шаг {index + 1}</label>
                <span onClick={() => deleteInstruction(instruction.id)}  className="recipeform__delete-item">
                  <img 
                    className='recipeform__delete-icon' 
                    src={cross} 
                    alt="delete icon" 
                  />
                  <DescriptionOnHover description='Удалить инструкцию' position='top' />
                </span>
              </div>
            )
          })
        }
      </div>
      <span onClick={() => addNewInstruction()} className='recipeform__add'>добавить шаг +</span>
    </>
  )
}
