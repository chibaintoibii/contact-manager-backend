import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import * as process from "process";


const PORT = parseInt(process.env.PORT)
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT);
}
bootstrap()
  .then(() => console.log(`Application started on port ${PORT} successfully`));
