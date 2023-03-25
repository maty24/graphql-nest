import { Field, ObjectType } from "@nestjs/graphql";
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class AuthResponse {

    @Field(() => String)
    token: string;

    //es user porque es un objetype y no un inputtype y me trea el user
    @Field(() => User)
    user: User;

}