import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "./navbar";

import { UseTheme } from "../../contexts/ThemeContext";
import { UseCart } from "../../contexts/CartContext";

import {
    Sun,
    Moon,
    ShoppingCart,
    User,
    Mail,
    Phone,
    MapPin,
    Package,
    LogOut,
    X,
} from "lucide-react";

import Login from "../Auth/login";
import Swal from "sweetalert2";

import tortuga from "../../assets/tortuga.jpg";
import perfil from "../../assets/perfil.png";

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
            
            {/* LOGO */}
            <div className="logo">
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="bg-transparent border-none p-0"
                >
                    <img
                        src={tortuga}
                        alt="Logo de tortuga"
                        width={100}
                    />
                </button>
            </div>

            <Navbar />

            <div className="login-container relative">

                {/* CARRITO */}
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

                {/* MODO OSCURO */}
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

                {/* LOGIN / PERFIL */}
                {!usuario ? (
                    <>
                        {!mostrarLogin ? (
                            <button
                                type="button"
                                className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                onClick={() => setMostrarLogin(true)}
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

                        {/* BOTÓN PERFIL */}
                        <button
                            type="button"
                            onClick={() =>
                                setMostrarPerfil(!mostrarPerfil)
                            }
                            className="p-1 rounded-full hover:ring-2 hover:ring-cyan-400 transition-all"
                            title="Ver perfil"
                        >
                            <img
                                src={perfil}
                                alt="Foto de perfil"
                                className="w-10 h-10 rounded-full object-cover border-2 border-cyan-500"
                            />
                        </button>

                        {/* TARJETA DEL PERFIL */}
                        {mostrarPerfil && (
                            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700 p-5 z-50">

                                {/* X CERRAR */}
                                <div className="flex justify-end mb-1">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setMostrarPerfil(false)
                                        }
                                        className="w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-rose-500 transition-all"
                                        title="Cerrar perfil"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* FOTO */}
                                <div className="flex justify-center mb-3">
                                    <img
                                        src={perfil}
                                        alt="Foto de perfil"
                                        className="w-20 h-20 rounded-full object-cover border-4 border-cyan-500 shadow-lg"
                                    />
                                </div>

                                {/* NOMBRE */}
                                <div className="text-center mb-4">
                                    <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                                        {usuario.nombre}
                                    </h2>

                                    <p className="text-sm text-cyan-500 font-medium">
                                        {usuario.tipoUsuario}
                                    </p>
                                </div>

                                {/* INFORMACIÓN */}
                                <div className="space-y-3 border-t border-slate-200 dark:border-slate-700 pt-4">

                                    {/* CORREO */}
                                    <div className="flex items-center gap-3">
                                        <Mail
                                            size={18}
                                            className="text-cyan-500"
                                        />

                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Correo
                                            </p>

                                            <p className="text-sm text-slate-700 dark:text-slate-200 break-all">
                                                {usuario.correo}
                                            </p>
                                        </div>
                                    </div>

                                    {/* TELÉFONO */}
                                    <div className="flex items-center gap-3">
                                        <Phone
                                            size={18}
                                            className="text-cyan-500"
                                        />

                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Teléfono
                                            </p>

                                            <p className="text-sm text-slate-700 dark:text-slate-200">
                                                {usuario.telefono}
                                            </p>
                                        </div>
                                    </div>

                                    {/* CIUDAD */}
                                    <div className="flex items-center gap-3">
                                        <MapPin
                                            size={18}
                                            className="text-cyan-500"
                                        />

                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Ciudad
                                            </p>

                                            <p className="text-sm text-slate-700 dark:text-slate-200">
                                                {usuario.ciudad}
                                            </p>
                                        </div>
                                    </div>

                                    {/* CARRITO */}
                                    <div className="flex items-center gap-3">
                                        <Package
                                            size={18}
                                            className="text-cyan-500"
                                        />

                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Carrito
                                            </p>

                                            <p className="text-sm text-slate-700 dark:text-slate-200">
                                                {totalItems}{" "}
                                                {totalItems === 1
                                                    ? "producto"
                                                    : "productos"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* CERRAR SESIÓN */}
                                <button
                                    type="button"
                                    onClick={cerrarSesion}
                                    className="w-full mt-5 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-rose-500 text-white font-semibold hover:bg-rose-600 transition-colors"
                                >
                                    <LogOut size={18} />
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