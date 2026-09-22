import Forminput from "./componentes/Forminput"
import FormSelect from "./componentes/FormSelect"
import FormTextAria from "./componentes/FormTextAria"
import FormFile from "./componentes/Formfile"
import { useForm, Controller } from "react-hook-form"
import Swal from "sweetalert2";

function ContactoForm(){

        const {
        register, control, handleSubmit,reset,
        formState: { errors },
        } = useForm({
            mode: "onBlur",
            defaultValues: {
                primerNombre: "",
                primerApellido: "",
                genero: "", pais: "", ciudad: "",
                correo: "", telefono: "", mensaje: "",
                archivo: [(0)],
            },
        });


const onSubmit = async (data) => {
    console.log("Datos del formulario:", data);
    
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key === "archivo") {
                value.forEach((file) => formData.append("archivo", file));
            } else {
                formData.append(key, value);
            }
        });
        try {
            const response = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" },
            });
            if (response.ok) {
                console.log("Datos del formulario:", data);


                Swal.fire({
                    icon: "success",
                    title: "¡Mensaje enviado!",
                    text: "Tu mensaje fue enviado correctamente",
                    confirmButtonColor: "#0ea5e9",
                });
                reset();
            } else {
                // Formspree responde con { errors: [{ message: "..." }, ...] } si algo falla
                const resultado = await response.json();
                const mensajeError = resultado.errors
                    ? resultado.errors.map((e) => e.message).join(", ")
                    : "Ocurrió un error al enviar el formulario";


                Swal.fire({
                    icon: "error",
                    title: "No se pudo enviar",
                    text: mensajeError,
                    confirmButtonColor: "#0ea5e9",
                });
            }
        } catch (error) {
            console.error("Error de red al enviar el formulario:", error);


            Swal.fire({
                icon: "error",
                title: "No se pudo enviar",
                text: "Revisa tu conexión a internet e intenta de nuevo.",
                confirmButtonColor: "#0ea5e9",
            });
        };
};

    return(
        <div>
            <form
    onSubmit={handleSubmit(onSubmit)}
    className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md dark:shadow-slate-950/30 transition-colors duration-300"
>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <Forminput
                        label="Primer Nombre:"
                        name="Primer Nombre"
                        placeholder="Ingresa tu Primer nombre"
                        required
                        error = {errors.primerNombre?.message}
                        {...register("primerNombre", {required: "El primer nombre es obligatorio"})}
                    />
    
                    <Forminput
                        label="Primer Apellido:"
                        name="Primer Apellido"
                        placeholder="Ingresa tu Segundo Apellido"
                        required
                        error = {errors.primerApellido?.message}
                        {...register("primerApellido", {required: "campo obligatori"})}
                    />
    
                    <FormSelect
                        label="Genero:"
                        name="genero"
                        options = {["Masculino", "Femenino","otro"]}
                        error = {errors.genero?.message}
                        {...register("genero", {required: "campo obligatori"})}
                    />
    
                    <FormSelect
                    label="País"
                    name="pais"
                    options={[
                        "Colombia",
                        "Panamá",
                        "Perú"
                        ]}
                    required
                    error = {errors.pais?.message}
                    {...register("pais", {required: "campo obligatori"})}
                />
                <FormSelect
                    label="Ciudad"
                    name="ciudad"
                    options={[
                        "Medellín",
                        "Girardota",
                        "Copacabana",
                        "Otro"
                        ]}
                    required
                    error = {errors.ciudad?.message}
                    {...register("ciudad", {required: "campo obligatori"})}
                />

    
                    <Forminput
                        label="correo:"
                        name="gmail"
                        placeholder="Corre Electronico"
                        required
                        error = {errors.gmail?.message}
                        {...register("gmail", {required: "campo obligarotio",
                            pattern:{
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message:"ingresa un numero de 10 digitos validos",
                            }
                        })}
                    />

                    <FormTextAria
                        label="Tu mensaje:"
                        name="mensaje"
                        required
                        error = {errors.mensaje?.message}
                        {...register("primer", {required: "campo obligatori"})}
                    />
                        
                    <Forminput
                        label="Telefono:"
                        name="telefono"
                        placeholder="Telefono"
                        required
                        error = {errors.telefono?.message}
                        {...register("telefono", {required: "campo obligatorio",})}
                    />
                    
                                <div className="mt-6">
                <Controller
                    name="archivo"
                    control={control} // 👈 viene de useForm(), es el "cerebro" que conecta todo
                    render={({ field }) => ( // 👈 aquí renderizas TU componente, y "field" trae lo necesario para conectarlo
                        <FormFile
                            label="Adjuntar archivo..."
                            name="archivo"
                            accept={{
                                "application/pdf": [".pdf"],
                                "image/png": [".png"],
                                "image/jpeg": [".jpg", ".jpeg"],
                                "video/*": [],
                            }}
                            maxSizeMB={5}
                            onFilesChange={field.onChange} // 👈 el puente hacia react-hook-form
                            error={errors.archivo?.message}
                        />
                    )}
                />
            </div>
            </div>

                    <div className="mt-8 flex justify-center">
                        <button
                        type="submit"
                        className="bg-sky-500 hover:bg-sky-600 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white font-semibold px-8 py-3 rounded-lg transition">
                            Enviar mensaje
                        </button>
                    </div>
            </form>
        </div>
    );
};
export default ContactoForm;