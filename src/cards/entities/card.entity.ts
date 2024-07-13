import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Checklist } from './checklist.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { List } from 'src/lists/entities/list.entity';

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true })
  user_id: number;

  @Column({ unsigned: true })
  list_id: number;

  @Column({ unique: true, type: 'varchar' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', default: '#FFFFFF' })
  color: string;

  @Column({ unsigned: true })
  position: number;

  // 할당한 사람의 Id- 따로설정한 이유: 카드 제작자랑 할당자랑 다를 수 있기 때문
  @Column({ unsigned: true })
  assignment_id: number;

  // 할당받은 사람의 id, 할당받은 사람이 없을 수도 있으니 nullable을 설정해놓았습니다.
  // @Column({ unsigned: true, nullable: true })
  // collaborator_id: number[];

  @Column({ type: 'datetime', nullable: true })
  startdate: Date;
  // 사유: 트렐로 홈페이지는  시작일 설정이 의무가 아니기 때문에 nullable을 설정함.

  @Column({ type: 'datetime', nullable: true })
  duedate: Date;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // @ManyToOne((type): typeof User => User, (user): Card[] => user.cards, {
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn()
  // user: User;

  @ManyToOne((type): typeof List => List, (list): Card[] => list.cards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  list: List;

  @OneToMany((type): typeof Checklist => Checklist, (checklists) => checklists.card, {
    cascade: true,
  })
  checklists: Checklist[];

  @OneToMany((type): typeof Comment => Comment, (comments) => comments.card, {
    cascade: true,
  })
  comments: Comment[];
}
