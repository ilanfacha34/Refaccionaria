import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <header className={styles.navbar}>
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

      <nav className={styles.menu}>
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