import './Profile.scss'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { useState } from 'react';
import ChangeUsernameModal from '../../components/Modals/ChangeUsername/ChangeUsernameModal';
import Recipes from '../../components/Recipes/Recipes';
import pen from '/pen.svg'
import logout from '/logout.svg'
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUserdata } from '../../store/slices/userSlice';

export default function Profile() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user.userData)
  const isLoading = useSelector(state => state.user.isLoading)
  const [isChangeUsernameModalActive, setIsChangeUsernameModalActive] = useState(false)
  const isUserLogin = localStorage.getItem('sb-fddqymmrolabclbttaxr-auth-token')

  const logoutHandler = async () => {
    try {
      await supabase.auth.signOut()
      dispatch(clearUserdata())
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  return isUserLogin ? (
    isLoading ? (
      <Loading />
    ) : (
    <>
      <div className="profile">
        <div className="profile__data"> 
          <img src={user.avatar_url} alt="user pfp" className="profile__image" />
          <span className='profile__name'>
            <span onClick={() => setIsChangeUsernameModalActive(true)} className='profile__button'>
              <img src={pen} alt="edit username icon" />
            </span>
            <span>{user.username ? user.username : user.full_name}</span>
            <span onClick={() => logoutHandler()} className='profile__button'>
              <img src={logout} alt="logout icon" />
            </span>
          </span>
        </div>
        <h2 className='heading'>Ваши рецепты</h2>
        <div className="profile__recipes">
          <Recipes
            type='local'
          />
        </div>
      </div>
      <ChangeUsernameModal isModalActive={isChangeUsernameModalActive} setIsModalActive={setIsChangeUsernameModalActive} />
    </>
    )
  ) : (
    <Navigate to='/' />
  )
}
