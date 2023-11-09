import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotesDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;
}

export class UpdateNotesDto {
  @IsNotEmpty()
  @IsString()
  body: string;
}
