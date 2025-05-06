import { types } from '@typegoose/typegoose';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserEntity } from './user.entity.js';

export interface UserService {
  create(dto: CreateUserDto, salt: string): Promise<types.DocumentType<UserEntity>>;

  findByEmail(mail: string): Promise<types.DocumentType<UserEntity> | null>;

  findOrCreate(
    dto: CreateUserDto,
    salt: string
  ): Promise<types.DocumentType<UserEntity>>;

  findById(userId: string): Promise<types.DocumentType<UserEntity> | null>;
}
