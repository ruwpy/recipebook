import Modal from "../Modal/Modal"
import Button from "../../Button/Button"
import { useNavigate } from "react-router-dom"

export default function SuccessModal({isModalActive, setIsModalActive}) {

  const navigate = useNavigate()

  return (
    <Modal isModalActive={isModalActive} setIsModalActive={setIsModalActive}>
      <div className="modal__content--initial">
        <h3 className="heading">
          Рецепт успешно добавлен!  
        </h3>
        <div className="buttons">
          <Button 
            type='secondary small'
            onClick={() => navigate('/profile')}
          >
            к вашим рецептам
          </Button>
          <Button 
            type='secondary small'
            onClick={() => setIsModalActive(false)}
          >
            создать еще рецепт
          </Button>
        </div>
      </div>
    </Modal>
  )
}
