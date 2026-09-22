import "./login.css";
import { useState } from "react";
import {
    Eye,
    EyeOff,
    LockKeyhole,
    User,
    X,
} from "lucide-react";
import Swal from "sweetalert2";

function Login({ onLogin, onClose }) {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [mostrarPassword, setMostrarPassword] = useState(false);

    function iniciarSesion(e) {
        e.preventDefault();

        if (!usuario || !password) {
            Swal.fire({
                title: "Campos incompletos",
                text: "Debes ingresar usuario y contraseña.",
                icon: "warning",
                confirmButtonColor: "#0ea5e9",
            });

            return;
        }

        const usuarioLogueado = {
            nombre: usuario,
        };

        localStorage.setItem(
            "usuario",
            JSON.stringify(usuarioLogueado)
        );

        onLogin(usuarioLogueado);

        Swal.fire({
            title: "¡Bienvenido!",
            text: `Hola ${usuario}`,
            icon: "success",
            confirmButtonColor: "#0ea5e9",
        });
    }

    return (
        <div className="absolute right-0 top-full mt-3 w-80 z-50">
            <form
                onSubmit={iniciarSesion}
                className="bg-white rounded-2xl shadow-2xl ring-1 ring-slate-200 p-6"
            >
                {/* Título y botón cerrar */}
                <div className="flex items-start justify-between mb-5">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">
                            Iniciar sesión
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                            Ingresa tus datos para continuar
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                        title="Cerrar"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Usuario */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Usuario
                    </label>

                    <div className="relative">
                        <User
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            placeholder="Ingresa tu usuario"
                            value={usuario}
                            onChange={(e) =>
                                setUsuario(e.target.value)
                            }
                            className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-300 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                        />
                    </div>
                </div>

                {/* Contraseña */}
                <div className="mb-5">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Contraseña
                    </label>

                    <div className="relative">
                        <LockKeyhole
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type={
                                mostrarPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-300 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setMostrarPassword(
                                    !mostrarPassword
                                )
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            title={
                                mostrarPassword
                                    ? "Ocultar contraseña"
                                    : "Mostrar contraseña"
                            }
                        >
                            {mostrarPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Botón ingresar */}
                <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition-colors"
                >
                    Ingresar
                </button>
            </form>
        </div>
    );
}

export default Login;