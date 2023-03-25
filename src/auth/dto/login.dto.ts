import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, MinLength } from "class-validator";


//estoy esperando informacion del front end y por eso se llama input cuando se hsce un mutation
@InputType()
export class LoginInput {

    @Field(() => String)
    @IsEmail()
    email: string;

    @Field(() => String)
    @MinLength(6)
    password: string;

}