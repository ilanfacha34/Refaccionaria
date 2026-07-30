import { createContext, useContext, useState } from "react";

const initialUserState = () => {

    const datos = localStorage.getItem("usuario");

    if (!datos) return null;

    try {
        return JSON.parse(datos);
    } catch {
        return null;
    }
};

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [usuario, setUsuario] = useState(initialUserState);

    const login = (usuarioLogueado, token) => {

        const datosSesion = {
            ...usuarioLogueado,
            token
        };

        localStorage.setItem(
            "usuario",
            JSON.stringify(datosSesion)
        );

        setUsuario(datosSesion);

    };

    const logout = () => {

        localStorage.removeItem("usuario");

        setUsuario(null);

    };

    const esAdmin = usuario?.rol === "admin";
    const esTrabajador = usuario?.rol === "trabajador";

    return (

        <AuthContext.Provider
            value={{
                usuario,
                admin: esAdmin,
                trabajador: esTrabajador,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}