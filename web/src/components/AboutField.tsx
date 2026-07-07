import type { FormValidationError } from "../types";
import { FieldErrors } from "./FieldErrors"

interface AboutFieldProps {
    validationErrors: FormValidationError[] | null;
    about?: string
}

export const AboutField = ({ validationErrors, about }: AboutFieldProps) => {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="about">About</label>
            <textarea
                name="about"
                id="about"
                placeholder="Write your about here..."
                className="border dark:border-slate-700 dark:bg-slate-800  rounded-xl focus:outline-2 focus:outline-blue-600 px-3 py-2.5 resize-none"
                maxLength={50}
                defaultValue={about}
                rows={3}
            />

            <FieldErrors fieldName="about" validationErrors={validationErrors} />
        </div>
    )
}