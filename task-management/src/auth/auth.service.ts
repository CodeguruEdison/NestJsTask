import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    private  logger = new  Logger(AuthService.name);
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) {
        //this.logger= new this.logger(AuthService.name);
    }
    async signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
       return await this.userRepository.signUp(authCredentialDto) ;
    }
    async signIn(authCredentialDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        const username = await this.userRepository.validateUserPassword(authCredentialDto);
       // console.log(username);
        if (!username) {
            throw new  UnauthorizedException('Invalid credential');
        }
        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.signAsync(payload);
        this.logger.debug(`Generated JWT token with payload ${JSON.stringify(payload)}`);
        return {accessToken};
    }
}
