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

@Entity('checklists')
export class Checklist {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true, name: 'card_id' })
  cardId: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  item: string;
  //체크리스트 내용을 트렐로에서는 item이라고 함.

  @Column({ type: 'boolean', default: false })
  is_completed: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type): typeof Card => Card, (card): Checklist[] => card.checklists, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'card_id' })
  card: Card;
}
