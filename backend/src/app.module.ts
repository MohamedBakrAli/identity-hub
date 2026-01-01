import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConfig } from './config/database.config';
import { JWTConfig } from './config/jwt.config';

@Module({
  imports: [
    MongooseModule.forRoot(DatabaseConfig.uri),
    JwtModule.register({
      global: true,
      secret: JWTConfig.secret,
      signOptions: { expiresIn: JWTConfig.expiresIn },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
