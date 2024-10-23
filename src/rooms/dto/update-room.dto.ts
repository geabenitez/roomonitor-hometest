import { IsString, IsInt, IsBoolean, Min, ValidateIf } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRoomDto {
  @ApiPropertyOptional({
    description: 'The name of the room',
    example: 'Updated Conference Room',
  })
  @ValidateIf((o) => o.name || o.capacity || o.available)
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'The capacity of the room, minimum value is 1',
    example: 15,
  })
  @ValidateIf((o) => o.name || o.capacity || o.available)
  @IsInt()
  @Min(1, { message: 'Capacity must be at least 1' })
  capacity?: number;

  @ApiPropertyOptional({
    description: 'Whether the room is available or not',
    example: false,
  })
  @ValidateIf((o) => o.name || o.capacity || o.available)
  @IsBoolean()
  available?: boolean;
}
