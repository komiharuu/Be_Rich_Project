import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../boards/types/member-role.type';
import { Board } from '../../boards/entities/board.entity';
import { Invitation } from './invitation.entity';

@Entity({ name: 'members' })
export class Member {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'int', name: 'user_id', unsigned: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.members)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'int', name: 'board_id', unsigned: true })
  boardId: number;

  @ManyToOne(() => Board, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'board_id' })
  board: Board;

  @Column({ type: 'int', name: 'invitation_id', unsigned: true })
  invitationId: number;

  @OneToOne(() => Invitation)
  @JoinColumn({ name: 'invitation_id' })
  invitation: Invitation;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
