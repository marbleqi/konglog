// 外部依赖
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
// 内部依赖
import { LogModule } from './log/log.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        // 进行配置参数验证
        if (!process.env.POSTGRES_HOST) {
          throw new Error('未配置数据库地址');
        }
        const host = process.env.POSTGRES_HOST;
        if (!process.env.POSTGRES_DB) {
          throw new Error('未配置数据库名');
        }
        const port = parseInt(process.env.POSTGRES_PORT, 10) || 5432;
        const database = process.env.POSTGRES_DB;
        if (!process.env.POSTGRES_USER) {
          throw new Error('未配置数据库用户');
        }
        const username = process.env.POSTGRES_USER;
        if (!process.env.POSTGRES_PSW) {
          throw new Error('未配置数据库密码');
        }
        const password = process.env.POSTGRES_PSW;
        console.debug('当前环境', process.env.NODE_ENV);
        /**同步配置，当开发环境和演示环境时，自动同步表结构 */
        return {
          type: 'postgres',
          host,
          port,
          database,
          username,
          password,
          synchronize: true,
          autoLoadEntities: true,
        } as TypeOrmModuleOptions;
      },
    }),
    EventEmitterModule.forRoot(),
    LogModule,
  ],
})
export class AppModule {}
