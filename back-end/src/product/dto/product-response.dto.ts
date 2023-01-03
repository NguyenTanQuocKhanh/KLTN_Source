import { Expose, Type } from 'class-transformer';

class FileResponse {
  @Expose()
  id: number;

  @Expose()
  path: string;

  @Expose()
  type: string;

  @Expose()
  duration: number;
}

class CategoriesResponse {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  @Type(() => FileResponse)
  logo: FileResponse;
}

class BrandResponse {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  @Type(() => FileResponse)
  logo: FileResponse;

  @Expose()
  @Type(() => FileResponse)
  image: FileResponse;
}

class ModelResponse {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  price?: number;

  @Expose()
  priceBeforeDiscount: number;

  @Expose()
  stock: number;

  @Expose()
  sold?: number;

  @Expose()
  image?: string;

  @Expose()
  parent: string;
}
class TierModelResponse {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  @Type(() => ModelResponse)
  models: ModelResponse;
}

class StatisticReviewResponse {
  @Expose()
  rating: number;

  @Expose()
  totalReview: number;
}
export class ProductResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  @Type(() => FileResponse)
  image: FileResponse;

  @Expose()
  @Type(() => FileResponse)
  images: FileResponse[];

  @Expose()
  likedCount?: number;

  @Expose()
  viewCount: number;

  @Expose()
  isCurrentUserLiked: boolean;

  @Expose()
  discount?: number;

  @Expose()
  stock?: number;

  @Expose()
  price?: number;

  @Expose()
  priceBeforeDiscount: number | null;

  @Expose()
  sold?: number | null;

  @Expose()
  ratingAvg: number;

  @Expose()
  @Type(() => CategoriesResponse)
  categories: CategoriesResponse;

  @Expose()
  @Type(() => BrandResponse)
  brand: BrandResponse;

  @Expose()
  @Type(() => TierModelResponse)
  tierModels?: TierModelResponse[];

  @Expose()
  keywords?: string[];

  @Expose()
  statisticReview: StatisticReviewResponse[];

  @Expose()
  slug?: string;

  @Expose()
  params?: Record<string, unknown>;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  deletedAt: Date;
}
