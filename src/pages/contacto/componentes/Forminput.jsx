import { forwardRef } from "react";

const FormInput = forwardRef(function FormInput(
    {
        label,
        name,
        type = "text",
        required = false,
        placeholder = "",
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

            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                required={required}
                ref={ref}
                {...rest}
                className="border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-400 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-sky-500"
            />

            {error && (
                <span className="text-sm text-red-500">
                    {error}
                </span>
            )}
        </div>
    );
});

export default FormInput;
