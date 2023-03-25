import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput, SignupInput } from './dto';
import { AuthResponse } from './types/auth-response.types';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

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
  /*
    @Query({ name: 'revalidate' })
    async revalidateToken(
  
    ) {
      return this.authService.revalidateToken();
    }*/
}
