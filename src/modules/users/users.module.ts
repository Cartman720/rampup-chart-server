import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.registerAsync({
      useFactory: () => ({
        signOptions: { expiresIn: '1d' },
        secret: process.env.JWT_SECRET,
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [UsersService, AuthService, LocalStrategy],
})
export class UsersModule {}
