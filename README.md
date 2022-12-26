# 项目说明

基于 NestJS 框架搭建的 KONG 日志收集服务

配置记录的数据库字段

| 字段      | 类型   | 说明      |
| --------- | ------ | --------- |
| logId     | 长整型 | 日志 ID   |
| log       | json   | 日志      |
| routeId   | 字符串 | 路由 ID   |
| serviceId | 字符串 | 服务 ID   |
| client_ip | 字符串 | 客户端 IP |
| request   | json   | 请求消息  |
| response  | json   | 响应消息  |
| createAt  | 长整型 | 创建时间  |
