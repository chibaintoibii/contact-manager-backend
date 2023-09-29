import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import * as process from "process";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";

const PORT = parseInt(process.env.PORT)
async function start() {
  const app = await NestFactory.create(AppModule, {cors: true
  });
  // app.enableCors({
  //   origin: '*',
  //   credentials: true,
  // });
  app.use(cookieParser());
  // app.use(session({
  //   secret: process.env.SESSION_SECRET,
  //   resave: false,
  //   saveUninitialized: false,
  //   cookie: {
  //     maxAge: 1000 * 60 * 60 * 24 * 30,
  //     httpOnly: true,
  //     secure: false
  //   },
  // }))
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT);
}
start()
  .then(() => console.log(`Application started on port ${PORT} successfully`));
