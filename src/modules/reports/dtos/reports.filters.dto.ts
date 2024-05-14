import { PickType, PartialType } from '@nestjs/mapped-types';
import { ReportsCreateDto } from './reports.create.dto';

export class ReportsFiltersDto extends PartialType(
  PickType(ReportsCreateDto, ['region', 'item'] as const),
) {}
