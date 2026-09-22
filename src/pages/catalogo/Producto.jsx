import { useState } from "react";
import { useCharacters } from "../../hooks/useCharacteCard";
import CharacterCard from "../../components/Catalogo/characteCard";

function Productos() {
    const { personajes, cargando, error } = useCharacters();

    const personajesPorPagina = 8;

    const [paginaActual, setPaginaActual] = useState(1);

    const totalPaginas = Math.ceil(
        personajes.length / personajesPorPagina
    );

    const indiceInicial =
        (paginaActual - 1) * personajesPorPagina;

    const indiceFinal =
        indiceInicial + personajesPorPagina;

    const personajesPagina =
        personajes.slice(indiceInicial, indiceFinal);

    function cambiarPagina(numeroPagina) {
        setPaginaActual(numeroPagina);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return (
        <section className="bg-slate-50 dark:bg-slate-900 min-h-screen px-6 py-10 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    Catálogo
                </h2>

                <p className="text-slate-500 dark:text-slate-400 mt-2">
                    Personajes de Final Space disponibles en la tienda
                </p>

                {cargando && (
                    <p className="mt-10 text-center text-slate-400 dark:text-slate-500">
                        Cargando personajes...
                    </p>
                )}

                {error && (
                    <p className="mt-10 text-center text-rose-500">
                        {error}
                    </p>
                )}

                {!cargando && !error && (
                    <>
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {personajesPagina.map((personaje) => (
                                <CharacterCard
                                    key={personaje.id}
                                    personaje={personaje}
                                />
                            ))}
                        </div>

                        {totalPaginas > 1 && (
                            <div className="mt-10 flex items-center justify-center gap-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        cambiarPagina(paginaActual - 1)
                                    }
                                    disabled={paginaActual === 1}
                                    className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                                >
                                    Anterior
                                </button>

                                {Array.from(
                                    { length: totalPaginas },
                                    (_, indice) => {
                                        const numeroPagina =
                                            indice + 1;

                                        return (
                                            <button
                                                key={numeroPagina}
                                                type="button"
                                                onClick={() =>
                                                    cambiarPagina(
                                                        numeroPagina
                                                    )
                                                }
                                                className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                                                    paginaActual ===
                                                    numeroPagina
                                                        ? "bg-cyan-500 text-white"
                                                        : "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600"
                                                }`}
                                            >
                                                {numeroPagina}
                                            </button>
                                        );
                                    }
                                )}

                                <button
                                    type="button"
                                    onClick={() =>
                                        cambiarPagina(paginaActual + 1)
                                    }
                                    disabled={
                                        paginaActual === totalPaginas
                                    }
                                    className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                                >
                                    Siguiente
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}

export default Productos;
