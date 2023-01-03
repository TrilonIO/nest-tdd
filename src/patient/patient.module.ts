import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';

@Module({
  providers: [PatientService],
})
export class PatientModule {}
