import { Link } from "react-router-dom";
import styles from "./Accesorios.module.css";

const accesorios = [
  {
    id: 101,
    nombre: "Casco Deportivo",
    descripcion: "Casco certificado de alta resistencia.",
    precio: 1250,
    imagen: "/imagenes/casco.png",
  },
  {
    id: 102,
    nombre: "Guantes",
    descripcion: "Guantes antideslizantes para motociclista.",
    precio: 450,
    imagen: "/imagenes/guantes.png",
  },
  {
    id: 103,
    nombre: "Espejos Deportivos",
    descripcion: "Diseño moderno y universal.",
    precio: 580,
    imagen: "/imagenes/89.png",
  },
];

function Accesorios() {
  return (
    <section className={styles.accesorios}>

      <div className={styles.titulo}>

        <h1>Accesorios</h1>

        <p>
          Encuentra los mejores accesorios para personalizar
          y proteger tu motocicleta.
        </p>

      </div>

      <div className={styles.grid}>

        {accesorios.map((item) => (

          <div
            key={item.id}
            className={styles.card}
          >

            <div className={styles.imagen}>
              <img
                src={item.imagen}
                alt={item.nombre}
              />
            </div>

            <div className={styles.contenido}>

              <h2>{item.nombre}</h2>

              <p>{item.descripcion}</p>

              <span>${item.precio}</span>

              <Link
                to="/contacto"
                className={styles.boton}
              >
                Solicitar
              </Link>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Accesorios;