import { IntersectionType } from '@nestjs/swagger';
import { ReportsFiltersDto } from './reports.filters.dto';
import { ListQueryDto } from '../../../helpers/dtos';

export class ReportsListQueryDto extends IntersectionType(
  ListQueryDto,
  ReportsFiltersDto,
) {}
