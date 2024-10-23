import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { RoomsRepository } from './rooms.repository';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomEntity } from './room.entity';

@Injectable()
export class RoomsService {
  private readonly logger = new Logger(RoomsService.name);

  constructor(private readonly roomsRepository: RoomsRepository) {}

  async createRoom(createRoomDto: CreateRoomDto): Promise<RoomEntity> {
    this.logger.log('Initiating room creation');
    return await this.roomsRepository.createRoom(createRoomDto);
  }

  async findAll(): Promise<RoomEntity[]> {
    this.logger.log('Fetching all rooms');
    return await this.roomsRepository.findAll();
  }

  async findById(id: string): Promise<RoomEntity> {
    this.logger.log(`Fetching room with ID: ${id}`);
    const room = await this.roomsRepository.findById(id);
    if (!room) {
      this.logger.warn(`Room with ID ${id} not found`);
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    return room;
  }

  async updateRoom(
    id: string,
    updateRoomDto: UpdateRoomDto,
  ): Promise<RoomEntity> {
    this.logger.log(`Initiating update for room with ID: ${id}`);
    const room = await this.roomsRepository.findById(id);
    if (!room) {
      this.logger.warn(`Room with ID ${id} not found`);
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    return await this.roomsRepository.updateRoom(id, updateRoomDto);
  }
}
