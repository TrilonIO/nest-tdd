import { Test, TestingModule } from '@nestjs/testing';
import { PatientService } from './patient.service';

describe('PatientService', () => {
  let service: PatientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientService],
    }).compile();

    service = module.get<PatientService>(PatientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should return a new patient with given name', async () => {
      const newPatient = await service.register({ name: 'John Doe' });

      expect(newPatient).toEqual({
        id: expect.any(Number),
        name: 'John Doe',
      });
    });
  });
});
