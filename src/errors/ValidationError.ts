export class ValidationError extends Error {
    statusCode: number;
    errors: Record<string, string>;
  
    constructor(errors: Record<string, string>) {
      super("Error de validación");
      this.name = "ValidationError";
      this.statusCode = 422; // HTTP 422
      this.errors = errors;
    }
  }