import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Member } from './member.entity';
import { Board } from './board.entity';
import { Status } from '../types/invitation-status.type';

@Entity({ name: 'invitations' })
export class Invitation {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ManyToOne(() => Board, (board) => board.invitations, { onDelete: 'CASCADE' })
  board: Board;

  @OneToOne(() => Member)
  member: Member;

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