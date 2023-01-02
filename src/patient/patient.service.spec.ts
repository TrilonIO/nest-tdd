import { Test, TestingModule } from '@nestjs/testing';
import { PatientService } from './patient.service';
import { InMemoryPatientRepository } from './repositories/in-memory-patient.repository';
import { SavePatientRepository } from './repositories/save-patient.repository';

describe('PatientService', () => {
  let service: PatientService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        PatientService,
        {
          provide: SavePatientRepository,
          useClass: InMemoryPatientRepository,
        },
      ],
    }).compile();

    service = module.get<PatientService>(PatientService);
  });

  afterEach(() => {
    module.close();
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
