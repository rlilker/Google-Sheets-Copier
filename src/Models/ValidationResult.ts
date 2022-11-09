export class ValidationResult {

  isValid: boolean;
  message: string | undefined;

  constructor(isValid: boolean, message: string | undefined) {
    this.isValid = isValid;
    this.message = message;
  }
}