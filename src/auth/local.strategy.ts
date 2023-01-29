import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ModuleRef, ContextIdFactory } from '@nestjs/core';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private moduleRef: ModuleRef) {
    super({
      passReqToCallback: true,
      usernameField: 'account',
    });
  }

  // 验证通过后自动挂载到req.user上
  async validate(
    request: Request,
    account: string,
    password: string,
  ): Promise<any> {
    const contextId = ContextIdFactory.getByRequest(request);
    const authService = await this.moduleRef.resolve(AuthService, contextId);
    const res = await authService.validateUser(account, password);
    switch (res.type) {
      case 0:
        return res.result;
      case 1:
        throw new UnauthorizedException({
          code: 401,
          message: '账号或密码错误',
        });
      default:
        throw new UnauthorizedException({
          code: 404,
          message: '用户不存在',
        });
    }
  }
}
