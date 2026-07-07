import type { FormValidationError } from "../types";
import { FieldErrors } from "./FieldErrors";

interface PasswordFieldProps {
  children: string;
  validationErrors: FormValidationError[] | null;
}

export const PasswordField = ({ children, validationErrors }: PasswordFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="password">
        {children}
        <span className="text-red-500">*</span>
      </label>
      <input
        type="password"
        name="password"
        required
        minLength={8}
        maxLength={20}
        placeholder="••••••••"
        className="border dark:border-slate-700 dark:bg-slate-800  rounded-xl focus:outline-2 focus:outline-blue-600 px-3 py-2.5"
      />

      <FieldErrors
        fieldName={"password"}
        validationErrors={validationErrors}
      />
    </div>
  );
};
