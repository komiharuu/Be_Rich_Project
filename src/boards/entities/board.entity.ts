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
import { Invitation } from './invitation.entity';
import { User } from 'src/users/entities/user.entity';
import { Member } from './member.entity';
import { List } from 'src/lists/entities/list.entity';

@Index('boardTitle', ['title'], { unique: true })
@Entity({ name: 'boards' })
export class Board {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ManyToOne(() => User, (user) => user.boards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_id' })
  user: User;

  @OneToMany(() => Member, (members) => members.board)
  members: Member[];

  @OneToMany(() => Invitation, (invitations) => invitations.board)
  invitations: Invitation[];

  /**
   * 제목
   * @example "To Do"
   */
  @Column()
  title: string;

  /**
   * 설명
   * @example "해야할 업무"
   */
  @Column({ type: 'text', nullable: true })
  description: string;

  /**
   * 배경 색상
   * @example "#0000FF"
   */
  @Column({ default: '#ffffff' })
  backgroundColor: string;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => List, (list) => list.board)
  list: List;
}
