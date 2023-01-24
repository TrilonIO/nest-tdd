import { Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';

@Module({
  controllers: [PatientsController],
})
export class PatientsModule {}
