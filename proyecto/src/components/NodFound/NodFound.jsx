import { Link } from "react-router-dom";
import styles from "./NodFound.module.css";

function NodFound() {

  return (

    <section className={styles.notFound}>

      <div className={styles.contenido}>

        <h1>404</h1>

        <h2>Página no encontrada</h2>

        <p>

          Lo sentimos, la página que buscas no existe
          o fue movida.

        </p>

        <Link
          to="/"
          className={styles.boton}
        >
          Volver al inicio
        </Link>

      </div>

    </section>

  );

}

export default NodFound;