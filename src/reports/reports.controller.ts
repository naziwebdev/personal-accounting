import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { getUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/guards/auth.guard';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('/income-weekly')
  @UseGuards(JwtAuthGuard)
  async getWeeklyIncomeReport(
    @getUser() user: User,
    @Query('year') year: string,
    @Query('month') month: string,
  ) {
    const incomes = await this.reportsService.getWeeklyIncomeReport(
      parseInt(year),
      parseInt(month),
      user,
    );

    return {
      data: incomes,
      statusCodes: HttpStatus.OK,
      message: 'weekly income reports sent successfully',
    };
  }

  @Get('/income-monthly')
  @UseGuards(JwtAuthGuard)
  async getMonthlyIncomeReport(
    @getUser() user: User,
    @Query('year') year: string,
  ) {
    const incomes = await this.reportsService.getMonthlyIncomeReport(
      parseInt(year),
      user,
    );

    return {
      data: incomes,
      statusCodes: HttpStatus.OK,
      message: 'monthly income reports sent successfully',
    };
  }

  @Get('/expense-weekly')
  @UseGuards(JwtAuthGuard)
  async getWeeklyExpenseReport(
    @getUser() user: User,
    @Query('year') year: string,
    @Query('month') month: string,
  ) {
    const expenses = await this.reportsService.getWeeklyExpenseReport(
      parseInt(year),
      parseInt(month),
      user,
    );

    return {
      data: expenses,
      statusCodes: HttpStatus.OK,
      message: 'weekly expense reports sent successfully',
    };
  }

  @Get('/expense-monthly')
  @UseGuards(JwtAuthGuard)
  async getMonthlyExpenseReport(
    @getUser() user: User,
    @Query('year') year: string,
  ) {
    const expenses = await this.reportsService.getMonthlyExpenseReport(
      parseInt(year),
      user,
    );

    return {
      data: expenses,
      statusCodes: HttpStatus.OK,
      message: 'monthly expense reports sent successfully',
    };
  }

  @Get('/saving')
  @UseGuards(JwtAuthGuard)
  async getMonthlySavingReport(
    @getUser() user: User,
    @Query('year') year: string,
  ) {
    const savings = await this.reportsService.getMonthlySaveMoney(
      parseInt(year),
      user,
    );

    return {
      data: savings,
      statusCodes: HttpStatus.OK,
      message: 'monthly savings reports sent successfully',
    };
  }
}
