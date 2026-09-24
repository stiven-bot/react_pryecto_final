import "./login.css";
import { useState } from "react";
import {
    Eye,
    EyeOff,
    LockKeyhole,
    User,
    X,
    LogIn,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";
import Swal from "sweetalert2";

function Login({ onLogin, onClose }) {
    const [nombre, setNombre] = useState("");
    const [password, setPassword] = useState("");
    const [tipoUsuario, setTipoUsuario] = useState("Usuario");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [ciudad, setCiudad] = useState("");

    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [cargando, setCargando] = useState(false);

    function iniciarSesion(e) {
        e.preventDefault();

        if (
            !nombre.trim() ||
            !password.trim() ||
            !correo.trim() ||
            !telefono.trim() ||
            !ciudad.trim()
        ) {
            Swal.fire({
                title: "Campos incompletos",
                text: "Debes completar todos los campos.",
                icon: "warning",
                confirmButtonColor: "#06b6d4",
            });

            return;
        }

        setCargando(true);

        const usuarioLogueado = {
            nombre: nombre.trim(),
            tipoUsuario,
            correo: correo.trim(),
            telefono: telefono.trim(),
            ciudad: ciudad.trim(),
        };

        localStorage.setItem(
            "usuario",
            JSON.stringify(usuarioLogueado)
        );

        setTimeout(() => {
            onLogin(usuarioLogueado);
            setCargando(false);

            Swal.fire({
                title: "¡Bienvenido!",
                text: `Hola ${nombre.trim()}`,
                icon: "success",
                confirmButtonColor: "#06b6d4",
            });
        }, 600);
    }

    return (
        <div className="absolute right-0 top-full mt-3 w-80 sm:w-96 z-50">
            <form
                onSubmit={iniciarSesion}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700 p-6"
            >
                {/* ENCABEZADO */}
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-cyan-500 text-white">
                                <LogIn size={19} />
                            </div>

                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                                Iniciar sesión
                            </h2>
                        </div>

                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Ingresa tus datos para continuar
                        </p>
                    </div>

                    {/* CERRAR LOGIN */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-rose-500 transition-all"
                        title="Cerrar login"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* NOMBRE */}
                <div className="mb-4">
                    <label
                        htmlFor="nombre"
                        className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2"
                    >
                        Nombre
                    </label>

                    <div className="relative">
                        <User
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            id="nombre"
                            type="text"
                            placeholder="Ingresa tu nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white placeholder:text-slate-400 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                        />
                    </div>
                </div>

                {/* TIPO DE USUARIO */}
                <div className="mb-4">
                    <label
                        htmlFor="tipoUsuario"
                        className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2"
                    >
                        Tipo de usuario
                    </label>

                    <select
                        id="tipoUsuario"
                        value={tipoUsuario}
                        onChange={(e) => setTipoUsuario(e.target.value)}
                        className="w-full px-3 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                    >
                        <option value="Usuario">Usuario</option>
                        <option value="Administrador">Administrador</option>
                    </select>
                </div>

                {/* CORREO */}
                <div className="mb-4">
                    <label
                        htmlFor="correo"
                        className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2"
                    >
                        Correo electrónico
                    </label>

                    <div className="relative">
                        <Mail
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            id="correo"
                            type="email"
                            placeholder="correo@ejemplo.com"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white placeholder:text-slate-400 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                        />
                    </div>
                </div>

                {/* TELÉFONO */}
                <div className="mb-4">
                    <label
                        htmlFor="telefono"
                        className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2"
                    >
                        Teléfono
                    </label>

                    <div className="relative">
                        <Phone
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            id="telefono"
                            type="tel"
                            placeholder="300 000 0000"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white placeholder:text-slate-400 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                        />
                    </div>
                </div>

                {/* CIUDAD */}
                <div className="mb-4">
                    <label
                        htmlFor="ciudad"
                        className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2"
                    >
                        Ciudad
                    </label>

                    <div className="relative">
                        <MapPin
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            id="ciudad"
                            type="text"
                            placeholder="Medellín"
                            value={ciudad}
                            onChange={(e) => setCiudad(e.target.value)}
                            className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white placeholder:text-slate-400 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                        />
                    </div>
                </div>

                {/* CONTRASEÑA */}
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2"
                    >
                        Contraseña
                    </label>

                    <div className="relative">
                        <LockKeyhole
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            id="password"
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
                            autoComplete="current-password"
                            className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white placeholder:text-slate-400 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setMostrarPassword(
                                    !mostrarPassword
                                )
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-cyan-500 transition-colors"
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

                {/* BOTÓN */}
                <button
                    type="submit"
                    disabled={cargando}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-cyan-500 text-white font-semibold hover:bg-cyan-600 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg shadow-cyan-500/20"
                >
                    {cargando ? (
                        <>
                            <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                            Ingresando...
                        </>
                    ) : (
                        <>
                            <LogIn size={18} />
                            Ingresar
                        </>
                    )}
                </button>

                <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-5">
                    Tu información se guarda localmente en este dispositivo.
                </p>
            </form>
        </div>
    );
}

export default Login;