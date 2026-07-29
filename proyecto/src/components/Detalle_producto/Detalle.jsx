import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./Detalle.module.css";

function Detalle() {

    const { id } = useParams();

    const [producto, setProducto] = useState(null);

    const [cargando, setCargando] = useState(true);

    useEffect(() => {

        const cargarProducto = async () => {

            try {

                let respuesta = await fetch(
                    `http://localhost:3001/api/refacciones/${id}`
                );

                if (respuesta.ok) {

                    const datos = await respuesta.json();

                    setProducto(datos);

                    setCargando(false);

                    return;

                }

                respuesta = await fetch(
                    `http://localhost:3001/api/accesorios/${id}`
                );

                if (respuesta.ok) {

                    const datos = await respuesta.json();

                    setProducto(datos);

                }

            }

            catch (error) {

                console.log(error);

            }

            setCargando(false);

        };

        cargarProducto();

    }, [id]);

    if (cargando) {

        return (

            <section className={styles.detalleError}>

                <h1>Cargando producto...</h1>

            </section>

        );

    }

    if (!producto) {

        return (

            <section className={`${styles.detalleError} px-4 text-center`}>

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
            className={`
                ${styles.detalle}
                flex-col
                lg:flex-row
                px-4
                sm:px-6
                lg:px-8
            `}
        >

            <div
                className={`
                    ${styles.detalleImagen}
                    w-full
                    max-w-xl
                `}
            >

                <img
                    src={`http://localhost:3001${producto.imagen}`}
                    alt={producto.nombre}
                    className="mx-auto w-full"
                />

            </div>

            <div
  className={`
    ${styles.detalleInfo}
    w-full
  `}
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

                {
                    producto.numero_parte && (
                        <p className={styles.detalleDato}>
                            <strong>Número de parte:</strong> {producto.numero_parte}
                        </p>
                    )
                }

                {
                    producto.especificaciones && (
                        <p className={styles.detalleDato}>
                            <strong>Especificaciones:</strong> {producto.especificaciones}
                        </p>
                    )
                }

                {
                    producto.garantia && (
                        <p className={styles.detalleDato}>
                            <strong>Garantía:</strong> {producto.garantia}
                        </p>
                    )
                }

                <p className={styles.detalleDato}>
                    <strong>Stock:</strong> {producto.stock}
                </p>

                <h2
                    className={`
                        ${styles.detallePrecio}
                        text-4xl
                        md:text-5xl
                    `}
                >
                    ${producto.precio}
                </h2>

                <div
                    className={`
                        ${styles.detalleBotones}
                        flex-col
                        sm:flex-row
                    `}
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
                        to={
                            producto.numero_parte
                                ? "/refacciones"
                                : "/accesorios"
                        }
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