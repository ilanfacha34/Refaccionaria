import { Link } from "react-router-dom";
import styles from "./CardProducto.module.css";

function CardProducto({ producto }) {
  return (
    <div className={styles.cardProducto}>

      <div className={styles.cardImagen}>
        <img
          src={producto.imagen}
          alt={producto.nombre}
        />
      </div>

      <div className={styles.cardContenido}>

        <span className={styles.categoria}>
          {producto.categoria}
        </span>

        <h3>{producto.nombre}</h3>

        <p className={styles.descripcion}>
          {producto.descripcion}
        </p>

        <div className={styles.precio}>
          ${producto.precio}
        </div>

        <Link
          to={`/detalle/${producto.id}`}
          className={styles.btnVer}
        >
          Ver más
        </Link>

      </div>

    </div>
  );
}

export default CardProducto;