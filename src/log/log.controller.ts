// 外部依赖
import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
// 内部依赖
import { KongLogEntity } from './log.entity';

@Controller('log')
export class LogController {
  /**
   * 构造函数
   * @param entityManager 实体管理器
   * @param eventEmitter 事件发射器
   * @param operateService 操作序号服务
   */
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  /**
   * 创建站点
   * @param value 提交的站点信息
   * @param res 响应上下文
   */
  @Post()
  async create(@Body() value: any, @Res() res: Response): Promise<void> {
    console.debug('收到消息', value);
    this.eventEmitter.emit('kong_log', value);
    res.status(200).json({ code: 0 });
  }

  /**
   * 追加日志信息
   * @param value 日志信息
   */
  @OnEvent('kong_log')
  async addLog(value: any) {
    await this.entityManager.insert(KongLogEntity, {
      log: value,
      client_ip: value.client_ip ? value.client_ip : '',
      request: value.request ? value.request : {},
      response: value.response ? value.response : {},
      route: value.route ? value.route : {},
      service: value.service ? value.service : {},
      createAt: Date.now(),
    });
  }
}
