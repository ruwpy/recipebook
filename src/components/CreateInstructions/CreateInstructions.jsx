import cross from '/cross.svg'
import DescriptionOnHover from '../DescriptionOnHover/DescriptionOnHover'
import { useEffect } from 'react'

export default function CreateInstructions({instructions, setInstructions}) {

  function deleteInstruction(id) {
    if(instructions.length === 1) {
      setInstructions([
        {
          id: 1,
          instruction: '',
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
        instruction: '',
      }
    ])
  }

  return (
    <>
      <h3 className='heading'>Инструкции</h3>
      <div className="createrecipe__items">
        {
          instructions.map((instruction, index) => {
            return (
              <div className='createrecipe__single-item instruction' key={instruction.id}>
                <textarea
                  value={instruction.instruction}
                  onChange={(e) => changeInstructionHandler(e)}
                  name='instruction'
                  id={instruction.id}
                  maxLength={512}
                />
                <label className='createrecipe__label' htmlFor="recipe instruction">шаг {index + 1}</label>
                <span onClick={() => deleteInstruction(instruction.id)}  className="createrecipe__delete-item">
                  <img 
                    className='createrecipe__delete-icon' 
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
      <span onClick={() => addNewInstruction()} className='createrecipe__add'>добавить шаг +</span>
    </>
  )
}
