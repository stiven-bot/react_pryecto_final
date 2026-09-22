import { forwardRef } from "react";

const FormSelect = forwardRef(function FormSelect(
    {
        label,
        name,
        options = [],
        required = false,
        error = "",
        ...rest
    },
    ref
) {
    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor={name}
                className="font-semibold text-slate-700 dark:text-slate-200"
            >
                {label} {required && "*"}
            </label>

            <select
                id={name}
                name={name}
                required={required}
                ref={ref}
                {...rest}
                className="border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
                <option
                    value=""
                    className="bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100"
                >
                    Selecciona una opción
                </option>

                {options.map((option) => (
                    <option
                        key={option}
                        value={option}
                        className="bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100"
                    >
                        {option}
                    </option>
                ))}
            </select>

            {error && (
                <span className="text-sm text-red-500">
                    {error}
                </span>
            )}
        </div>
    );
});

export default FormSelect;
