import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.css'
import Esenario from './pages/escenario/Esenario'
import Layout from './components/layout/layout'
import Inicio from './pages/inicio/inicio'
import Contacto from "./pages/contacto/Contacto";
import Catalogo from "./pages/catalogo/Producto";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import Cart from "./pages/cart/Cart";



function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
                  <Route
                    path="/"
                    element={<Inicio/>}
                  />
                  <Route
                    path="/Esenario"
                    element={<Esenario />}
                  />
                  <Route
                    path="/catalogo"
                    element={<Catalogo/>}
                  />
                  <Route
                    path="/contacto"
                    element={<Contacto/>}
                  />
                  <Route
                  path="/carrito"
                  element={<Cart />}
                  />
            </Routes>
          </Layout>
        </BrowserRouter>
        </CartProvider>
    </ThemeProvider>
  )
}

export default App
