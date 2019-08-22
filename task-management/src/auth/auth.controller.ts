import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { isTSCallSignatureDeclaration } from '@babel/types';

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
     signIn(@Body(ValidationPipe)authCredentialsDto: AuthCredentialsDto){
         return  this.authService.signIn(authCredentialsDto);
    }
}
