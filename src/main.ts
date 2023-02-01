import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { JwtAuthGuard } from './guard/jwtAuth.guard'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalGuards(new JwtAuthGuard())
  await app.listen(3000)
}
bootstrap()
