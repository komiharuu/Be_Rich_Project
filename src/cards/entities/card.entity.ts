import { Comment } from 'src/comments/entities/comment.entity';
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
  // nullable을 한 이유: 카드를 생성할 때 색상을 고를 수 있는 옵션이 없고
  // 대신 수정 시에 색상을 변경할 수 있더라고요

  @Column({ type: 'varchar' })
  position: string;

  // 작업자 할당
  @Column({ type: 'varchar' })
  assignment: string;

  // 작업자 변경
  @Column({ type: 'varchar' })
  change: string;

  @Column({ type: 'datetime' })
  startdate: Date;

  @Column({ type: 'datetime' })
  duedate: Date;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type): typeof User => User, (user): Card[] => user.cards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

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
