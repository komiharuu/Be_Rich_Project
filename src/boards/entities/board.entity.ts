import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Invitation } from './invitation.entity';

@Index('boardTitle', ['title'], { unique: true })
@Entity({ name: 'boards' })
export class Board {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  //   @ManyToOne(() => User, (user) => user.boards, { onDelete: 'CASCADE' })
  //   owner: User;

  @OneToMany(() => Invitation, (invitations) => invitations.board)
  invitations: Invitation;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: '#ffffff' })
  backgroundColor: string;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
