import { Board } from 'src/boards/entities/board.entity';
import { Card } from 'src/cards/entities/card.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('lists')
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  title: string;

  @Column({ type: 'int', nullable: false })
  position: number;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Card, (card) => card.list)
  cards: Card[];

  // @ManyToOne(() => User, (user) => user.list, {
  //   onDelete: 'CASCADE',
  // })
  // user: User;

  @ManyToOne(() => Board, (board) => board.list, {
    onDelete: 'CASCADE',
  })
  board: Board;
}
