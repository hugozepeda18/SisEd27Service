import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { LoginDto } from 'src/dto';

export interface JWTPayload {
    userId: string;
    role: string;
}

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private jwtService: JwtService
    ) {};

    async validateUser (password: string, loginDto: LoginDto) {
        
        const isValid = await compare(loginDto.password, password);
        if (!isValid) {
            throw new UnauthorizedException();
        }

        return true
    }

    async generateToken (expiration: string, userId: string, role: string) {

        const payload: JWTPayload = {
            userId,
            role
        }
        return await this.jwtService.signAsync(payload, {expiresIn: expiration})
    }
}