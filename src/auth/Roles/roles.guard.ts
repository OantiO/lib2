import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

//const   SECRET_KEY = "ASDMKLAMDKLSAMDKLSAMDKLSAMDLKMASLDMSALMDL"

@Injectable()
export class AuthenticationGard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requirdRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];
    const user = this.jwtService.decode(token);
    const userRoles: Role[] = user.role;
    return this.roleChecker(requirdRoles, userRoles);
  }
  roleChecker(requirdRoles: Role[], userRoles: Role[]) {
    for (const userR in requirdRoles) {
      test: for (const finded in userRoles) {
        if (requirdRoles[userR] == userRoles[finded]) {
          return true;
        } else {
          continue test;
        }
      }
    }
  }
}
