import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';

@Module({
  providers: [PatientService],
  exports: [PatientService],
})
export class PatientModule {}
