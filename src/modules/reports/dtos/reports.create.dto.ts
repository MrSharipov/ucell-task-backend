import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ReportsCreateDto {
  @ApiProperty()
  @IsString()
  @MaxLength(150)
  @MinLength(2)
  @IsDefined()
  region: string;

  @ApiProperty()
  @IsNumber()
  @IsDefined()
  item: number;

  @ApiProperty()
  @IsNumber()
  @IsDefined()
  units: number;

  @ApiProperty()
  @IsNumber()
  @IsDefined()
  subscribers: number;
}
