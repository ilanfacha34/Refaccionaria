import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <header
      className={`${styles.navbar} px-5 md:px-8 lg:px-[70px] flex-wrap md:flex-nowrap`}
    >
      <div className={styles.logo}>
        <Link to="/">
          <div className={styles.logoIcon}>
            🏍️
          </div>

          <div className={styles.logoText}>
            <h2>REFACCIONES</h2>
            <span>ITALIKA</span>
          </div>
        </Link>
      </div>

      <nav
        className={`${styles.menu} w-full md:w-auto justify-center md:justify-end mt-4 md:mt-0`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles.activo : ""
          }
        >
          Inicio
        </NavLink>

        <NavLink
          to="/refacciones"
          className={({ isActive }) =>
            isActive ? styles.activo : ""
          }
        >
          Refacciones
        </NavLink>

        <NavLink
          to="/accesorios"
          className={({ isActive }) =>
            isActive ? styles.activo : ""
          }
        >
          Accesorios
        </NavLink>

        <NavLink
          to="/contacto"
          className={({ isActive }) =>
            isActive ? styles.activo : ""
          }
        >
          Contacto
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;