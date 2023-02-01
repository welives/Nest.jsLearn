import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  CanActivate,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { jwtConstants } from 'config/constants'
import { Observable } from 'rxjs'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  // 全局守卫
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    // 白名单验证
    if (this.isWhiteList(this.whiteList, request.url)) {
      return true
    }
    // 获取请求头中的token
    let token = context.switchToRpc().getData().headers.authorization
    // 校验token
    if (token && token.startsWidth('Bearer')) {
      token = token.split(' ')[1]
      if (token) {
        try {
          const jwtService = new JwtService()
          const user = jwtService.verify(token, jwtConstants)
          request.user = user
          return true
        } catch (error) {
          throw new UnauthorizedException('非法请求')
        }
      } else {
        throw new UnauthorizedException('非法请求')
      }
    } else {
      throw new UnauthorizedException('非法请求')
    }
  }

  // 白名单
  private whiteList: string[] = ['/auth/login']

  private isWhiteList(whiteList: string[], url: string): boolean {
    let flag = false
    if (whiteList.indexOf(url.split('?')[0]) >= 0) {
      flag = true
    }
    return flag
  }
}
