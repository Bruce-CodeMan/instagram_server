import { Field, InputType, PartialType } from "@nestjs/graphql";


@InputType()
export class UserInput{
    @Field({ description: "昵称" })
    name: string;

    @Field({ description: "手机号" })
    tel: string;

    @Field({ description: "密码" })
    password: string;
}

@InputType()
export class PartialUserInput extends PartialType(UserInput){}