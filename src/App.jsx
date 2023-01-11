import Search from "./components/Search/Search";
import Navbar from "./components/Navbar/Navbar";
import Recipes from "./components/Recipes/Recipes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { setUser } from "./store/slices/userSlice";
import CreateRecipePage from "./pages/CreateRecipePage/CreateRecipePage";
import Profile from "./pages/Profile/Profile";
import { supabase } from "./supabase";
import DarkModeSwitcher from "./components/DarkModeSwitcher/DarkModeSwitcher";
import RecipePage from "./pages/RecipePage/RecipePage";
import Main from "./components/Main/Main";
import Landing from "./pages/Landing/Landing";


export default function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    supabase.auth.getSession()
      .then(async ({data: {session}}) => {
        if(session) {
          const {data: profile, error} = await supabase
            .from('profiles')
            .select()
            .eq('id', session.user.id)
  
          if (profile) {
            dispatch(setUser(profile[0]))
          }
  
          if (error) {
            console.log(error);
          }
        }
      })

    supabase.auth.onAuthStateChange(async (_event, session) => {
      const {data: profile, error} = await supabase
          .from('profiles')
          .select()
          .eq('id', session.user.id)

        if (profile) {
          dispatch(setUser(profile[0]))
        }

        if (error) {
          console.log(error);
        }
    })
  }, [])

  return (
    <BrowserRouter>
      <header className="header">
        <Search />
        <Navbar />
      </header>
      <Main>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/createrecipe' element={<CreateRecipePage />} />
          <Route path='/recipe/:id' element={<RecipePage />} />
        </Routes>
      </Main>
    </BrowserRouter>
  );
}
