import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Pet } from './pet.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private readonly petsRepository: MongoRepository<Pet>,
  ) {}

  async getPets() {
    return await this.petsRepository.find();
  }

  async getPet(id: any) {
    const pet = ObjectID.isValid(id) && (await this.petsRepository.findOne(id));
    if (!pet) {
      throw new NotFoundException();
    }
    return pet;
  }

  async createPet(pet: Pet) {
    return await this.petsRepository.save(new Pet(pet));
  }

  async updatePet(id: string, body) {
    const pet = ObjectID.isValid(id) && (await this.petsRepository.findOne(id));
    if (!pet) {
      throw new NotFoundException();
    }
    try {
      await this.petsRepository.update(id, body);
      return 'updated with ' + JSON.stringify(body);
    } catch (error) {
      throw error;
    }
  }

  async feedPet(id: string) {
    const pet = ObjectID.isValid(id) && (await this.petsRepository.findOne(id));
    if (!pet) {
      throw new NotFoundException();
    }
    await this.petsRepository.update(id, { hunger: 100 });
    return pet.name;
  }
}
