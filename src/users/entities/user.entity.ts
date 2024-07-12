import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Board } from 'src/boards/entities/board.entity';
import { Member } from 'src/boards/entities/member.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  nickname!: string;

  @Column()
  password!: string;

  @Column({ name: 'profile_img', nullable: true })
  profileImg!: string;

  @Column({ name: 'refresh_token', nullable: true })
  refreshToken!: string;

  @Column({ name: 'is_deleted', default: false })
  isDeleted!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @OneToMany(() => Board, (board) => board.user)
  boards!: Board[];

  @OneToMany(() => Member, (member) => member.user)
  members!: Member[];
}
