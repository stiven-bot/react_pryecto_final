import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from "react";

const CartContext = createContext();

const CLAVE_CARRITO = "carrito";
const IVA = 0.19;

// Lee el carrito guardado en localStorage
function leerCarritoDesdeStorage() {
    try {
        const data = localStorage.getItem(CLAVE_CARRITO);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

export function CartProvider({ children }) {
    const [carrito, setCarrito] = useState(leerCarritoDesdeStorage);

    // Guardar carrito en localStorage cada vez que cambie
    useEffect(() => {
        localStorage.setItem(
            CLAVE_CARRITO,
            JSON.stringify(carrito)
        );
    }, [carrito]);

    // Agregar producto al carrito
    const agregarAlCarrito = useCallback((personaje) => {
        setCarrito((prev) => {
            const yaExiste = prev.find(
                (item) => item.id === personaje.id
            );

            // Si ya existe, aumentar cantidad
            if (yaExiste) {
                return prev.map((item) =>
                    item.id === personaje.id
                        ? {
                              ...item,
                              cantidad: item.cantidad + 1,
                          }
                        : item
                );
            }

            // Si no existe, agregarlo
            return [
                ...prev,
                {
                    id: personaje.id,
                    name: personaje.name,
                    image: personaje.img_url,
                    episodio: personaje.episodio || "No disponible",
                    precio: personaje.precio,
                    cantidad: 1,
                },
            ];
        });
    }, []);

    // Eliminar completamente un producto
    const eliminarDelCarrito = useCallback((id) => {
        setCarrito((prev) =>
            prev.filter((item) => item.id !== id)
        );
    }, []);

    // Aumentar cantidad
    const aumentarCantidad = useCallback((id) => {
        setCarrito((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          cantidad: item.cantidad + 1,
                      }
                    : item
            )
        );
    }, []);

    // Disminuir cantidad
   const disminuirCantidad = useCallback((id) => {
    setCarrito((prev) =>
        prev.map((item) =>
            item.id === id && item.cantidad > 1
                ? {
                    ...item,
                    cantidad: item.cantidad - 1,
                }
                : item
        )
    );
}, []);
    // Vaciar carrito
    const vaciarCarrito = useCallback(() => {
        setCarrito([]);

        localStorage.removeItem(CLAVE_CARRITO);
    }, []);

    // Cantidad total de productos
    const totalItems = carrito.reduce(
        (acc, item) => acc + item.cantidad,
        0
    );

    // Subtotal antes del IVA
    const subtotal = carrito.reduce(
        (acc, item) =>
            acc + item.precio * item.cantidad,
        0
    );

    // IVA
    const iva = subtotal * IVA;

    // Total a pagar
    const totalPagar = subtotal + iva;

    return (
        <CartContext.Provider
            value={{
                carrito,

                agregarAlCarrito,
                eliminarDelCarrito,
                aumentarCantidad,
                disminuirCantidad,
                vaciarCarrito,

                totalItems,
                subtotal,
                iva,
                totalPagar,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function UseCart() {
    return useContext(CartContext);
}