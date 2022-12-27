// 外部依赖
import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import {
  getYear,
  getMonth,
  getDaysInMonth,
  getHours,
  getMinutes,
  getSeconds,
} from 'date-fns';

// 内部依赖
import { KongLogEntity, KongLogCountEntity } from './log.entity';

@Controller()
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
  @Post('*')
  async create(@Body() value: any, @Res() res: Response): Promise<void> {
    this.eventEmitter.emit('kong_log', value);
    res.status(200).json({ code: 0 });
  }

  /**
   * 追加日志信息
   * @param value 日志信息
   */
  @OnEvent('kong_log')
  async addLog(value: any) {
    const log = value;
    const routeId = value?.route?.id ? value.route.id : '';
    const client_ip = value?.client_ip ? value.client_ip : '';
    const request = value?.request ? value.request : {};
    const response = value?.response ? value.response : {};
    const started_at = value?.started_at ? value?.started_at : 0;
    await this.entityManager.insert(KongLogEntity, {
      log,
      routeId,
      client_ip,
      request,
      response,
      started_at,
    });
    const year = getYear(started_at);
    const month = getMonth(started_at);
    const day = getDaysInMonth(started_at);
    const hour = getHours(started_at);
    const minute = getMinutes(started_at);
    const second = getSeconds(started_at);
    /**用户对象 */
    const count: KongLogCountEntity = await this.entityManager.findOneBy(
      KongLogCountEntity,
      { year, month, day, hour, minute, second, routeId },
    );
    if (count) {
      await this.entityManager.increment(
        KongLogCountEntity,
        {
          year,
          month,
          day,
          hour,
          minute,
          second,
          routeId,
        },
        'count',
        1,
      );
    } else {
      await this.entityManager.insert(KongLogCountEntity, {
        year,
        month,
        day,
        hour,
        minute,
        second,
        routeId,
        count: 1,
      });
    }
  }
}
