import { PartialType } from '@nestjs/swagger';
import { ReportsCreateDto } from './reports.create.dto';

export class ReportsUpdateDto extends PartialType(ReportsCreateDto) {}
