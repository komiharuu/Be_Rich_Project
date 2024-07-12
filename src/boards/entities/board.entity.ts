import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Index('boardTitle', ['title'], { unique: true })
@Entity({ name: 'boards' })
export class Board {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  //   @ManyToOne(() => User, (user) => user.boards, { onDelete: 'CASCADE' })
  //   owner: User;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: '#ffffff' })
  backgroundColor: string;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
    lists: any;
    list: any;
}