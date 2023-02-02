import { Role } from './../role.enun';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  address: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'profile_picture' })
  profilePicture: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'is_active', default: false })
  isActive: boolean;

  @Column({ name: 'is_deleted', default: false })
  isDeleted: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
