// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { JwtService } from '@nestjs/jwt';

// //const   SECRET_KEY = "ASDMKLAMDKLSAMDKLSAMDKLSAMDLKMASLDMSALMDL"

// @Injectable()
// export class AuthenticationGardCategory implements CanActivate {
//   constructor(private jwtService: JwtService) {}
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const token = request.headers.authorization.split(' ')[1];
//     const expires = this.jwtService.decode(token);
//     const age = expires.age;
//     if (age.includes()) {
//       return true;
//     }
//   }
// }
