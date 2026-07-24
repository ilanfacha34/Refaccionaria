import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ProductoHero.module.css";

function ProductoHero() {

    const navigate = useNavigate();
    const { state } = useLocation();

    if (!state) {

        return (

            <section className={styles.error}>

                <h2>Producto no encontrado</h2>

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

        <section className={styles.detalle}>

            <div className={styles.contenedor}>

                <div className={styles.imagen}>

                    <img
                        src={state.imagen}
                        alt={state.nombre}
                    />

                </div>

                <div className={styles.informacion}>

                    <span className={styles.categoria}>
                        {state.categoria}
                    </span>

                    <h1>
                        {state.nombre}
                    </h1>

                    <p className={styles.codigo}>
                        Código: {state.codigo}
                    </p>

                    <div className={styles.stock}>
                        ✔ {state.stock}
                    </div>

                    <h2 className={styles.precio}>
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

                    <div className={styles.botones}>

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