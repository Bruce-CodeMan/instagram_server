import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


// Custom Imports
import { 
  TYPE,
  HOST,
  PORT,
  USER_NAME,
  PASSWORD,
  DATA_BASE
} from '@/common/constant/mysql';

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
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
