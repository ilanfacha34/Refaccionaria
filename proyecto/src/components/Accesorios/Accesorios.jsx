import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Accesorios.module.css";

function Accesorios() {

  const navigate = useNavigate();

  const [accesorios, setAccesorios] = useState([]);

  useEffect(() => {

    const cargarAccesorios = async () => {

      try {

        const respuesta = await fetch(
          "http://localhost:3001/api/accesorios"
        );

        const datos = await respuesta.json();

        setAccesorios(datos);

      }

      catch (error) {

        console.log(error);

      }

    };

    cargarAccesorios();

  }, []);

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

          accesorios.length > 0 ? (

            accesorios.map((item) => (

              <div

                key={item.id_accesorio}

                className={`${styles.card}
                hover:shadow-red-500/20
                hover:scale-[1.02]
                transition-all
                duration-300`}

              >

                <div className={styles.imagen}>

                  <img

                    src={`http://localhost:3001${item.imagen}`}

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

                          codigo: `ACC-${item.id_accesorio}`,

                          nombre: item.nombre,

                          descripcion: item.descripcion,

                          compatibilidad:
                            "Compatible con múltiples motocicletas",

                          precio: `$${item.precio} MXN`,

                          stock: item.stock,

                          imagen: `http://localhost:3001${item.imagen}`,

                        },

                      })

                    }

                  >

                    VER MÁS

                  </button>

                </div>

              </div>

            ))

          ) : (

            <h2 style={{ color: "white", textAlign: "center", width: "100%" }}>

              No hay accesorios disponibles.

            </h2>

          )

        }

      </div>

    </section>

  );

}

export default Accesorios;