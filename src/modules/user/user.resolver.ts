import { Args, Mutation, Query, Resolver, Context } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

// Custom Imports
import { UserService } from "./user.service";
import { UserInput, PartialUserInput } from "./dto/user-input.type";
import { UserType } from "./dto/user.type";
import { Result } from "@/common/dto/result.type";
import { SUCCESS, UPDATE_USER_ERR } from "@/common/constant/code";
import { GqlAuthGuard } from "@/common/guards/auth.guards";

@Resolver()
@UseGuards(GqlAuthGuard)
export class UserResolver{
  constructor(
    private readonly userService: UserService
  ){}

  /**
   * 新增用户
   * @param params 用户的实体 
   * @returns 
   */
  @Mutation(() => Boolean)
  async createUser(@Args("params") params: UserInput): Promise<boolean> {
    return await this.userService.create(params);
  }

  /**
   * 通过id获取用户的信息
   * @param id 
   * @returns 
   */
  @Query(() => UserType, { description: "通过id获取用户信息" })
  async findById(@Args("id") id: string): Promise<UserType> {
    return await this.userService.findById(id)
  }

  /**
   * 通过上下文来获取用户的信息
   * @param ctx 
   * @returns 
   */
  @Query(() => UserType, { description: "通过上下文来获取用户信息" })
  async getUserInfo(@Context() ctx: any): Promise<UserType> {
    const id = ctx.req.user.id;
    return await this.userService.findById(id);
  }

  /**
   * 通过用户的手机号获取用户的信息
   * @param tel 
   * @returns 
   */
  @Query(() => UserType, { description: "通过用户的手机号获取用户信息" })
  async findByTel(@Args("tel") tel: string): Promise<UserType> {
    return await this.userService.findByTel(tel)
  }

  /**
   * 通过id更新用户的信息
   * @param id 
   * @param params 
   * @returns 
   */
  @Mutation(() => Result, { description: "通过id更新用户信息" })
  async updateUser(
    @Args("id") id: string,
    @Args("params") params: PartialUserInput
  ): Promise<Result> {
    const res = await this.userService.update(id, params)
    if(res) {
      return {
        code: SUCCESS,
        message: "更新成功"
      }
    }
    return {
      code: UPDATE_USER_ERR,
      message: "用户更新失败"
    }
  }
}