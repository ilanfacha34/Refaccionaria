import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ProductoHero.module.css";

function ProductoHero() {

    const navigate = useNavigate();
    const { state } = useLocation();

    if (!state) {

        return (

            <section className={`${styles.error} px-4`}>

                <h2 className="text-3xl md:text-5xl">
                    Producto no encontrado
                </h2>

                <button
                    onClick={() => navigate("/")}
                >
                    Volver al inicio
                </button>

            </section>

        );

    }

    const mensaje =
        `Hola, me interesa la siguiente refacción:%0A%0A` +
        `${state.nombre}%0A` +
        `Código: ${state.codigo}%0A` +
        `Precio: ${state.precio}`;

    return (

        <section
            className={`${styles.detalle} px-4 sm:px-6 lg:px-8`}
        >

            <div
                className={`${styles.contenedor}
                grid
                grid-cols-1
                lg:grid-cols-2
                gap-8
                lg:gap-16
                items-center`}
            >

                <div
                    className={`${styles.imagen}
                    p-5
                    sm:p-8
                    lg:p-10`}
                >

                    <img
                        src={state.imagen}
                        alt={state.nombre}
                        className="mx-auto w-full max-w-md lg:max-w-xl"
                    />

                </div>

                <div className={styles.informacion}>

                    <span className={styles.categoria}>
                        {state.categoria}
                    </span>

                    <h1 className="text-3xl md:text-5xl">
                        {state.nombre}
                    </h1>

                    <p className={styles.codigo}>
                        Código: {state.codigo}
                    </p>

                    <div className={styles.stock}>
                        ✔ {state.stock}
                    </div>

                    <h2
                        className={`${styles.precio}
                        text-4xl
                        md:text-5xl`}
                    >
                        {state.precio}
                    </h2>

                    <div className={styles.bloque}>

                        <h3>Descripción</h3>

                        <p>
                            {state.descripcion}
                        </p>

                    </div>

                    <div className={styles.bloque}>

                        <h3>Compatibilidad</h3>

                        <p>
                            {state.compatibilidad}
                        </p>

                    </div>

                    <div
                        className={`${styles.botones}
                        flex
                        flex-col
                        sm:flex-row`}
                    >

                        <a
                            href={`https://wa.me/525512345678?text=${mensaje}`}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.whatsapp}
                        >
                            Solicitar por WhatsApp
                        </a>

                        <button
                            className={styles.regresar}
                            onClick={() => navigate(-1)}
                        >
                            Regresar
                        </button>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default ProductoHero;