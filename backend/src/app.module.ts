import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConfig } from './config/database.config';
import { JWTConfig } from './config/jwt.config';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';
import { AppLogger } from './shared/logger/logger.service';

@Module({
  imports: [
    MongooseModule.forRoot(DatabaseConfig.uri),
    AuthModule,
    HealthModule,
    JwtModule.register({
      global: true,
      secret: JWTConfig.secret,
      signOptions: { expiresIn: JWTConfig.expiresIn },
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [AppLogger],
  exports: [AppLogger],
})
export class AppModule {}
