import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput, SignupInput } from './dto';
import { AuthResponse } from './types/auth-response.types';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  //vamos a regreasr un authresponse
  @Mutation(() => AuthResponse, { name: 'signup' })
  async signup(
    @Args('singupInput') singupInput: SignupInput,
  ): Promise<AuthResponse> {
    //mandamos singupInput a authService que tiene la data
    return this.authService.signup(singupInput);
  }

  @Mutation(() => AuthResponse, { name: 'login' })
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<AuthResponse> {
    return this.authService.login(loginInput);
  }
  
    @Query(()=> AuthResponse,{ name: 'revalidate' })
    //nos esta pidiendo un jwt de lo contrario no hace nada
    @UseGuards(JwtAuthGuard)
    async revalidateToken(

    ) {
      return this.authService.revalidateToken();
    }
}
