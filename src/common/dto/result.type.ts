import { Field, ObjectType, Int } from "@nestjs/graphql";


@ObjectType()
export class Result {
  @Field(() => Int)
  code: number;

  @Field(() => String)
  message: string;

  @Field(() => String, { nullable: true })
  data?: string;
}