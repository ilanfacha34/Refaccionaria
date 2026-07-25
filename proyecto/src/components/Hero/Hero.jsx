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

    const productos = [

        {
            imagen: "/imagenes/nose.png",
            categoria: "Motor",
            codigo: "REF-001",
            nombre: "Kit de Transmisión",
            descripcion: "Cadena, corona y piñón para motocicleta.",
            compatibilidad: "Compatible con Italika FT150",
            precio: "$850 MXN",
            stock: "En stock"
        },

        {
            imagen: "/imagenes/producto2.png",
            categoria: "Frenos",
            codigo: "REF-002",
            nombre: "Pastillas de Freno",
            descripcion: "Mayor seguridad y rendimiento.",
            compatibilidad: "Compatible con Honda, Yamaha y Suzuki",
            precio: "$250 MXN",
            stock: "En stock"
        },

        {
            imagen: "/imagenes/34.png",
            categoria: "Motor",
            codigo: "REF-003",
            nombre: "Aceite Premium",
            descripcion: "Protección y rendimiento para tu motor.",
            compatibilidad: "Motor 4T",
            precio: "$180 MXN",
            stock: "En stock"
        }

    ];

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
                                    src={producto.imagen}
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