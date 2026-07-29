import { createContext, useContext, useState } from "react";


const AuthContext = createContext();


export function AuthProvider({children}){


    const [admin, setAdmin] = useState(
        localStorage.getItem("admin") === "true"
    );


    const login = (usuario)=>{

        localStorage.setItem("admin", "true");
        localStorage.setItem("usuario", usuario);

        // Actualiza el Navbar inmediatamente
        setAdmin(true);

    };


    const logout = ()=>{

        localStorage.removeItem("admin");
        localStorage.removeItem("usuario");

        // Actualiza el Navbar inmediatamente
        setAdmin(false);

    };


    return(

        <AuthContext.Provider
            value={{
                admin,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}


export function useAuth(){

    return useContext(AuthContext);

}