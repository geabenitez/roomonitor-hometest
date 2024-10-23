import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersRepository {
  private readonly logger = new Logger(UsersRepository.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOneByUsername(username: string): Promise<UserEntity | undefined> {
    this.logger.log(`Fetching user with username: ${username}`);
    try {
      const user = await this.userRepository.findOne({ where: { username } });
      return user;
    } catch (error) {
      const message = `Error fetching user with username: ${username}`;
      this.logger.error(message, error.stack);
      throw new InternalServerErrorException(message);
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<Omit<UserEntity, 'password'>> {
    const { username, password: newPassword } = createUserDto;
    this.logger.log(`Creating user with username: ${username}`);

    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const newUser = this.userRepository.create({
        username,
        password: hashedPassword,
      });

      const { password, ...savedUser } =
        await this.userRepository.save(newUser);
      this.logger.log(`User created with ID: ${savedUser.id}`);
      return savedUser;
    } catch (error) {
      const message = `Error creating user with username: ${username}`;
      this.logger.error(message, error.stack);
      throw new InternalServerErrorException(message);
    }
  }
}
