import type { FormValidationError } from "../types";
import { FieldErrors } from "./FieldErrors"

interface UsernameFieldProps {
    validationErrors: FormValidationError[] | null;
    value?: string
}

export const UsernameField = ({ validationErrors, value }: UsernameFieldProps) => {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="username">
                Username<span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                name="username"
                id="username"
                required
                placeholder="johndoe123"
                className="border dark:border-slate-700 dark:bg-slate-800  rounded-xl focus:outline-2 focus:outline-blue-600 px-3 py-2.5"
                maxLength={10}
                minLength={3}
                defaultValue={value}
            />

            <FieldErrors fieldName="username" validationErrors={validationErrors} />
        </div>
    )
}