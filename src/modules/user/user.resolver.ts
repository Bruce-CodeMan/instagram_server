import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

// Custom Imports
import { UserService } from "./user.service";
import { UserInput } from "./dto/user-input.type";


@Resolver()
export class UserResolver{
  constructor(
    private readonly userService: UserService
  ){}

  @Mutation(() => Boolean)
  async createUser(@Args("params") params: UserInput): Promise<boolean> {
    return await this.userService.create(params);
  }
}