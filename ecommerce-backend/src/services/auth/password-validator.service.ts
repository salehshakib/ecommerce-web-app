import { BadRequestError } from '@/utils/api-error';

export class PasswordValidator {
  private static readonly MIN_LENGTH = 8;
  private static readonly UPPERCASE_REGEX = /[A-Z]/;
  private static readonly LOWERCASE_REGEX = /[a-z]/;
  private static readonly NUMBER_REGEX = /[0-9]/;

  static validate(password: string): void {
    if (password.length < this.MIN_LENGTH) {
      throw new BadRequestError(`Password must be at least ${this.MIN_LENGTH} characters long`);
    }

    const hasUpperCase = this.UPPERCASE_REGEX.test(password);
    const hasLowerCase = this.LOWERCASE_REGEX.test(password);
    const hasNumber = this.NUMBER_REGEX.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      throw new BadRequestError(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      );
    }
  }
}
