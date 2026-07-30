import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Login.module.css";

function Login() {

    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();

    const navigate = useNavigate();


    const iniciarSesion = async (e) => {

        e.preventDefault();

        setError("");

        try {

            const respuesta = await fetch("http://localhost:3001/api/login", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    correo,
                    contraseña

                })

            });

            const datos = await respuesta.json();

            if (!respuesta.ok) {

                setError(datos.mensaje);

                return;

            }

            // Guarda la sesión con el token JWT
            login(datos.usuario, datos.token);

            // Ir al panel de administración
            navigate("/admin");

        } catch (error) {

            console.error(error);

            setError("No se pudo conectar con el servidor.");

        }

    };


    return (

        <section className={styles.login}>

            <form onSubmit={iniciarSesion}>

                <h2>Iniciar sesión</h2>

                <input
                    type="email"
                    placeholder="Correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                />

                {error && <p>{error}</p>}

                <button type="submit">
                    Entrar
                </button>

            </form>

        </section>

    );

}

export default Login;