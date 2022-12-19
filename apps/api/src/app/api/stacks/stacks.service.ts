import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateStackDto as CreateStackDto } from './create-stack.dto';
import { Stack } from './stack.entity';
import { UpdateStackDto } from './update-stack.dto';

@Injectable()
export class StacksService {
  constructor(
    @InjectRepository(Stack)
    private _repository: Repository<Stack>
  ) {}

  create(createStack: CreateStackDto): Promise<Stack> {
    const stack = new Stack();
    stack.title = createStack.title;

    return this._repository.save(stack);
  }

  getAll(): Promise<Array<Stack>> {
    return this._repository.find();
  }

  getById(id: number): Promise<Stack> {
    return this._repository.findOneBy({ id: id });
  }

  update(id: number, updateStack: UpdateStackDto): Promise<Stack> {
    return this._repository.findOneBy({ id: id }).then((stack) => {
      stack.title = updateStack.title;
      return this._repository.save(stack);
    });
  }

  delete(id: number): Promise<void> {
    return this._repository.delete({ id: id }).then(() => null);
  }
}
