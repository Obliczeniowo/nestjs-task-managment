import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'Tytuł nie powinien być pusty'})
  title: string;

  @IsNotEmpty({ message: 'Opis nie powinien być pusty'})
  description: string;
}