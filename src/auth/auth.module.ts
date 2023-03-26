import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { User } from '../users/entities/user.entity';
import { UsersModule } from './../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [JwtStrategy],
  //para traerme otro modulo pero me trae todo lo que exporte ahi
  imports: [
    //para usar las variables de entorno
    ConfigModule,
    //para usar passport
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      //tener acceso a las variables de entorno
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        //para firmar el token y lo obtengo de las variables de entorno
        secret: configService.get('JWT_SECRET'),
        //expira en 4 horas
        signOptions: { expiresIn: '4h' },
      }),
    }),
    UsersModule,
  ],
})
export class AuthModule {}
