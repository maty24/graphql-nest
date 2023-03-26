import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from './../users/users.service';
import { LoginInput, SignupInput } from './dto';
import { AuthResponse } from './types/auth-response.types';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  //este es el metodo que genera el token
  private getJwtToken(userId: string) {
    //mando el user id para hacer el token
    return this.jwtService.sign({ id: userId });
  }

  async signup(signupInput: SignupInput): Promise<AuthResponse> {
    //todo crear el usuario
    const user = await this.userService.create(signupInput);
    //todo crear el token
    const token = this.getJwtToken(user.id);
    return { token, user };
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const { email, password } = loginInput;
    const user = await this.userService.findOneByEmail(email);
    //comparar la contraseña con la que esta en la base de datos y la que envia el usuario
    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error('Invalid password');
    }
    //estoy generando el token
    const token = this.getJwtToken(user.id);
    return { token, user };
  }

  async validateUser(id: string): Promise<User> {
    const user = await this.userService.findOneById(id);

    if (!user.isActive) {
      throw new UnauthorizedException(`User is inactive, talk with an admin`);
    }

    delete user.password;

    return user;
  }
  revalidateToken(user: User): AuthResponse {
    const token = this.getJwtToken(user.id);

    return { token, user };
  }
}
