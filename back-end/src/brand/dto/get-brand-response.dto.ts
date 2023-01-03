import { Expose, Type } from 'class-transformer';
import { FileReponseDto } from 'src/shared/dto/file-response.dto';
import { StatusReponseDto } from 'src/shared/dto/status-response.dto';

class CategoriesDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}

export class GetBrandDetailReponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  totalProduct: number;

  @Expose()
  slug: string;

  @Expose()
  @Type(() => FileReponseDto)
  logo: FileReponseDto;

  @Expose()
  @Type(() => StatusReponseDto)
  status: StatusReponseDto;

  @Expose()
  @Type(() => FileReponseDto)
  image: FileReponseDto;

  @Expose()
  @Type(() => CategoriesDto)
  categories: CategoriesDto[];
}
