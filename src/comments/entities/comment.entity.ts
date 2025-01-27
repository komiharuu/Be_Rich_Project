import { Card } from 'src/cards/entities/card.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'int', name: 'user_id', unsigned: true, nullable: true })
  userId: number;

  @Column({ type: 'int', name: 'card_id', unsigned: true })
  cardId: number;

  @Column({ type: 'text' })
  comment: string;

  @Column({ type: 'boolean', default: false, name: 'is_deleted' })
  isDeleted: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Card, (card) => card.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'card_id' })
  card: Card;
}
