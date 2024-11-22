import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

//const   SECRET_KEY = "ASDMKLAMDKLSAMDKLSAMDKLSAMDLKMASLDMSALMDL"

@Injectable()
export class AuthenticationGard2 implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];
    const expires = this.jwtService.decode(token);
    request['user'] = expires;
    return expires;
  }
}
