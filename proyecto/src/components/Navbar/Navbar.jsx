import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import styles from "./Navbar.module.css";


function Navbar(){

    const { admin, logout } = useAuth();

    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);



    const cerrarSesion = () => {

        logout();

        navigate("/login");

        setMenuOpen(false);

    };


    const cerrarMenu = () => {

        setMenuOpen(false);

    };



    return (

        <header className={styles.navbar}>


            {/* LOGO */}

            <div className={styles.logo}>

                <NavLink to="/">

                    <div className="flex items-center">


                        <div className={styles.logoIcon}>

                            🏍️

                        </div>


                        <div className={styles.logoText}>

                            <h2>
                                Italika
                            </h2>


                            <span>
                                REFACCIONES
                            </span>


                        </div>


                    </div>

                </NavLink>

            </div>




            {/* BOTON HAMBURGUESA */}

            <button

                className="
                    md:hidden
                    text-white
                    text-3xl
                    z-50
                "

                onClick={()=>setMenuOpen(!menuOpen)}

            >

                ☰

            </button>





            {/* MENU */}

            <nav

                className={`
                    
                    ${styles.menu}

                    ${menuOpen ? "flex" : "hidden"}

                    md:flex

                    flex-col
                    md:flex-row

                    absolute
                    md:static

                    top-[80px]
                    left-0

                    w-full
                    md:w-auto

                    bg-[#171717]
                    md:bg-transparent

                    p-6
                    md:p-0

                    gap-6
                    md:gap-[40px]

                    z-40

                `}

            >



                <NavLink

                    to="/"

                    onClick={cerrarMenu}

                    className={({isActive}) =>
                        isActive ? styles.activo : ""
                    }

                >

                    Inicio

                </NavLink>





                <NavLink

                    to="/refacciones"

                    onClick={cerrarMenu}

                    className={({isActive}) =>
                        isActive ? styles.activo : ""
                    }

                >

                    Refacciones

                </NavLink>





                <NavLink

                    to="/accesorios"

                    onClick={cerrarMenu}

                    className={({isActive}) =>
                        isActive ? styles.activo : ""
                    }

                >

                    Accesorios

                </NavLink>





                <NavLink

                    to="/contacto"

                    onClick={cerrarMenu}

                    className={({isActive}) =>
                        isActive ? styles.activo : ""
                    }

                >

                    Contacto

                </NavLink>





                {
                    admin ? (

                        <>


                            <NavLink

                                to="/admin"

                                onClick={cerrarMenu}

                                className={({isActive}) =>
                                    isActive ? styles.activo : ""
                                }

                            >

                                Admin

                            </NavLink>





                            <button

                                onClick={cerrarSesion}

                                className="
                                    text-white
                                    font-semibold
                                    hover:text-[#ff5c73]
                                    transition
                                "

                            >

                                Salir

                            </button>


                        </>



                    ) : (


                        <NavLink

                            to="/login"

                            onClick={cerrarMenu}

                            className={({isActive}) =>
                                isActive ? styles.activo : ""
                            }

                        >

                            Login

                        </NavLink>


                    )

                }



            </nav>


        </header>

    );

}


export default Navbar;