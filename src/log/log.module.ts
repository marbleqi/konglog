// 外部依赖
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// 内部依赖
import { KongLogEntity, KongLogCountEntity } from './log.entity';
import { LogController } from './log.controller';

@Module({
  imports: [TypeOrmModule.forFeature([KongLogEntity, KongLogCountEntity])],
  controllers: [LogController],
})
export class LogModule {}
