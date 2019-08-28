import {  Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
        const {username, password} = authCredentialDto;
        const salt = await bcrypt.genSalt();
        // console.log(salt);
        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        try {
            await user.save();
        } catch (error) {
            // console.log(error.code);
            if (error.code === '23505') {
                throw new ConflictException('User Name already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }

    }
    public async validateUserPassword(authCredentialDto: AuthCredentialsDto): Promise<string> {
        const {username, password} = authCredentialDto;
        const user = await this.findOne({username});
        if (user && await user.validatePassword(password) ){
            return user.username;
        } else {
            return null;
        }

    }
    private async hashPassword(password: string, salt: string ): Promise<string> {
     return await bcrypt.hash(password, salt);
    }

}
