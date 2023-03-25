import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { User } from '../users/entities/user.entity';
import { UsersModule } from './../users/users.module';

@Module({
  providers: [AuthResolver, AuthService],
  //para traerme otro modulo pero me trae todo lo que exporte ahi
  imports: [UsersModule],
})
export class AuthModule {}
