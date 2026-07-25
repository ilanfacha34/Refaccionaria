import { useParams, Link } from "react-router-dom";
import productos from "../../data/productos";
import styles from "./Detalle.module.css";

function Detalle() {

  const { id } = useParams();

  const producto = productos.find(
    (p) => p.id === Number(id)
  );

  if (!producto) {

    return (

      <section
        className={`${styles.detalleError} px-4 text-center`}
      >

        <h1 className="text-3xl md:text-5xl">
          Producto no encontrado
        </h1>

        <Link
          to="/refacciones"
          className={styles.btnRegresar}
        >
          Regresar
        </Link>

      </section>

    );

  }

  return (

    <section
      className={`${styles.detalle}
      flex-col
      lg:flex-row
      px-4
      sm:px-6
      lg:px-8`}
    >

      <div
        className={`${styles.detalleImagen}
        w-full
        max-w-xl`}
      >

        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="mx-auto w-full"
        />

      </div>

      <div
        className={`${styles.detalleInfo}
        w-full`}
      >

        <span className={styles.detalleCategoria}>
          {producto.categoria}
        </span>

        <h1 className="text-3xl md:text-5xl">
          {producto.nombre}
        </h1>

        <p className={styles.detalleDescripcion}>
          {producto.descripcion}
        </p>

        <h2
          className={`${styles.detallePrecio}
          text-4xl md:text-5xl`}
        >
          ${producto.precio}
        </h2>

        <div
          className={`${styles.detalleBotones}
          flex-col
          sm:flex-row`}
        >

          <a
            href={`https://wa.me/525512345678?text=Hola,%20me%20interesa%20${producto.nombre}`}
            target="_blank"
            rel="noreferrer"
            className={styles.btnComprar}
          >
            Solicitar por WhatsApp
          </a>

          <Link
            to="/refacciones"
            className={styles.btnRegresar}
          >
            Regresar
          </Link>

        </div>

      </div>

    </section>

  );

}

export default Detalle;