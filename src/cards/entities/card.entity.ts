import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Checklist } from './checklist.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { List } from 'src/lists/entities/list.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'list_id' })
  listId: number;

  @Column({ unique: true, type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', default: '#FFFFFF' })
  color: string;

  @Column({ unsigned: true })
  position: number;

  @Column({ unsigned: true, name: 'assignment_id' })
  assignmentId: number;

  @Column({ type: 'json', nullable: true, name: 'collaborator_id' })
  collaboratorId: number[];

  @Column({ type: 'datetime', nullable: true })
  startdate: Date;

  @Column({ type: 'datetime', nullable: true })
  duedate: Date;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.cards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => List, (list) => list.cards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'list_id' })
  list: List;

  @OneToMany(() => Checklist, (checklists) => checklists.card, {})
  checklists: Checklist[];

  @OneToMany(() => Comment, (comments) => comments.card, { cascade: true })
  comments: Comment[];
}
