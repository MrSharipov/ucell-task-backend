import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsCreateDto, ReportsListQueryDto } from './dtos';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  // @Get()
  // @HttpCode(HttpStatus.OK)
  // async getListByPagination(@Query() query: ReportsListQueryDto) {
  //   return this.reportsService.getListByPagination(query);
  // }

  @Get('group')
  @HttpCode(HttpStatus.OK)
  async getGroupByRegion() {
    return this.reportsService.getGroupByRegion();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: ReportsCreateDto) {
    return this.reportsService.create(data);
  }

  // @Get(':id')
  // @HttpCode(HttpStatus.OK)
  // async getById(@Param('id', ParseIntPipe) id: number) {
  //   return this.reportsService.getById(id);
  // }
  //
  // @Put(':id')
  // @HttpCode(HttpStatus.OK)
  // async update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() data: ReportsUpdateDto,
  // ) {
  //   return this.reportsService.update(id, data);
  // }
  //
  // @Delete(':id')
  // @HttpCode(HttpStatus.OK)
  // async delete(@Param('id', ParseIntPipe) id: number) {
  //   return this.reportsService.delete(id);
  // }
}
