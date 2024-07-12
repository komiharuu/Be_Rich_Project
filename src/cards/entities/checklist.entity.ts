import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Card } from './card.entity';

@Entity('comments')
export class Checklist {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true })
  card_id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  item: string;

  @Column({ type: 'boolean', default: false })
  is_completed: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type): typeof Card => Card, (card): Checklist[] => card.checklists, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  card: Card;
}
