export class ErrorRes {
  errorCode?: string;
  errorMessage?: string;

  constructor() {
    this.errorCode = '';
    this.errorMessage = '';
  }
}
