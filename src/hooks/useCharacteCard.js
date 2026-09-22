import { useEffect, useState } from "react";

const RANGO_PRECIO = {
    min: 7000,
    max: 50000,
};

function precioAleatorio() {
    return (
        Math.floor(
            Math.random() * (RANGO_PRECIO.max - RANGO_PRECIO.min + 1)
        ) + RANGO_PRECIO.min
    );
}

export function useCharacters() {
    const [personajes, setPersonajes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let activo = true;

        async function cargarPersonajes() {
            try {
                setCargando(true);
                setError(null);

                const resPersonajes = await fetch(
                    "https://finalspaceapi.com/api/v0/character/"
                );

                if (!resPersonajes.ok) {
                    throw new Error("No se pudo cargar el catálogo");
                }

                const dataPersonajes = await resPersonajes.json();

                const listaConDetalles = dataPersonajes.map((personaje) => ({
                    ...personaje,
                    precio: precioAleatorio(),
                }));

                if (activo) {
                    setPersonajes(listaConDetalles);
                }
            } catch (err) {
                if (activo) {
                    setError(err.message);
                }
            } finally {
                if (activo) {
                    setCargando(false);
                }
            }
        }

        cargarPersonajes();

        return () => {
            activo = false;
        };
    }, []);

    return {
        personajes,
        cargando,
        error,
    };
}