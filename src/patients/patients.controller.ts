import { Body, Controller, Post } from '@nestjs/common';
import { RegisterPatientDto } from './dtos';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  public async registerPatient(
    @Body() registerPatientInput: RegisterPatientDto,
  ) {
    return await this.patientsService.registerPatient(registerPatientInput);
  }
}
