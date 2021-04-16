import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PetsService } from './pets.service';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  async getPets() {
    return await this.petsService.getPets();
  }

  @Get(':id')
  async getPet(@Param('id') id) {
    return await this.petsService.getPet(id);
  }

  @Post()
  async createPet(@Body() pet: any) {
    return await this.petsService.createPet(pet);
  }

  @Put(':id')
  async updatePet(@Param('id') id, @Body() pet: any) {
    return await this.petsService.updatePet(id, pet);
  }

  @Post(':id/feed')
  async feedPet(@Param('id') id) {
    const name = await this.petsService.feedPet(id);
    return `${name} is now full`;
  }
}
