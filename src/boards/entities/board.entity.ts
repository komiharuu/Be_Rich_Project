import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Invitation } from './invitation.entity';
import { User } from 'src/users/entities/user.entity';
import { Member } from './member.entity';

@Index('boardTitle', ['title'], { unique: true })
@Entity({ name: 'boards' })
export class Board {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  //   @ManyToOne(() => User, (user) => user.boards, { onDelete: 'CASCADE' })
  //   @JoinColumn({name : 'owner_id'})
  //   user: User;

  @OneToMany(() => Member, (members) => members.board)
  members: Member[];

  @OneToMany(() => Invitation, (invitations) => invitations.board)
  invitations: Invitation[];

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
