import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;

  @Column()
  password: string;
  @Column()
  salt: string;
  
  async validatePassword(password: string): Promise<boolean> {
   return  bcrypt.compare(password, this.password).then(function(res) {
        return true;
    });
    //const hash = await bcrypt.hash(password, this.salt);
    //return hash === this.password;
  }
}
