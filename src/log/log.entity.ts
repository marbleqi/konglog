// 外部依赖
import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Column,
  Index,
  AfterLoad,
} from 'typeorm';

/**KONG日志表 */
@Entity('kong_logs')
@Index(['routeId', 'started_at'])
export class KongLogEntity {
  /**日志ID */
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'log_id', comment: '日志ID' })
  logId: number;

  /**日志信息 */
  @Column({ type: 'jsonb', name: 'log', comment: '日志信息' })
  log: any;

  /**路由 */
  @Column({ type: 'text', name: 'route_id', comment: '路由' })
  routeId: any;

  /**客户端IP */
  @Column({ type: 'text', name: 'client_ip', comment: '客户端IP' })
  client_ip: string;

  /**请求 */
  @Column({ type: 'jsonb', name: 'request', comment: '请求' })
  request: any;

  /**响应 */
  @Column({ type: 'jsonb', name: 'response', comment: '响应' })
  response: any;

  /**创建时间 */
  @Column({ type: 'bigint', name: 'started_at', comment: '创建时间' })
  started_at: number;

  /**对长整型数据返回时，进行数据转换 */
  @AfterLoad()
  userLoad() {
    this.logId = Number(this.logId);
    this.started_at = Number(this.started_at);
  }
}

/**KONG日志统计表 */
@Entity('kong_logs_count')
@Index(['routeId', 'year', 'month', 'day', 'hour', 'minute'])
export class KongLogCountEntity {
  /**路由 */
  @PrimaryColumn({ type: 'text', name: 'route_id', comment: '路由' })
  routeId: string;

  /**秒 */
  @PrimaryColumn({ type: 'text', name: 'second', comment: '秒' })
  second: string;

  /**年 */
  @Column({ type: 'text', name: 'year', comment: '年' })
  year: string;

  /**月 */
  @Column({ type: 'text', name: 'month', comment: '月' })
  month: string;

  /**日 */
  @Column({ type: 'text', name: 'day', comment: '日' })
  day: string;

  /**时 */
  @Column({ type: 'text', name: 'hour', comment: '时' })
  hour: string;

  /**分 */
  @Column({ type: 'text', name: 'minute', comment: '分' })
  minute: string;

  /**请求数 */
  @Column({ type: 'int', name: 'count', comment: '请求数' })
  count: number;
}
