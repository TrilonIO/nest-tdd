import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignupController } from './signup/signup.controller';

@Module({
  imports: [],
  controllers: [AppController, SignupController],
  providers: [AppService],
})
export class AppModule {}
