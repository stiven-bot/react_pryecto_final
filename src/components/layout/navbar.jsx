import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <ul className="menu">
                <li>
                    <Link
                        to="/"
                        className="text-slate-700 dark:text-slate-200 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                    >
                        Inicio
                    </Link>
                </li>

                <li>
                    <Link
                        to="/Esenario"
                        className="text-slate-700 dark:text-slate-200 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                    >
                        Diviértete
                    </Link>
                </li>

                <li>
                    <Link
                        to="/catalogo"
                        className="text-slate-700 dark:text-slate-200 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                    >
                        Catálogo
                    </Link>
                </li>

                <li>
                    <Link
                        to="/contacto"
                        className="text-slate-700 dark:text-slate-200 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                    >
                        Contáctanos
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;