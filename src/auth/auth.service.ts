import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  // 验证登录信息
  async validateUser(
    account: string,
    pass: string,
  ): Promise<{ type: number; result: any }> {
    const user = await this.usersService.findOne(account)
    if (user) {
      // 验证通过
      if (user.password === pass) {
        const { password, ...result } = user
        return {
          type: 0,
          result,
        }
      } else {
        // 账号或密码错误
        return {
          type: 1,
          result: null,
        }
      }
    }
    // 用户不存在
    return {
      type: 2,
      result: null,
    }
  }

  // 处理jwt签证
  certificate(user: any) {
    const payload = { id: user.id, account: user.account }
    return { token: this.jwtService.sign(payload) }
  }
}
