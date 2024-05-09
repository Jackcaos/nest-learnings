export class UserRegisterDto {
  readonly name!: string;

  readonly account!: string;

  password!: string;

  description?: string;
}

export class UserLoginDto {
  readonly account!: string;

  readonly password!: string;
}
