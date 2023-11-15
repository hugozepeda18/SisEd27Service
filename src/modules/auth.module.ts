import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/services/auth.service';
import * as dotenv from 'dotenv'

dotenv.config();


@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            })
        ],
        providers: [AuthService],
        exports: [AuthService]
})
export class AuthModule {}
