import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { jwtConstants } from 'config/constants'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    })
  }
  // jwt校验, 验证通过后自动挂载到req.user上
  async validate(payload: any) {
    return payload
  }
}
