import { Repository } from "typeorm";
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Record } from "./record.entity";
import { AddRecordDto } from "./dto/add-record.dto";
import { skip } from "node:test";

@Injectable()
export class RecordsRepository extends Repository<Record> {
  constructor(private dataSource: DataSource) {
    super(Record, dataSource.createEntityManager());
  }

  async createRecord(addRecordDto: AddRecordDto, fp: string): Promise<Record> {
    const { type, kloc, adtAtr: adt_atr } = addRecordDto
    const record = this.create({
      kloc,
      type,
      adt_atr,
      fingerprint: fp
    })

    try {
      await this.save(record)
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException("Ooops... Something went wrong...")
    }

    return record
  }

  async getRecords(scope: string, page: string, fp: string): Promise<Record[]> {
    const skipNumber = (!scope && !page)?(0):(Number(scope) * (Number(page) - 1))
    const takeNumber = (!scope)?(10000):(Number(scope))
    const records = await this.find({
      skip: skipNumber,
      take: takeNumber,
      where: {fingerprint: fp},
      order: { creating_date: 'ASC' }
    })
    return records
  }

  async getRecordCount(fp: string): Promise<number> {
    return await this.count({where: {fingerprint: fp}});
  }

  async getRecordById(recordId: string, fp: string): Promise<Record> {
    const record = await this.find({
      where: {fingerprint: fp, id: recordId}
    })
    return record[0]
  }
}