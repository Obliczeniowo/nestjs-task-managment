import { Task } from 'src/tasks/tasks.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true
  })
  username: string;

  @Column()
  password: string;

  @OneToMany(_ => Task, (task: { user }) => task.user, { eager: true })
  tasks: Task[];
}