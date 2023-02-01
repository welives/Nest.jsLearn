import { Controller, Post, Get, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UsersService } from 'src/users/users.service'
import { AuthService } from './auth.service'

@Controller('auth') // 父级路由
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  // 进行登录验证,自动从body中获取数据
  @UseGuards(AuthGuard('local'))
  @Post('login') // 子级路由
  async login(@Request() req): Promise<any> {
    return this.authService.certificate(req.user)
  }

  @Get('profile')
  async getUserInfo(@Request() req) {
    return this.usersService.findOne(req.user.account)
  }
}
