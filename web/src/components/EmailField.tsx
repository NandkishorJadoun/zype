import type { FormValidationError } from "../types";
import { FieldErrors } from "./FieldErrors";

interface EmailFieldProps {
  validationErrors: FormValidationError[] | null;
}

export const EmailField = ({ validationErrors }: EmailFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="email">
        Email Address<span className="text-red-500">*</span>
      </label>
      <input
        type="email"
        name="email"
        id="email"
        required
        placeholder="johndoe@example.com"
        className="border dark:border-slate-700 dark:bg-slate-800  rounded-xl focus:outline-2 focus:outline-blue-600 px-3 py-2.5"
      />

      <FieldErrors
        fieldName={"email"}
        validationErrors={validationErrors}
      />
    </div>
  );
};
