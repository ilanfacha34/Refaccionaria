import { useEffect, useState } from "react";
import CardProducto from "../CardProducto/CardProducto";
import styles from "./Refacciones.module.css";

function Refacciones() {

  const [buscar, setBuscar] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [productos, setProductos] = useState([]);

  const categorias = [
    "Todos",
    "Motor",
    "Frenos",
    "Transmisión",
    "Eléctrico",
    "Suspensión",
    "Lubricantes",
    "Accesorios"
  ];

  useEffect(() => {

    const cargarProductos = async () => {

      try {

        const respuesta = await fetch(
          "http://localhost:3001/api/refacciones"
        );

        const datos = await respuesta.json();

        setProductos(datos);

      }

      catch (error) {

        console.log(error);

      }

    };

    cargarProductos();

  }, []);

  const productosFiltrados = productos.filter((producto) => {

    const coincideNombre = producto.nombre
      .toLowerCase()
      .includes(buscar.toLowerCase());

    const coincideCategoria =
      categoria === "Todos" ||
      producto.categoria === categoria;

    return coincideNombre && coincideCategoria;

  });

  return (

    <section
      className={`${styles.refacciones}
      flex-col lg:flex-row
      px-4 sm:px-6 md:px-8 lg:px-10
      py-8`}
    >

      <aside
        className={`${styles.menuLateral}
        w-full lg:w-[260px]
        shrink-0`}
      >

        <h2>Categorías</h2>

        {

          categorias.map((cat) => (

            <button

              key={cat}

              className={
                categoria === cat
                  ? `${styles.categoria} ${styles.activa}`
                  : styles.categoria
              }

              onClick={() => setCategoria(cat)}

            >

              {cat}

            </button>

          ))

        }

      </aside>

      <main
        className={`${styles.contenidoRefacciones} flex-1`}
      >

        <div className={styles.encabezado}>

          <h1 className="text-3xl md:text-4xl">

            Catálogo de Refacciones

          </h1>

          <input

            type="text"

            placeholder="Buscar producto..."

            value={buscar}

            onChange={(e) => setBuscar(e.target.value)}

          />

        </div>

        <div

          className={`${styles.gridProductos}
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3`}

        >

          {

            productosFiltrados.length > 0 ? (

              productosFiltrados.map((producto) => (

                <CardProducto

                  key={producto.id_refaccion}

                  producto={producto}

                />

              ))

            ) : (

              <h2 className={styles.sinProductos}>

                No se encontraron productos.

              </h2>

            )

          }

        </div>

      </main>

    </section>

  );

}

export default Refacciones;