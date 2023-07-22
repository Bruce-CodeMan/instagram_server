import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver } from '@nestjs/apollo';

// Custom Imports
import { 
  TYPE,
  HOST,
  PORT,
  USER_NAME,
  PASSWORD,
  DATA_BASE
} from '@/common/constant/mysql';
import { UserModule } from '@/modules/user/user.module';
import { AuthModule } from '@/modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: TYPE,
      host: HOST,
      port: PORT,
      username: USER_NAME,
      password: PASSWORD,
      database: DATA_BASE,
      entities: [`${__dirname}/../modules/**/*.entity{.ts,tsx}`],
      logging: true,
      synchronize: true,
      autoLoadEntities: true
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true
    }),
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
