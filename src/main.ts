import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; // root module

// Entry
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000); // port number
}
bootstrap();
