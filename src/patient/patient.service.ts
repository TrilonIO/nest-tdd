import { Injectable } from '@nestjs/common';

@Injectable()
export class PatientService {
  public async register(patientData: any) {
    return {
      id: 1,
      name: patientData.name,
    };
  }
}
