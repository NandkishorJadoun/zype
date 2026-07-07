import type { FormValidationError } from "../types";

export const FieldErrors = ({
  fieldName,
  validationErrors,
}: {
  fieldName: string;
  validationErrors: FormValidationError[] | null;
}) => {
  if (!validationErrors) return null;

  const fieldValidationErrors = validationErrors.filter(
    (validationError) => validationError.fieldName === fieldName,
  );

  if (fieldValidationErrors.length === 0) return null;

  return (
    <ul>
      {fieldValidationErrors.map((validationError, index) => (
        <li key={index} className="text-red-500">
          {validationError.message}
        </li>
      ))}
    </ul>
  );
};
