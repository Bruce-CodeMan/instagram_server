import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt"


// Custom Imports
import { User } from "@/modules/user/models/user.entity";
import { JWT_SECRET, JWT_EXPIRATION } from "@/common/constant/jwt";
import { AuthResolver } from "./auth.resolver";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: JWT_EXPIRATION
      }
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [AuthResolver, JwtStrategy],
  exports: []
})
export class AuthModule {}