import { Module, OnModuleInit } from '@nestjs/common';
import { InjectConnection, SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentService } from './appointment/appointment.service';
import { PatientModule } from './patient/patient.module';
import { SequelizePatient } from './patient/repositories/sequelize/sequelize-patient.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      database: 'test',
      host: 'localhost',
      dialect: 'postgres',
      username: 'user',
      password: 'password',
      port: 5432,
      models: [SequelizePatient],
      sync: {
        force: true,
        alter: true,
      },
    }),
    PatientModule.usingDatabase(),
  ],
  controllers: [AppController],
  providers: [AppService, AppointmentService],
})
export class AppModule implements OnModuleInit {
  constructor(@InjectConnection() private readonly sequelize: Sequelize) {}

  async onModuleInit() {
    await this.sequelize.sync();
  }
}
