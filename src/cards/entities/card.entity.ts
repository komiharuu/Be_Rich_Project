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

  @Column({ type: 'varchar' })
  color: string;

  @Column({ type: 'varchar', unique: true })
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
  user: User;

  @ManyToOne((type): typeof List => List, (list): Card[] => list.cards, {
    onDelete: 'CASCADE',
  })
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
