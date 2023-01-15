import './RecipesPage.scss'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import Recipes from '../../components/Recipes/Recipes';

export default function RecipesPage() {
  
  const isLoading = useSelector(state => state.user.isLoading)
  const isUserLogin = localStorage.getItem('sb-fddqymmrolabclbttaxr-auth-token')

  return isUserLogin ? (
    isLoading ? (
      <Loading />
    ) : (
    <>
      <div className="recipespage container">
        <div className="recipespage__recipes">
          <Recipes
            type='local'
          />
        </div>
      </div>
    </>
    )
  ) : (
    <Navigate to='/' />
  )
}
