import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Board } from 'src/boards/entities/board.entity';
import { Status } from '../../invitations/types/invitation-status.type';

@Entity({ name: 'invitations' })
export class Invitation {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'int', name: 'board_id', unsigned: true })
  boardId: number;

  @ManyToOne(() => Board, (board) => board.invitations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'board_id' })
  board: Board;

  @Column()
  memberEmail: string;

  @Column({ type: 'enum', enum: Status, default: Status.Pending })
  status: Status;

  @Column({ type: 'text' })
  token: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
