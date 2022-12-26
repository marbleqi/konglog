// 外部依赖
import { Entity, Column, PrimaryGeneratedColumn, AfterLoad } from 'typeorm';

/**KONG日志表 */
@Entity('kong_logs')
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

  /**服务 */
  @Column({ type: 'text', name: 'service_id', comment: '服务' })
  serviceId: any;

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
  @Column({ type: 'bigint', name: 'create_at', comment: '创建时间' })
  createAt: number;

  /**对长整型数据返回时，进行数据转换 */
  @AfterLoad()
  userLoad() {
    this.logId = Number(this.logId);
    this.createAt = Number(this.createAt);
  }
}
