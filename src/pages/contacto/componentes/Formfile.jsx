import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";

function FormFile({
    label,
    name,
    required = false,
    error = "",
    onFilesChange = () => {},
}) {
    // Estado para guardar los archivos seleccionados
    const [archivos, setArchivos] = useState([]);

    useEffect(() => {
        onFilesChange(archivos.map((a) => a.file));
    }, [archivos, onFilesChange]);

    // Estado para mostrar mensajes
    const [mensaje, setMensaje] = useState("");

    // Generar un ID único para cada archivo
    const generarId = (file) =>
        `${file.name}-${file.lastModified}-${file.size}`;

    // Mostrar un mensaje durante 2 segundos
    const mostrarMensaje = (texto) => {
        setMensaje(texto);

        setTimeout(() => {
            setMensaje("");
        }, 2000);
    };

    // Se ejecuta cuando el usuario selecciona o arrastra archivos
    const onDrop = (acceptedFiles) => {
        setArchivos((archivosActuales) => {
            const espacioDisponible = 3 - archivosActuales.length;

            if (espacioDisponible === 0) {
                mostrarMensaje("No puedes subir más de 3 archivos.");
                return archivosActuales;
            }

            const archivosPermitidos = acceptedFiles.slice(
                0,
                espacioDisponible
            );

            if (acceptedFiles.length > espacioDisponible) {
                mostrarMensaje("No puedes subir más de 3 archivos.");
            }

            const nuevosArchivos = archivosPermitidos.map((file) => ({
                file: file,
                id: generarId(file),
                preview: file.type.startsWith("image/")
                    ? URL.createObjectURL(file)
                    : null,
            }));

            return [...archivosActuales, ...nuevosArchivos];
        });

        console.log(acceptedFiles);
    };

    // Se ejecuta cuando React Dropzone rechaza archivos
    const onDropRejected = (rejectedFiles) => {
        console.log("Archivos rechazados:", rejectedFiles);
        mostrarMensaje("No puedes subir más de 3 archivos.");
    };

    // Eliminar un archivo
    const eliminarArchivo = (id) => {
        setArchivos((archivosActuales) => {
            const archivoEliminado = archivosActuales.find(
                (archivo) => archivo.id === id
            );

            if (archivoEliminado?.preview) {
                URL.revokeObjectURL(archivoEliminado.preview);
            }

            return archivosActuales.filter(
                (archivo) => archivo.id !== id
            );
        });

        mostrarMensaje("Archivo eliminado correctamente.");
    };

    const {
        getRootProps,
        getInputProps,
        isDragActive,
    } = useDropzone({
        onDrop,
        onDropRejected,
        multiple: true,
        maxFiles: 3,
    });

    return (
        <div className="flex flex-col gap-2">
            {/* Título */}
            <label
                htmlFor={name}
                className="font-semibold text-slate-700 dark:text-slate-200"
            >
                {label} {required && "*"}
            </label>

            {/* Zona para arrastrar archivos */}
            <div
                {...getRootProps()}
                className="border-2 border-dashed border-slate-300 dark:border-slate-600
                           bg-slate-50 dark:bg-slate-700
                           rounded-xl p-8 text-center cursor-pointer
                           hover:border-sky-400 dark:hover:border-sky-400
                           transition-colors"
            >
                <input
                    {...getInputProps({
                        id: name,
                        name: name,
                        required: required,
                    })}
                />

                <div className="text-4xl mb-3">
                    📎
                </div>

                {isDragActive ? (
                    <p className="font-medium text-sky-600 dark:text-sky-400">
                        Suelta los archivos aquí...
                    </p>
                ) : (
                    <>
                        <p className="font-medium text-slate-700 dark:text-slate-200">
                            Arrastra tus archivos aquí
                        </p>

                        <p className="text-sm text-slate-400 dark:text-slate-400 mt-1">
                            o haz clic para seleccionarlos
                        </p>

                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                            Máximo 3 archivos
                        </p>
                    </>
                )}
            </div>

            {/* Mensaje */}
            {mensaje && (
                <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
                    {mensaje}
                </p>
            )}

            {/* Lista de archivos */}
            {archivos.length > 0 && (
                <div className="mt-3 flex flex-col gap-4">
                    <p className="font-semibold text-slate-700 dark:text-slate-200">
                        Archivos seleccionados ({archivos.length}/3)
                    </p>

                    {archivos.map((archivo) => (
                        <div
                            key={archivo.id}
                            className="rounded-lg bg-slate-100 dark:bg-slate-700
                                       text-slate-700 dark:text-slate-200
                                       p-4 transition-colors"
                        >
                            {/* Vista previa si es una imagen */}
                            {archivo.preview && (
                                <img
                                    src={archivo.preview}
                                    alt={archivo.file.name}
                                    className="w-40 h-40 object-cover rounded-lg mb-4"
                                />
                            )}

                            {/* Nombre */}
                            <p>
                                <strong>Nombre:</strong>{" "}
                                {archivo.file.name}
                            </p>

                            {/* Tipo */}
                            <p>
                                <strong>Tipo:</strong>{" "}
                                {archivo.file.type || "Desconocido"}
                            </p>

                            {/* Tamaño */}
                            <p>
                                <strong>Tamaño:</strong>{" "}
                                {(archivo.file.size / 1024).toFixed(2)} KB
                            </p>

                            {/* Última modificación */}
                            <p>
                                <strong>Última modificación:</strong>{" "}
                                {new Date(
                                    archivo.file.lastModified
                                ).toLocaleString()}
                            </p>

                            {/* Ruta */}
                            <p>
                                <strong>Ruta:</strong>{" "}
                                {archivo.file.path || "No disponible"}
                            </p>

                            {/* Botón eliminar */}
                            <button
                                type="button"
                                onClick={() =>
                                    eliminarArchivo(archivo.id)
                                }
                                className="mt-4 bg-red-500 hover:bg-red-600
                                           text-white font-semibold px-4 py-2
                                           rounded-lg transition"
                            >
                                Eliminar
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Error */}
            {error && (
                <span className="text-sm text-red-500">
                    {error}
                </span>
            )}
        </div>
    );
}

export default FormFile;
