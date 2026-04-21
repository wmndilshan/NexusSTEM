import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';

@ApiTags('orders')
@Controller('orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Get user orders or all orders (admin only)' })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'take', required: false })
  async findAll(
    @CurrentUser() user: any,
    @Query('skip') skip = 0,
    @Query('take') take = 20,
  ) {
    const isAdmin = user.role === 'ADMIN' || user.role === 'STAFF';
    return this.ordersService.findAll(
      isAdmin ? undefined : user.sub,
      Number(skip),
      Number(take),
    );
  }

  @Get('admin/by-status/:status')
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'STAFF')
  @ApiOperation({ summary: 'Get orders by status (admin/staff only)' })
  async getByStatus(@Param('status') status: string) {
    return this.ordersService.getOrdersByStatus(status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order details' })
  async findById(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ) {
    const isAdmin = user.role === 'ADMIN' || user.role === 'STAFF';
    return this.ordersService.findById(id, isAdmin ? undefined : user.sub);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create order from cart' })
  async create(
    @CurrentUser() user: any,
    @Body() dto: CreateOrderDto,
  ) {
    return this.ordersService.createOrderFromCart(user.sub, dto);
  }

  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'STAFF')
  @ApiOperation({ summary: 'Update order status (admin/staff only)' })
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateOrderStatus(id, dto);
  }
}
