import type { FormValidationError } from "../types";

export const FieldErrors = ({
  fieldName,
  validationErrors,
}: {
  fieldName: string;
  validationErrors: null | FormValidationError | FormValidationError[];
}) => {
  if (!validationErrors) return null;

  if (!Array.isArray(validationErrors)) {
    return (
      validationErrors.fieldName === fieldName && (
        <p className="text-red-500">{validationErrors.message}</p>
      )
    );
  }

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
