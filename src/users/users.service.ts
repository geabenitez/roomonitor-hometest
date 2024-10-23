import { Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly usersRepository: UsersRepository) {}

  async findOneByUsername(username: string): Promise<UserEntity | undefined> {
    this.logger.log(`Fetching user with username: ${username}`);
    return await this.usersRepository.findOneByUsername(username);
  }

  async createUser(createUserDto: CreateUserDto): Promise<Omit<UserEntity, 'password'>> {
    this.logger.log(`Creating user with username: ${createUserDto.username}`);
    return await this.usersRepository.createUser(createUserDto);
  }
}
