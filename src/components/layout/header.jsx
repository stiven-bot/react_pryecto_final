import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import { UseTheme } from "../../contexts/ThemeContext";
import {
    Sun,
    Moon,
    ShoppingCart,
    User,
} from "lucide-react";
import { UseCart } from "../../contexts/CartContext";
import Login from "../Auth/login";
import Swal from "sweetalert2";
import "./estilolayout.css";

function Header() {
    const { tema, cambiarTema } = UseTheme();
    const { totalItems } = UseCart();
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(() => {
        const datos = localStorage.getItem("usuario");
        return datos ? JSON.parse(datos) : null;
    });

    const [mostrarLogin, setMostrarLogin] = useState(false);
    const [mostrarPerfil, setMostrarPerfil] = useState(false);

    function iniciarSesion(datosUsuario) {
        setUsuario(datosUsuario);
        setMostrarLogin(false);
    }

    async function cerrarSesion() {
        const resultado = await Swal.fire({
            title: "¿Cerrar sesión?",
            text: "¿Estás seguro de que deseas cerrar sesión?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, cerrar sesión",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#64748b",
        });

        if (!resultado.isConfirmed) {
            return;
        }

        localStorage.removeItem("usuario");

        setUsuario(null);
        setMostrarPerfil(false);

        await Swal.fire({
            title: "Sesión cerrada",
            text: "Has cerrado sesión correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#0ea5e9",
        });
    }

    return (
        <header className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">

            {/* Logo */}
            <div className="logo">
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="bg-transparent border-none p-0"
                >
                    <img
                        src="/src/assets/tortuga.jpg"
                        alt="logo de tortuga"
                        width={100}
                    />
                </button>
            </div>

            {/* Navegación */}
            <Navbar />

            {/* Controles del Header */}
            <div className="login-container relative">

                {/* Carrito */}
                <button
                    type="button"
                    onClick={() => navigate("/carrito")}
                    className="relative p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    title="Ver carrito"
                >
                    <ShoppingCart size={20} />

                    {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 bg-cyan-500 text-slate-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {totalItems}
                        </span>
                    )}
                </button>

                {/* Tema */}
                <button
                    type="button"
                    onClick={cambiarTema}
                    title={
                        tema === "claro"
                            ? "Cambiar a modo oscuro"
                            : "Cambiar a modo claro"
                    }
                    className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                    {tema === "claro" ? (
                        <Moon size={20} />
                    ) : (
                        <Sun size={20} />
                    )}
                </button>

                {/* Login / Usuario */}
                {!usuario ? (
                    <>
                        {!mostrarLogin ? (
                            <button
                                type="button"
                                className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                onClick={() =>
                                    setMostrarLogin(true)
                                }
                            >
                                Login
                            </button>
                        ) : (
                            <Login
                                onLogin={iniciarSesion}
                                onClose={() =>
                                    setMostrarLogin(false)
                                }
                            />
                        )}
                    </>
                ) : (
                    <div className="relative">

                        {/* Usuario */}
                        <button
                            type="button"
                            onClick={() =>
                                setMostrarPerfil(!mostrarPerfil)
                            }
                            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            title="Ver perfil"
                        >
                            <User size={22} />
                        </button>

                        {/* Perfil */}
                        {mostrarPerfil && (
                            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl ring-1 ring-slate-200 dark:ring-slate-700 p-4 z-50">

                                <p className="font-semibold text-slate-800 dark:text-slate-100">
                                    {usuario.nombre}
                                </p>

                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                                    Usuario
                                </p>

                                <button
                                    type="button"
                                    onClick={cerrarSesion}
                                    className="w-full px-3 py-2 rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition-colors"
                                >
                                    Cerrar sesión
                                </button>

                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;