import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

export enum TaskStatus {
  PENDING = "pending",
  FINISHED = "finished"
}

@Entity({ name: "tasks" })
export class Tasks {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(type => User)
  @JoinColumn([
      { name: "user_id", referencedColumnName: "id" }
  ])
  user_id: User["id"];

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({
    type: "enum",
    enum: TaskStatus,
    default: TaskStatus.PENDING
  })
  status: TaskStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}