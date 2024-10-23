import { IsString, IsInt, IsBoolean, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty({
    description: 'The name of the room',
    example: 'Conference Room',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The capacity of the room, minimum value is 1',
    example: 10,
  })
  @IsInt()
  @Min(1, { message: 'Capacity must be at least 1' })
  capacity: number;

  @ApiPropertyOptional({
    description: 'Whether the room is available or not',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  available?: boolean;
}
