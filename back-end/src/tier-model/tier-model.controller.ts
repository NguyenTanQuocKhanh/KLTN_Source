import { Controller } from '@nestjs/common';
import { TierModelService } from './tier-model.service';

@Controller('tier-model')
export class TierModelController {
  constructor(private readonly tierModelService: TierModelService) {}

  // @Post()
  // create(@Body() createTierModelDto: CreateTierModelDto) {
  //   return this.tierModelService.create(createTierModelDto);
  // }

  // @Get()
  // findAll() {
  //   return this.tierModelService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tierModelService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateTierModelDto: UpdateTierModelDto,
  // ) {
  //   return this.tierModelService.update(+id, updateTierModelDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tierModelService.remove(+id);
  // }
}
