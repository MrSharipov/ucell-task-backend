import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class ListQueryDto {
  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  page? = 1;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  limit? = 25;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({
    type: [Date, String],
    required: false,
  })
  @IsDateString()
  @IsOptional()
  date_from?: Date | string;

  @ApiProperty({
    type: [Date, String],
    required: false,
  })
  @IsDateString()
  @IsOptional()
  date_to?: Date | string;

  @ApiProperty({
    type: [Number],
    required: false,
  })
  @IsNumber({}, { each: true })
  @Type(() => Number)
  @IsArray()
  @IsOptional()
  statusList?: number[];

  @ApiProperty({
    type: Boolean,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  all?: boolean = false;

  @ApiProperty({
    type: [Number],
    required: false,
  })
  @IsNumber({}, { each: true })
  @Type(() => Number)
  @IsArray()
  @IsOptional()
  include?: number[];

  @ApiProperty({
    type: [Number],
    required: false,
  })
  @IsNumber({}, { each: true })
  @Type(() => Number)
  @IsArray()
  @IsOptional()
  exclude?: number[];
}
