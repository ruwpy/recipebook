import './CreateRecipePage.scss'
import { useSelector } from 'react-redux'
import Loading from '../../components/Loading/Loading'
import { Navigate } from 'react-router-dom'
import RecipeForm from '../../components/RecipeFormComponents/RecipeForm/RecipeForm'

export default function CreateRecipePage() {

  const user = useSelector(state => state.user.userData)
  const isAuthLoading = useSelector(state => state.user.isLoading)

  return isAuthLoading ? (
    <Loading />
  ) : (
    user ? (
      <>
        <div className="createrecipe">
          <h2 className='heading'>Добавьте рецепт</h2>
          <RecipeForm user={user} />
        </div>
      </>
    ) : (
      <Navigate to='/' />
    )
  )
}
