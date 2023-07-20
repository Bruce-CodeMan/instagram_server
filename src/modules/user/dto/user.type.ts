import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserType {
  @Field()
  id?: string;

  @Field({ description: "昵称" })
  name: string

  @Field({ description: "描述" })
  desc: string;

  @Field({ description: "手机号" })
  tel: string;
}