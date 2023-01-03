import { Expose } from 'class-transformer';

export class FileReponseDto {
  @Expose()
  id: string;

  @Expose()
  path: string;

  @Expose()
  type: string;

  @Expose()
  duration: number;
}
