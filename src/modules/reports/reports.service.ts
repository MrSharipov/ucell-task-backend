import { Injectable } from '@nestjs/common';
import { ReportsCreateDto, ReportsListQueryDto } from './dtos';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  appGenerateCrudListResponse,
  appGenerateResponse,
  appGenerationPaginate,
  generateDefaultQueryFilters,
  IAnyObject,
} from '../../helpers/global';

@Injectable()
export class ReportsService {
  private model: Prisma.ReportsDelegate<any>;

  constructor(private readonly prisma: PrismaService) {
    this.model = prisma.reports;
  }

  async getGroupByRegion() {
    /*
          The first way: With row SQL
    */

    const regionSums = await this.prisma.$queryRaw`
      SELECT region, CAST(SUM(subscribers) AS INTEGER) as totalSubscribers
      FROM "Reports"
      GROUP BY "region"
    `;

    const uzbekistanTotal = await this.prisma.$queryRaw`
      SELECT CAST(SUM(subscribers) AS INTEGER)
      FROM "Reports"
    `;

    /*
        The second way: With findMany (not efficient)
  */

    // const reports = await this.prisma.reports.findMany();
    //
    // // Initialize an array to store region sums
    // const regionSums = [];
    //
    // // Calculate sums for each region
    // reports.forEach(report => {
    //   const regionIndex = regionSums.findIndex(item => item.region === report.region);
    //   if (regionIndex !== -1) {
    //     // Update sum if region already exists in the array
    //     regionSums[regionIndex].subscribers += report.subscribers;
    //   } else {
    //     // Add new region to the array
    //     regionSums.push({ region: report.region, subscribers: report.subscribers });
    //   }
    // });
    //
    // // Calculate total subscribers for Uzbekistan
    // const uzbekistanTotal = reports.reduce((acc, report) => {
    //   acc = acc + report.subscribers;
    //   return acc;
    // }, 0);

    return { regionSums, uzbekistanTotal: uzbekistanTotal[0].sum };
  }

  async create(data: ReportsCreateDto): Promise<IAnyObject> {
    try {
      const result = await this.model.create({
        data,
      });

      return appGenerateResponse({ id: result.id });
    } catch (e) {
      throw e;
    }
  }

  // async getListByPagination(query: ReportsListQueryDto): Promise<any> {
  //   const filter: Prisma.ReportsWhereInput = this.generateFilterByQuery(query);
  //   const totalCount = await this.model.count({
  //     where: filter,
  //   });
  //
  //   const result = await this.model.findMany({
  //     where: filter,
  //     orderBy: { id: Prisma.SortOrder.desc },
  //     skip: query.all ? undefined : (query.page - 1) * query.limit,
  //     take: query.all ? undefined : query.limit,
  //   });
  //
  //   return appGenerateResponse(
  //     appGenerateCrudListResponse(
  //       result,
  //       appGenerationPaginate(totalCount, query.page, query.limit),
  //     ),
  //   );
  // }
  //
  // generateFilterByQuery(query: ReportsListQueryDto): Prisma.ReportsWhereInput {
  //   let where: Prisma.ReportsWhereInput = {};
  //   where = generateDefaultQueryFilters<any, Prisma.ReportsWhereInput>(
  //     query,
  //     where,
  //     ['region'],
  //     [],
  //     {},
  //   );
  //   return where;
  // }
}
