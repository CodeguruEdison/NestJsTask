import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { isTSCallSignatureDeclaration } from '@babel/types';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    /**
     *
     */
    constructor(private readonly authService: AuthService) {

    }
    @Post('/signup')
     signUp(@Body(ValidationPipe)authCredentialsDto: AuthCredentialsDto): Promise<void> {
       //console.log(authCredentialsDto);
       return  this.authService.signUp(authCredentialsDto);
    }
    @Post('/signin')
     signIn(@Body(ValidationPipe)authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
         return  this.authService.signIn(authCredentialsDto);
    }
    /*@Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
        console.log(user);

    }*/
}