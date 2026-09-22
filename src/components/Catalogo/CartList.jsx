import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { UseCart } from "../../contexts/CartContext";

function formatearPrecio(valor) {
    return Number(valor).toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
    });
}

export default function CartList() {
    const {
        carrito,
        eliminarDelCarrito,
        aumentarCantidad,
        disminuirCantidad,
        totalItems,
        subtotal,
        iva,
        totalPagar,
        vaciarCarrito,
    } = UseCart();

    async function enviarPedido() {
        const resultado = await Swal.fire({
            title: "¿Enviar pedido?",
            text: "¿Estás seguro de que deseas enviar este pedido?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, enviar pedido",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#0ea5e9",
            cancelButtonColor: "#64748b",
        });

        if (!resultado.isConfirmed) {
            return;
        }

        try {
            // Aquí posteriormente podemos conectar el envío
            // del pedido a una API o servicio.
            
            vaciarCarrito();

            await Swal.fire({
                title: "¡Pedido enviado!",
                text: "Tu pedido fue enviado correctamente.",
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#0ea5e9",
            });
        } catch {
            await Swal.fire({
                title: "Error",
                text: "No se pudo enviar el pedido.",
                icon: "error",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#ef4444",
            });
        }
    }

    return (
        <section className="p-6">
            <h2 className="text-2xl font-bold mb-6">
                Productos agregados
            </h2>

            {carrito.length === 0 ? (
                <p className="text-slate-500">
                    No hay productos agregados.
                </p>
            ) : (
                <>
                    <div className="space-y-4">
                        {carrito.map((item) => (
                            <article
                                key={item.id}
                                className="flex items-center gap-4 p-4 rounded-xl ring-1 ring-slate-200"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-lg"
                                />

                                <div className="flex-1">
                                    <h3 className="font-semibold text-slate-800">
                                        {item.name}
                                    </h3>

                                    <p className="text-cyan-600 font-semibold">
                                        Precio unitario:{" "}
                                        {formatearPrecio(item.precio)}
                                    </p>

                                    <p className="text-slate-500 text-sm">
                                        Episodio:{" "}
                                        {item.episodio || "No disponible"}
                                    </p>

                                    <p className="text-slate-600 text-sm">
                                        Subtotal:{" "}
                                        {formatearPrecio(
                                            item.precio * item.cantidad
                                        )}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => disminuirCantidad(item.id)}
                                        className="px-3 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                                    >
                                        -
                                    </button>

                                    <span className="font-medium text-slate-800 dark:text-slate-100">
                                        {item.cantidad}
                                    </span>

                                        <button
                                            type="button"
                                            onClick={() => aumentarCantidad(item.id)}
                                            className="px-3 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                                        >
                                            +
                                        </button>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        eliminarDelCarrito(item.id)
                                    }
                                    className="p-2 text-rose-500 hover:text-rose-700"
                                    title="Eliminar producto"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </article>
                        ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200">
                        <p className="text-slate-500">
                            Productos: {totalItems}
                        </p>

                        <p className="text-slate-700">
                            Subtotal: {formatearPrecio(subtotal)}
                        </p>

                        <p className="text-slate-700">
                            IVA (19%): {formatearPrecio(iva)}
                        </p>

                        <p className="text-xl font-bold text-slate-800">
                            Total a pagar: {formatearPrecio(totalPagar)}
                        </p>

                        <button
                            type="button"
                            onClick={enviarPedido}
                            className="mt-6 px-5 py-3 rounded-lg bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition-colors"
                        >
                            Enviar Pedido
                        </button>
                    </div>
                </>
            )}
        </section>
    );
}