import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConfig } from './config/database.config';
@Module({
  imports: [MongooseModule.forRoot(DatabaseConfig.uri)],
  controllers: [],
  providers: [],
})
export class AppModule {}
