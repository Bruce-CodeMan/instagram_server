import { Module, ConsoleLogger } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";


// Custom Imports
import { User } from "./models/user.entity";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [ConsoleLogger, UserResolver, UserService],
    exports: [UserService]
})
export class UserModule {}