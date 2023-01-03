import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { PATIENT_BY_ID_REPOSITORY } from './constants';
import { PatientByIdRepository } from './repositories/patient-by-id.repository';

@Controller('patients')
export class PatientController {
  constructor(
    @Inject(PATIENT_BY_ID_REPOSITORY)
    private readonly patientByIdRepository: PatientByIdRepository,
  ) {}

  @Get(':id')
  public async getPatientById(@Param('id', ParseIntPipe) id: number) {
    const patient = await this.patientByIdRepository.findById(id);

    return {
      id: patient.id,
      name: patient.name,
    };
  }
}
