import { createContext, useContext, useState,useEffect } from "react";

const ThemeContext = createContext();// esta linea crea la caja vacia

export function ThemeProvider({ children }) {
    //contralador de tema
    const [tema, setTema] = useState("claro");

    const cambiarTema = () => {
        //funcion que cambia de tema claro y oscuro
        setTema((actual)=>(actual == "claro" ? "oscuro" : "claro"));
    };

    //cada vez que "tema" cambia, agregamos o quitamos la clase "dark" en <html>
    useEffect(()=>{
        const root = document.documentElement;

        if(tema==="oscuro"){
            root.classList.add("dark");
        }else{
            root.classList.remove("dark");
        }
    },[tema]);

    return(
        <ThemeContext.Provider value={{tema, cambiarTema}}>
            {children}
        </ThemeContext.Provider>
    )
};

export function UseTheme() {
    return useContext(ThemeContext);
};