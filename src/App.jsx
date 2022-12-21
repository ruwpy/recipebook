import Search from "./components/Search/Search";
import Navbar from "./components/Navbar/Navbar";
import Recipes from "./components/Recipes/Recipes";
import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider as StoreProvider } from 'react-redux';
import store from "./store/store";

export default function App() {
  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        <header className="header">
          <Search />
          <Navbar />
        </header>
        <Routes>
          <Route path='/' element={<Recipes />} />
          <Route path='/profile' element={<Recipes />} />
          <Route path='/createrecipe' element={<Recipes />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}
