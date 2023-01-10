import './ChangeUsernameModal.scss'
import Modal from '../Modal/Modal'
import Input from '../../Input/Input'
import Button from '../../Button/Button'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNewUsername } from '../../../store/slices/userSlice'
import { supabase } from '../../../supabase'
import { useSelector } from 'react-redux'

export default function ChangeUsernameModal({isModalActive, setIsModalActive}) {

  const user = useSelector(state => state.user.userData)
  const dispatch = useDispatch()
  const [usernameValue, setUsernameValue] = useState('')

  const changeUsernameHandler = async () => {
    try {
      await supabase
        .from('profiles')
        .update({username: usernameValue})
        .eq('id', user.id)

      dispatch(setNewUsername(usernameValue))
      setIsModalActive(false)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal isModalActive={isModalActive} setIsModalActive={setIsModalActive}>
      <div className="modal__content--initial">
        <Input
          inputValue={usernameValue}
          setInputValue={setUsernameValue}
          placeholder='новое имя'
          name='username'
          maxLength={24}
        />
        <Button
          onClick={() => changeUsernameHandler()}
          type='secondary'
        >
          Изменить имя
        </Button>
      </div>
    </Modal>
  )
}
