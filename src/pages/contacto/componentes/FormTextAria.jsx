import { forwardRef } from "react";

const FormTextArea = forwardRef(function FormTextArea(
    {
        label,
        name,
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

            <textarea
                id={name}
                name={name}
                placeholder={placeholder}
                required={required}
                rows={6}
                ref={ref}
                {...rest}
                className="w-full border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-3
                           bg-slate-50 dark:bg-slate-700
                           text-slate-700 dark:text-slate-100
                           placeholder:text-slate-400 dark:placeholder:text-slate-400
                           shadow-sm
                           transition-all duration-200
                           resize-y
                           focus:outline-none
                           focus:bg-white dark:focus:bg-slate-600
                           focus:border-sky-400
                           focus:ring-4 focus:ring-sky-100 dark:focus:ring-sky-500/20"
            />

            {error && (
                <span className="text-sm text-red-500">
                    {error}
                </span>
            )}
        </div>
    );
});

export default FormTextArea;
