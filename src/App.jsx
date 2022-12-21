import Search from "./components/Search/Search";
import Navbar from "./components/Navbar/Navbar";
import Recipes from "./components/Recipes/Recipes";
import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { setUser } from "./store/slices/userSlice";
import { useState } from "react";
import Loading from "./components/Loading/Loading";
import Profile from "./pages/Profile/Profile";

export default function App() {

  const dispatch = useDispatch()
  const supabase = createClient(
    import.meta.env.VITE_SUPA_URL,
    import.meta.env.VITE_SUPA_KEY
  )
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  useEffect(() => {
    try {
      async function getUserData() {
        const {data} = await supabase.auth.getUser()
        dispatch(setUser(data.user))
      }

      getUserData()
    } catch (error) {
      console.log(error);
    } finally {
      setIsAuthLoading(false)
    }

  }, [])

  return (
    <BrowserRouter>
      {!isAuthLoading ? (
        <>
          <header className="header">
            <Search />
            <Navbar />
          </header>
          <Routes>
            <Route path='/' element={<Recipes />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/createrecipe' element={<Recipes />} />
          </Routes>
        </>
      ) : (
        <Loading />
      ) }
    </BrowserRouter>
  );
}
