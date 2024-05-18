export class UnauthorizedError extends Error {
  public status

  constructor(message: string) {
    super(`Unauthorized: ${message}`)
    this.status = 401
  }
}
