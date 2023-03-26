import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ValidRoles } from '../enums/valid-roles.enum';
import { User } from '../../users/entities/user.entity';

export const CurrentUser = createParamDecorator(
  //context es donde esta toda la informacion de la peticion
  (roles: ValidRoles[] = [], context: ExecutionContext) => {
    //le enviamos el contexto a GqlExecutionContext
    const ctx = GqlExecutionContext.create(context);
    //obtenemos el request del usuario
    const user: User = ctx.getContext().req.user;

    if (!user) {
      throw new InternalServerErrorException(
        `No user inside the request - make sure that we used the AuthGuard`,
      );
    }

    if (roles.length === 0) return user;

    for (const role of user.roles) {
      //ver si el rol del usuario esta dentro de los roles que se le pasaron
      if (roles.includes(role as ValidRoles)) {
        return user;
      }
    }

    throw new ForbiddenException(
      `User ${user.fullName} need a valid role [${roles}]`,
    );
  },
);
