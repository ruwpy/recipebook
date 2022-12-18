import Navbar from "./components/Navbar/Navbar";
import Recipes from "./components/Recipes/Recipes";
import './App.scss'

export default function App() {
  return (
    <>
      <header class="header">
        <Navbar />
      </header>
      <main class="main">
        <Recipes />
      </main>
    </>
  );
}
