import { PartialType } from '@nestjs/swagger';
import { CreateTierModelDto } from './create-tier-model.dto';

export class UpdateTierModelDto extends PartialType(CreateTierModelDto) {}
