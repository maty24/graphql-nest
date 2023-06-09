import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { CreateItemInput, UpdateItemInput } from './dto';


@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation(() => Item)
  async createItem(
    @Args('createItemInput') createItemInput: CreateItemInput
    //despues de los 2 puntos se espera un item pero como aync le pongo un promise
  ): Promise<Item> {
    return this.itemsService.create(createItemInput);
  }

  @Query(() => [Item], { name: 'items' })
  async findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Query(() => Item, { name: 'item' })
  async findOne(
    @Args('serial', { type: () => String }, ParseUUIDPipe ) serial: string
  ): Promise<Item> {
    return this.itemsService.findOne(serial);
  }

  @Mutation(() => Item)
  updateItem(
    @Args('updateItemInput') updateItemInput: UpdateItemInput
  ):Promise<Item> {
    return this.itemsService.update( updateItemInput.id, updateItemInput );
  }

  @Mutation(() => Item)
  removeItem(
    @Args('id', { type: () => ID }) id: string
  ): Promise<Item> {
    return this.itemsService.remove(id);
  }
}
