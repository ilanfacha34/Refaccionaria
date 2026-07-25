import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {

  return (

    <footer className={styles.footer}>

      <div
        className={`${styles.contenedor}
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-10`}
      >

        <div>

          <h2 className="text-2xl md:text-3xl">
            REFACCIONES
          </h2>

          <span>
            ITALIKA
          </span>

          <p>
            Catálogo digital de refacciones y accesorios
            para motocicletas.
          </p>

        </div>

        <div>

          <h3 className="text-xl">
            Navegación
          </h3>

          <Link to="/">Inicio</Link>

          <Link to="/refacciones">
            Refacciones
          </Link>

          <Link to="/accesorios">
            Accesorios
          </Link>

          <Link to="/contacto">
            Contacto
          </Link>

        </div>

        <div>

          <h3 className="text-xl">
            Contacto
          </h3>

          <p>📍 Estado de México</p>

          <p>📞 +52 55 1234 5678</p>

          <p>📧 ventas@refaccionesitalika.com</p>

        </div>

      </div>

      <div
        className={`${styles.copy}
        px-4
        text-sm
        md:text-base`}
      >

        © 2026 Refacciones Italika |
        Todos los derechos reservados.

      </div>

    </footer>

  );

}

export default Footer;