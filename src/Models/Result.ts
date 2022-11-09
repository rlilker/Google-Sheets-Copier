export class Result<T> {

  success: boolean;
  result: T;
  errors: string[];

  constructor(success: boolean, result: T, error: string) {
    this.success = success;
    this.result = result;
    this.errors = [error];
  }
}

