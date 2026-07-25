import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();


  return (

    <section
      className={`${styles.accesorios} px-4 sm:px-8 lg:px-16`}
    >

      <div className={styles.titulo}>

        <h1 className="font-bold">
          Accesorios
        </h1>

        <p>
          Encuentra los mejores accesorios para personalizar
          y proteger tu motocicleta.
        </p>

      </div>


      <div className={styles.grid}>

        {
          accesorios.map((item) => (

            <div
              key={item.id}
              className={`${styles.card}
              hover:shadow-red-500/20
              hover:scale-[1.02]
              transition-all
              duration-300`}
            >


              <div className={styles.imagen}>

                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="transition-transform duration-500 hover:scale-110"
                />

              </div>


              <div className={styles.contenido}>


                <h2 className="font-bold">
                  {item.nombre}
                </h2>


                <p>
                  {item.descripcion}
                </p>


                <span>
                  ${item.precio} MXN
                </span>


                <button
                  className={`${styles.boton} hover:shadow-lg`}
                  onClick={() =>
                    navigate("/producto", {
                      state: {
                        categoria: "Accesorio",
                        codigo: `ACC-${item.id}`,
                        nombre: item.nombre,
                        descripcion: item.descripcion,
                        compatibilidad:
                          "Compatible con múltiples motocicletas",
                        precio: `$${item.precio} MXN`,
                        stock: "En stock",
                        imagen: item.imagen,
                      },
                    })
                  }
                >

                  VER MÁS

                </button>


              </div>


            </div>

          ))
        }


      </div>


    </section>

  );

}


export default Accesorios;