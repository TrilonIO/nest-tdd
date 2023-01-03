import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PatientModel } from './patient.model';
import { PatientByIdRepository } from './repositories/patient-by-id.repository';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientByIdRepository: PatientByIdRepository) {}

  @Get(':id')
  public async getPatientById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PatientModel> {
    const patient = await this.patientByIdRepository.findById(id);

    return {
      id: patient.id,
      name: patient.name,
    };
  }
}
