import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomEntity } from './room.entity';

@ApiTags('rooms')
@Controller('rooms')
@ApiBearerAuth()
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new room' })
  @ApiResponse({
    status: 201,
    description: 'Room created successfully',
    type: RoomEntity,
  })
  createRoom(@Body() createRoomDto: CreateRoomDto): Promise<RoomEntity> {
    return this.roomsService.createRoom(createRoomDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rooms' })
  @ApiResponse({
    status: 200,
    description: 'List of rooms',
    type: [RoomEntity],
  })
  findAll(): Promise<RoomEntity[]> {
    return this.roomsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a room by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the room' })
  @ApiResponse({ status: 200, description: 'Room found', type: RoomEntity })
  @ApiResponse({ status: 404, description: 'Room not found' })
  findById(@Param('id') id: string): Promise<RoomEntity> {
    return this.roomsService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a room by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the room' })
  @ApiResponse({
    status: 200,
    description: 'Room updated successfully',
    type: RoomEntity,
  })
  @ApiResponse({ status: 404, description: 'Room not found' })
  updateRoom(
    @Param('id') id: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ): Promise<RoomEntity> {
    return this.roomsService.updateRoom(id, updateRoomDto);
  }
}
