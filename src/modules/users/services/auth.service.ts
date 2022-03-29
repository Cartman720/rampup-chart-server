import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from '../dto/sign-up.dto';
import bcrypt from 'bcrypt';
import { UserDocument } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ username });
    const isCorrect = await bcrypt.compare(password, user?.hash);

    if (isCorrect) {
      const { hash, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async signup({ username, ...params }: SignUpDto) {
    const exists = await this.usersService.findOne({ username });

    if(exists) {
      throw new BadRequestException("Username is already taken");
    }

    if (params.password !== params.confirm) {
      throw new BadRequestException("Passwords don't match");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(params.password, salt);

    const user = await this.usersService.create({
      username,
      hash,
    });

    return this.login(user);
  }
}
