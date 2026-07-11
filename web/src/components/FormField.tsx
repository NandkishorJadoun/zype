import type { FormValidationError } from "../types";
import { FieldErrors } from "./FieldErrors";

const inputClass = "bg-surface-secondary rounded-xl px-4 py-3 text-[0.9375rem] text-text-primary placeholder:text-text-tertiary ring-1 ring-inset ring-separator focus:ring-2 focus:ring-accent focus:ring-offset-0 transition-all duration-150";

interface FormFieldProps {
  name: string;
  label: string;
  type?: "text" | "email" | "password" | "textarea";
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  defaultValue?: string;
  rows?: number;
  validationErrors: FormValidationError[] | null;
}

export const FormField = ({ name, label, type = "text", placeholder, required, minLength, maxLength, defaultValue, rows, validationErrors }: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-[0.8125rem] font-medium text-text-secondary">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          id={name}
          placeholder={placeholder}
          className={`${inputClass} resize-none`}
          maxLength={maxLength}
          defaultValue={defaultValue}
          rows={rows ?? 3}
        />
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          placeholder={placeholder}
          className={inputClass}
          defaultValue={defaultValue}
        />
      )}
      <FieldErrors fieldName={name} validationErrors={validationErrors} />
    </div>
  );
};
