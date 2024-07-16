import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { List } from 'src/lists/entities/list.entity';
import { Card } from 'src/cards/entities/card.entity';
import { Board } from 'src/boards/entities/board.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Member } from 'src/boards/entities/member.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn({unsigned: true})
  id: number;

  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력해 주세요.' })
  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '닉네임을 입력해 주세요.' })
  @Column({ type: 'varchar', unique: true, nullable: false })
  nickname: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호를 입력해 주세요.' })
  @Column({ type: 'varchar', select: false, nullable: false })
  password: string;

  @IsString()
  @IsNotEmpty({ message: '프로필 이미지를 입력해 주세요.' })
  @Column({ type: 'varchar', unique: true, nullable: true })
  profileImg: string;

  @Column({ type: 'varchar', nullable: true })
  refreshToken: string;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Board, (boards) => boards.user)
  boards: Board[];

  @OneToMany(() => Member, (members) => members.user)
  members: Member[];

  @OneToMany(() => List, (lists) => lists.user)
  lists: List[];

  @OneToMany(() => Card, (cards) => cards.user)
  cards: Card[];

  @OneToMany(() => Comment, (comments) => comments.user)
  comments: Comment[];
}
