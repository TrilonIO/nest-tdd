import { Injectable } from '@nestjs/common';

@Injectable()
export class PatientService {
  register(patientData: any) {
    return {
      id: 1,
      name: patientData.name,
    };
  }
}
