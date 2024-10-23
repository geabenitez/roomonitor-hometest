import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('rooms')
export class RoomEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 250 })
  name: string;

  @Column({ type: 'int' })
  capacity: number;

  @Column({ type: 'boolean', default: true })
  available: boolean;
}
