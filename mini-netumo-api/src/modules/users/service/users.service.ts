import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepositoty: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const existingUser = await this.userRepositoty.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (existingUser) {
      throw new ConflictException('user already exists');
    }

    const user = this.userRepositoty.create(createUserDto);
    await this.userRepositoty.save(user);
    this.logger.verbose(`User created successfully: ${user.email}`);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepositoty.findOne({ where: { email: email } });
  }
}
