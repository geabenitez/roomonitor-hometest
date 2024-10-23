import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from './room.entity';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomsRepository {
  private readonly logger = new Logger(RoomsRepository.name);

  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
  ) {}

  async createRoom(roomData: CreateRoomDto): Promise<RoomEntity> {
    this.logger.log(`Creating room with data: ${JSON.stringify(roomData)}`);
    try {
      const newRoom = this.roomRepository.create(roomData);
      const savedRoom = await this.roomRepository.save(newRoom);
      this.logger.log(`Room created with ID: ${savedRoom.id}`);
      return savedRoom;
    } catch (error) {
      const message = 'Error creating room';
      this.logger.error(message, error.stack);
      throw new InternalServerErrorException(message);
    }
  }

  async findAll(): Promise<RoomEntity[]> {
    this.logger.log('Fetching all rooms');
    try {
      const rooms = await this.roomRepository.find();
      this.logger.log(`Found ${rooms.length} rooms`);
      return rooms;
    } catch (error) {
      const message = 'Error fetching rooms';
      this.logger.error(message, error.stack);
      throw new InternalServerErrorException(message);
    }
  }

  async findById(id: string): Promise<RoomEntity | null> {
    this.logger.log(`Fetching room with ID: ${id}`);
    try {
      const room = await this.roomRepository.findOne({ where: { id } });
      if (room) {
        this.logger.log(`Room found with ID: ${id}`);
        return room;
      } else {
        this.logger.warn(`Room with ID: ${id} not found`);
        return null;
      }
    } catch (error) {
      const message = `Error fetching room with ID: ${id}`;
      this.logger.error(message, error.stack);
      throw new InternalServerErrorException(message);
    }
  }

  async updateRoom(
    id: string,
    updatedData: Partial<RoomEntity>,
  ): Promise<RoomEntity> {
    this.logger.log(
      `Updating room with ID: ${id} and data: ${JSON.stringify(updatedData)}`,
    );
    try {
      await this.roomRepository.update(id, updatedData);
      const updatedRoom = await this.roomRepository.findOne({ where: { id } });
      if (updatedRoom) {
        this.logger.log(`Room with ID: ${id} updated successfully`);
        return updatedRoom;
      } else {
        this.logger.warn(`Room with ID: ${id} not found after update`);
        return null;
      }
    } catch (error) {
      const message = `Error updating room with ID: ${id}`;
      this.logger.error(message, error.stack);
      throw new InternalServerErrorException(message);
    }
  }
}
