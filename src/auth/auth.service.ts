import { Injectable } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { LoginInput, SignupInput } from './dto';
import { AuthResponse } from './types/auth-response.types';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
    ) { }

    async signup(signupInput: SignupInput): Promise<AuthResponse> {
        //todo crear el usuario
        const user = await this.userService.create(signupInput);
        //todo crear el token
        const token = 'token';
        return { token, user }

    }

    async login(loginInput: LoginInput): Promise<AuthResponse> {
        const { email, password } = loginInput;
        const user = await this.userService.findOneByEmail(email);
        const token = 'token';
        return { token, user }
    }
}
