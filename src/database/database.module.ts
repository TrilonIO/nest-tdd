import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from '../config';

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...databaseConfig,
      dialect: 'postgres',
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
})
export class DatabaseModule implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly sequelize: Sequelize) {}

  async onModuleDestroy() {
    await this.sequelize.close();
  }

  async onModuleInit() {
    await this.sequelize.sync();
  }
}
