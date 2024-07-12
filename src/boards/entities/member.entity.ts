import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../types/member-role.type';
import { Board } from './board.entity';
import { Invitation } from './invitation.entity';

@Entity({ name: 'members' })
export class Member {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Board, { onDelete: 'CASCADE' })
  board: Board;

  @OneToOne(() => Invitation)
  invitation: Invitation;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}