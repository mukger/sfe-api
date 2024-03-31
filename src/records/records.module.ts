import { Module } from '@nestjs/common';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';
import { Record } from './record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordsRepository } from './records.repository';
import { NestjsFingerprintModule } from 'nestjs-fingerprint';

@Module({
  imports: [
    TypeOrmModule.forFeature([Record]),
    NestjsFingerprintModule.forRoot({
      params: ['headers', 'userAgent', 'ipAddress']
    }),
  ],
  controllers: [RecordsController],
  providers: [RecordsService, RecordsRepository]
})
export class RecordsModule {}
