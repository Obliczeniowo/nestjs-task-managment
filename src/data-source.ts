import { DataSource } from "typeorm"
import { Task } from './tasks/tasks.entity'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'task-management',
    synchronize: true,
    entities: [
        Task
    ],
})