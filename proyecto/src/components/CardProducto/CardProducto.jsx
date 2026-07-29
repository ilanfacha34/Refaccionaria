import { Link } from "react-router-dom";
import styles from "./CardProducto.module.css";

function CardProducto({ producto }) {

  return (

    <div
      className={`${styles.cardProducto} hover:shadow-red-500/20 hover:scale-[1.02] transition-all duration-300`}
    >

      <div className={styles.cardImagen}>

        <img
          src={`http://localhost:3001${producto.imagen}`}
          alt={producto.nombre}
          className="transition-transform duration-500 hover:scale-110"
        />

      </div>

      <div className={styles.cardContenido}>

        <span
          className={`${styles.categoria} uppercase tracking-wider`}
        >
          {producto.categoria}
        </span>

        <h3 className="font-bold">
          {producto.nombre}
        </h3>

        <p className={styles.descripcion}>
          {producto.descripcion}
        </p>

        <div
          className={`${styles.precio} flex items-center justify-between`}
        >

          <span>${producto.precio}</span>

        </div>

        <Link
          to={`/detalle/${producto.id_refaccion}`}
          className={`${styles.btnVer} shadow-lg hover:shadow-red-500/30`}
        >
          Ver más
        </Link>

      </div>

    </div>

  );

}

export default CardProducto;