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

      <section className={styles.detalleError}>

        <h1>Producto no encontrado</h1>

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

    <section className={styles.detalle}>

      <div className={styles.detalleImagen}>

        <img
          src={producto.imagen}
          alt={producto.nombre}
        />

      </div>

      <div className={styles.detalleInfo}>

        <span className={styles.detalleCategoria}>
          {producto.categoria}
        </span>

        <h1>{producto.nombre}</h1>

        <p className={styles.detalleDescripcion}>
          {producto.descripcion}
        </p>

        <h2 className={styles.detallePrecio}>
          ${producto.precio}
        </h2>

        <div className={styles.detalleBotones}>

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