import type { FormValidationError } from "../types";

export class ValidationError extends Error {
  errors: FormValidationError[]
  constructor(errors: FormValidationError[]) {
    super()
    this.errors = errors
    this.name = 'ValidationError';
  }
}