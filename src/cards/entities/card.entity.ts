import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column({ type: 'varchar' })
  assignment: string;

  @Column({ type: 'varchar' })
  change: string;

  @Column({ type: 'datetime' })
  startdate: Date;

  @Column({ type: 'datetime' })
  duedate: Date;

  @Column({ type: 'datetime', default: false })
  is_deleted: boolean;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @ManyToOne((type): typeof User => User, (user): Card[] => user.cards, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne((type): typeof List => List, (list): Card[] => list.cards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn
  list: List;
}
