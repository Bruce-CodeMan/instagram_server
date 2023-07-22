import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt"

// Custom Imports
import { UserService } from "@/modules/user/user.service";
import { Result } from "@/common/dto/result.type";
import { SUCCESS, USER_NOT_EXIST } from "@/common/constant/code";
import { encryptPassword } from "@/shared/utils/encrypt";


@Resolver()
export class AuthResolver {
    constructor(
      private readonly userService: UserService,
      private readonly jwtService: JwtService
    ){}

    @Mutation(() => Result, { description: "登录" })
    async login(
      @Args("tel") tel: string,
      @Args("password") password: string
    ): Promise<Result> {
        const user = await this.userService.findByTel(tel)
        if(!user) {
          return {
            code: USER_NOT_EXIST,
            message: "用户不存在"
          }
        }
        // check the password is correct
        const tempPassword = encryptPassword(password, user.salt)
        if (tempPassword === user.password){
          const token = this.jwtService.sign({
            id: user.id
          })
          return {
            code: SUCCESS,
            message: "登录成功",
            data: token
          }
        }
    }
}