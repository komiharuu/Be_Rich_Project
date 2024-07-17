import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { Checklist } from './checklist.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { List } from 'src/lists/entities/list.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true, name: 'user_id' })
  userId: number;

  @Column({ unsigned: true, name: 'list_id' })
  listId: number;

  @Column({ unique: true, type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', default: '#FFFFFF' })
  color: string;

  @Column({ unsigned: true, nullable: true })
  position: number;

  @Column({ unsigned: true, nullable: true, name: 'assignor_id' })
  assignorId: number;

  @Column({ type: 'json', nullable: true, name: 'assignee_id' })
  assigneeId: number;

  @Column({
    type: 'datetime',
    name: 'start_date',

    default: () => 'CURRENT_TIMESTAMP',
  })
  startDate: Date;

  @Column({
    type: 'datetime',
    name: 'due_date',
  })
  dueDate: Date;

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

  @BeforeInsert()
  setDefaultDates() {
    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const tomorrow = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + oneDay);

    if (!this.dueDate) {
      this.dueDate = tomorrow;
    }
  }
}
