import Search from "./components/Search/Search";
import Navbar from "./components/Navbar/Navbar";
import Recipes from "./components/Recipes/Recipes";
import './App.scss'
import { Router, Routes, Route } from '@solidjs/router';

export default function App() {
  return (
    <Router>
      <header class="header">
        <Search />
        <Navbar />
      </header>
      <Routes>
        <Route path='/' element={<Recipes />} />
        <Route path='/profile' element={<Recipes />} />
        <Route path='/createrecipe' element={<Recipes />} />
      </Routes>
    </Router>
  );
}
