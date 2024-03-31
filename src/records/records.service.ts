import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordsRepository } from './records.repository';
import { AddRecordDto } from './dto/add-record.dto';
import { Record } from './record.entity';
import { Response } from 'express';

@Injectable()
export class RecordsService {
    constructor(
        @InjectRepository(RecordsRepository)
        private readonly recordsRepository: RecordsRepository
    ) {}

    async addRecord(
        addRecordDto: AddRecordDto,
        fp: string,
        res: Response
    ): Promise<Record> {
        res.cookie["fp"] = fp
        return this.recordsRepository.createRecord(addRecordDto, fp)
    }

    async getRecords(
        scope: string,
        page: string,
        fp: string,
        res: Response
    ): Promise<Record[]> {
        const totalCount = await this.recordsRepository.getRecordCount(fp)
        res.header("X-Total-Count", String(totalCount))
        return this.recordsRepository.getRecords(scope, page, fp)
    }

    async getRecordById(
        recordId: string,
        fp: string
    ): Promise<Record> {
        return this.recordsRepository.getRecordById(recordId, fp)
    }
}
