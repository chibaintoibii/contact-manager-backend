import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const bearer = request.headers.authorization?.split(' ')[0];
      const token = request.headers.authorization?.split(' ')[1];
      console.log(bearer, token);
      if(!token || !bearer)
        throw new UnauthorizedException();
      request['user'] = this.jwtService.verify(token, { secret: 'my-secret-key' })
      return true;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

}