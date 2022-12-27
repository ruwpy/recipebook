import Modal from "../Modal/Modal"
import { supabase } from "../../supabase"
import Button from "../Button/Button";
import './LoginModal.scss'
import google from '/google.svg'

export default function LoginModal({isLoginModalActive, setIsLoginModalActive}) {

  async function Login() {
    const {error} = await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
    if(error) console.log(error);
  }

  return (
    <Modal isModalActive={isLoginModalActive} setIsModalActive={setIsLoginModalActive}>
      <div className="loginmodal">
        <div className="loginmodal__top">
          <h2>Добро пожаловать на <span className="hl">RecipeBook</span></h2>
          <p>для просмотра профиля вам необходимо войти в свою учетную запись</p>
        </div>
        <Button type='secondary' hasIcon={true} onClick={() => Login()}>
          <span>Войти с помощью</span>
          <img src={google} alt="google icon" />
        </Button>
      </div>
    </Modal>
  )
}
