import { Link } from "react-router-dom";
import styles from "./NodFound.module.css";

function NodFound() {
  return (
    <section
      className={`${styles.notFound} px-5 sm:px-8 md:px-10`}
    >
      <div
        className={`${styles.contenido} max-w-xl`}
      >
        <h1 className="text-[90px] sm:text-[120px] md:text-[150px]">
          404
        </h1>

        <h2 className="text-3xl sm:text-4xl md:text-[42px]">
          Página no encontrada
        </h2>

        <p className="text-base sm:text-lg">
          Lo sentimos, la página que buscas no existe
          o fue movida.
        </p>

        <Link
          to="/"
          className={`${styles.boton} w-full sm:w-auto text-center`}
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}

export default NodFound;