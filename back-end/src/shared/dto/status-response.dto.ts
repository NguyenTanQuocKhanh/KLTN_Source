import { Expose } from 'class-transformer';

export class StatusReponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
