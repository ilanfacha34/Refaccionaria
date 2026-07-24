import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {

  return (

    <footer className={styles.footer}>

      <div className={styles.contenedor}>

        <div>

          <h2>REFACCIONES</h2>

          <span>ITALIKA</span>

          <p>

            Catálogo digital de refacciones y accesorios
            para motocicletas.

          </p>

        </div>

        <div>

          <h3>Navegación</h3>

          <Link to="/">Inicio</Link>

          <Link to="/refacciones">Refacciones</Link>

          <Link to="/accesorios">Accesorios</Link>

          <Link to="/contacto">Contacto</Link>

        </div>

        <div>

          <h3>Contacto</h3>

          <p>📍 Estado de México</p>

          <p>📞 +52 55 1234 5678</p>

          <p>📧 ventas@refaccionesitalika.com</p>

        </div>

      </div>

      <div className={styles.copy}>

        © 2026 Refacciones Italika |
        Todos los derechos reservados.

      </div>

    </footer>

  );

}

export default Footer;