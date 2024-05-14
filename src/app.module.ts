import { Module } from '@nestjs/common';
import { ReportsModule } from './modules/reports/reports.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot(), ReportsModule, PrismaModule],
})
export class AppModule {}
