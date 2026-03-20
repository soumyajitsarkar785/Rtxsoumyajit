import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderEntity } from './order.entity';
import { KafkaService } from './kafka.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  providers: [OrderService, KafkaService],
  exports: [OrderService],
})
export class OrderModule {}