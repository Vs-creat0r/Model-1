import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import VegRecipes from './pages/VegRecipes';
import NonVegRecipes from './pages/NonVegRecipes';
import RecipeDetails from './pages/RecipeDetails';
import Contact from './pages/Contact';
import About from './pages/About';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ flex: 1, marginTop: '80px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/veg" element={<VegRecipes />} />
          <Route path="/non-veg" element={<NonVegRecipes />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
