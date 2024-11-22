import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './schemas/user.schema';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { LoginAuthorDto } from './dto/loginAuthor';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password, role, age } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: any = await this.usersRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        name,
        age,
        email,
        password: hashedPassword,
        role,
      })
      .returning(['id'])
      .execute();
    const token = this.jwtService.sign({
      id: user.generatedMaps[0].id,
      role: role,
      name: name,
      age: age,
    });
    return { token };
  }
  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;


    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user.id, role: user.role });

    return { token };
  }

  async loginAuthor(loginAuthorDto: LoginAuthorDto) {
    const { email, password } = loginAuthorDto;

    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return await this.usersRepository.find({
      relations: ['books'],
    });
  }
}
