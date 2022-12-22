import Search from "./components/Search/Search";
import Navbar from "./components/Navbar/Navbar";
import Recipes from "./components/Recipes/Recipes";
import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { setUser } from "./store/slices/userSlice";
import { useState } from "react";
import Loading from "./components/Loading/Loading";
import Profile from "./pages/Profile/Profile";
import { supabase } from "./supabase";

export default function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    supabase.auth.getSession()
      .then(({data: {session}}) => {
        dispatch(setUser(session?.user))
      })

    supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setUser(session.user))
    })
  }, [])

  return (
    <BrowserRouter>
      <header className="header">
        <Search />
        <Navbar />
      </header>
      <Routes>
        <Route path='/' element={<Recipes />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/createrecipe' element={<Recipes />} />
      </Routes>
    </BrowserRouter>
  );
}
