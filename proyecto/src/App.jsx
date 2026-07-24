import { BrowserRouter, Routes, Route } from "react-router-dom";

import styles from "./App.module.css";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Refacciones from "./components/Refacciones/Refacciones";
import Accesorios from "./components/Accesorios/Accesorios";
import Contacto from "./components/Contacto/Contacto";
import Detalle from "./components/Detalle_producto/Detalle";
import ProductoHero from "./components/producto/ProductoHero";
import Footer from "./components/Footer/Footer";
import NodFound from "./components/NodFound/NodFound";

function App() {

  return (

    <BrowserRouter>

      <div className={styles.app}>

        <Navbar />

        <main className={styles.contenido}>

          <Routes>

            <Route
              path="/"
              element={<Hero />}
            />

            <Route
              path="/refacciones"
              element={<Refacciones />}
            />

            <Route
              path="/accesorios"
              element={<Accesorios />}
            />

            <Route
              path="/contacto"
              element={<Contacto />}
            />

            <Route
              path="/detalle/:id"
              element={<Detalle />}
            />

            <Route
              path="/producto"
              element={<ProductoHero />}
            />

            <Route
              path="*"
              element={<NodFound />}
            />

          </Routes>

        </main>

        <Footer />

      </div>

    </BrowserRouter>

  );

}

export default App;