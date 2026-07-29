import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Hero.module.css";

function Hero() {

    const navigate = useNavigate();

    const categorias = [

        {
            icono: "⚙️",
            nombre: "Motor"
        },

        {
            icono: "🛑",
            nombre: "Frenos"
        },

        {
            icono: "⚡",
            nombre: "Eléctrico"
        },

        {
            icono: "🔧",
            nombre: "Suspensión"
        }

    ];

    const [productos, setProductos] = useState([]);

useEffect(() => {

    obtenerProductos();

}, []);

async function obtenerProductos() {

    try {

        const respuesta = await fetch(
            "http://localhost:3001/api/refacciones"
        );

        const datos = await respuesta.json();

        setProductos(datos);

    } catch (error) {

        console.error("Error al obtener productos:", error);

    }

}

    

    return (

        <>

            <section className={styles.hero}>

                <div className={styles.heroInfo}>

                    <span className={styles.subtitulo}>
                        CATÁLOGO DIGITAL
                    </span>

                    <h1>
                        Bienvenido a Nuestro
                        <br />
                        Catálogo de
                        <span> Refacciones </span>
                        para Motocicletas
                    </h1>

                    <p>
                        Encuentra las mejores refacciones y accesorios para tu motocicleta.
                        Calidad garantizada, precios accesibles y compatibilidad con las principales marcas.
                    </p>

                    <div className={styles.heroBotones}>

                        <button
                            className={styles.btnPrincipal}
                            onClick={() => navigate("/refacciones")}
                        >
                            Ver Catálogo
                        </button>

                        <button
                            className={styles.btnSecundario}
                            onClick={() => navigate("/contacto")}
                        >
                            Contactar
                        </button>

                    </div>

                </div>

            </section>

            <section className={styles.estadisticas}>

                <div className={styles.estadistica}>
                    <h2>+500</h2>
                    <p>Refacciones disponibles</p>
                </div>

                <div className={styles.estadistica}>
                    <h2>+200</h2>
                    <p>Accesorios en catálogo</p>
                </div>

                <div className={styles.estadistica}>
                    <h2>10+</h2>
                    <p>Años de experiencia</p>
                </div>

                <div className={styles.estadistica}>
                    <h2>100%</h2>
                    <p>Garantía de calidad</p>
                </div>

            </section>

            <section className={styles.categorias}>

                <h2>Categorías Principales</h2>

                <p className={styles.categoriasTexto}>
                    Explora nuestro catálogo organizado por sistema
                </p>

                <div className={styles.categoriasGrid}>

                    {
                        categorias.map((categoria, index) => (

                            <div
                                key={index}
                                className={styles.categoriaCard}
                                onClick={() => navigate("/refacciones")}
                            >

                                <div className={styles.iconoCategoria}>
                                    {categoria.icono}
                                </div>

                                <h3>{categoria.nombre}</h3>

                            </div>

                        ))
                    }

                </div>

            </section>
                        <section className={styles.productos}>

                <div className={styles.productosHeader}>

                    <div>

                        <h2>Refacciones Destacadas</h2>

                        <p className={styles.productosTexto}>
                            Descubre nuestras refacciones más recomendadas.
                        </p>

                    </div>

                    <button
                        className={styles.verTodas}
                        onClick={() => navigate("/refacciones")}
                    >
                        Ver todas →
                    </button>

                </div>

                <div className={styles.productosGrid}>

                    {

                        productos.map((producto, index) => (

                            <div
                                className={styles.productoCard}
                                key={index}
                            >

                                <div className={styles.stock}>
                                    ✔ {producto.stock}
                                </div>

                                <img
    src={`http://localhost:3001${producto.imagen}`}
    alt={producto.nombre}
/>

                                <div className={styles.productoContenido}>

                                    <small className={styles.categoria}>
                                        {producto.categoria}
                                    </small>

                                    <h3>
                                        {producto.nombre}
                                    </h3>

                                    <p className={styles.codigo}>
                                        {producto.codigo}
                                    </p>

                                    <p>
                                        {producto.descripcion}
                                    </p>

                                    <p className={styles.compatibilidad}>
                                        {producto.compatibilidad}
                                    </p>

                                    <div className={styles.productoFooter}>

                                        <span>
                                            {producto.precio}
                                        </span>

                                        <button
                                            onClick={() =>
                                                navigate("/producto", {
                                                    state: producto
                                                })
                                            }
                                        >
                                            VER MÁS
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </section>

            <section className={styles.contactoCTA}>

                <div className={styles.contactoContenido}>

                    <h2>
                        ¿No encuentras tu refacción?
                    </h2>

                    <p>
                        Contáctanos directamente y te ayudaremos a encontrar
                        la pieza ideal para tu motocicleta. Trabajamos con una
                        amplia variedad de marcas y modelos.
                    </p>

                    <button
                        className={styles.btnContacto}
                        onClick={() => navigate("/contacto")}
                    >
                        CONTACTAR AHORA
                    </button>

                </div>

            </section>
                    </>

    );

}

export default Hero;