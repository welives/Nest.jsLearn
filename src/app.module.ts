import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { GuardModule } from './guard/guard.module'

@Module({
  imports: [AuthModule, UsersModule, GuardModule], // 导入其他模块提供的服务
  controllers: [], //控制器
  providers: [], // 服务提供者
})
export class AppModule {}
