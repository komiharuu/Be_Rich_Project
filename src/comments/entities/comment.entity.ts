import { Card } from 'src/cards/entities/card.entity';
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

  @Column({ unsigned: true })
  user_id: number;

  @Column({ unsigned: true })
  card_id: number;

  @Column({ type: 'text' })
  comment: string;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type): typeof User => User, (user): Card[] => user.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @ManyToOne((type): typeof Card => Card, (card): Comment[] => card.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  card: Card;
}
