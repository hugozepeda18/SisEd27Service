import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalController } from 'src/controllers/personal.controller';
import { PersonalService } from 'src/services/personal.service';

import { Personal } from 'src/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Personal])
  ],
  providers: [PersonalService],
  controllers: [PersonalController]
})
export class PersonalModule {}