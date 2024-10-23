import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MinLength, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'newuser', description: 'Username for the new user' })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password for the new user',
  })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Set whether the user is active or inactive',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}