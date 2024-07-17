import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Member } from 'src/invitations/entities/member.entity';
import { Invitation } from 'src/invitations/entities/invitation.entity';
import { List } from 'src/lists/entities/list.entity';

@Index('boardTitle', ['title'])
@Entity({ name: 'boards' })
export class Board {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'int', name: 'owner_id', unsigned: true })
  ownerId: number;

  @ManyToOne(() => User, (user) => user.boards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_id' })
  user: User;

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

  @OneToMany(() => List, (lists) => lists.board)
  lists: List[];
}
