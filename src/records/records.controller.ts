import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Res, UseGuards } from '@nestjs/common';
import { Request as Req } from 'express';
import { Request } from '@nestjs/common';
import { RecordsService } from './records.service';
import { Record } from './record.entity';
import { AddRecordDto } from './dto/add-record.dto';
import { Fingerprint, IFingerprint } from 'nestjs-fingerprint';
import { CheckUuidGuard } from 'src/guards/check-uuid.guard';
import { Response } from 'express';

@Controller('records')
@UseGuards(CheckUuidGuard)
export class RecordsController {
    constructor(private recordsService: RecordsService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    addRecord(
        @Body() addRecordDto: AddRecordDto,
        @Fingerprint() fp: IFingerprint,
        @Res({ passthrough: true }) res: Response
    ): Promise<Record> {
        return this.recordsService.addRecord(addRecordDto, fp.id, res)
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    getRecords(
        @Query('page') page: string,
        @Query('scope') scope: string,
        @Request() request: Req,
        @Res({ passthrough: true }) res: Response,
    ): Promise<Record[]> {
        return this.recordsService.getRecords(scope, page, request.cookies['fp'], res)
    }

    @Get('/:recordId')
    @HttpCode(HttpStatus.OK)
    getRecordById(
        @Request() request: Req,
        @Param('recordId') recordId: string  
    ): Promise<Record> {
        return this.recordsService.getRecordById(recordId, request.cookies['fp'])
    }
}
