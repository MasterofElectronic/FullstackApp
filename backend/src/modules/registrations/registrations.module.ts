import { Module } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';

@Module({
  providers: [RegistrationsService]
})
export class RegistrationsModule {}
