import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

// Custom Imports
import { UserService } from "./user.service";


@Resolver()
export class UserResolver{
  constructor(
    private readonly userService: UserService
  ){}


}