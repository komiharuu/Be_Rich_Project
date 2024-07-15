import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Board } from 'src/boards/entities/board.entity';
import { Member } from 'src/boards/entities/member.entity';
import { List } from 'src/lists/entities/list.entity';
import { Card } from 'src/cards/entities/card.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column({ name: 'profile_img', nullable: true })
  profileImg: string;

  @Column({ name: 'refresh_token', nullable: true })
  refreshToken: string;

  @Column({ name: 'is_deleted', default: false })
  isDeleted: boolean;

  @Column({ default: 'USER' }) 
  role: string;

  @Column({ default: 0 }) 
  point: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Board, (board) => board.user)
  boards: Board[];

  @OneToMany(() => Member, (member) => member.user)
  members: Member[];

  @OneToMany(() => List, (list) => list.user)
  lists: List[];

  @OneToMany(() => Comment, (comments) => comments.user, {})
  comments: Comment[];

  @OneToMany(() => Card, (cards) => cards.user, {})
  cards: Card[];
}