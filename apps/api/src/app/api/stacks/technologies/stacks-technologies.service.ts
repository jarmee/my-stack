import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Stack } from "../stack.entity";
import { CreateStackTechnologyDto } from "./create-stack-technology.dto";
import { StackTechnology } from "./stack-technology.entity";
import { UpdateStackTechnologyDto } from "./update-stack-technology.dto";

@Injectable()
export class StacksTechnologiesService {
  constructor(
    @InjectRepository(StackTechnology)
    private _repository: Repository<StackTechnology>,
    @InjectRepository(Stack)
    private _parentRepository: Repository<Stack>
  ) {}

  create(
    stackId: number,
    createStackTechnology: CreateStackTechnologyDto
  ): Promise<StackTechnology> {
    return this._parentRepository.findOneBy({ id: stackId }).then((stack) => {
      const stackTechnology = new StackTechnology();
      stackTechnology.title = createStackTechnology.title;
      stackTechnology.stack = stack;

      return this._repository.save(stackTechnology);
    });
  }

  getAll(stackId: number): Promise<Array<StackTechnology>> {
    return this._parentRepository
      .findOneBy({ id: stackId })
      .then((stack) => stack.technologies);
  }

  getById(stackId: number, id: number): Promise<StackTechnology> {
    // @TODO: this has to be implemented better #21
    return this._parentRepository
      .findOneBy({ id: stackId })
      .then((stack) =>
        stack.technologies.find((technology) => technology.id == id)
      );
  }

  update(
    stackId: number,
    id: number,
    updateStackTechnology: UpdateStackTechnologyDto
  ): Promise<StackTechnology> {
    return this._parentRepository
      .findOneBy({ id: stackId })
      .then((stack) =>
        stack.technologies.find((technology) => technology.id == id)
      )
      .then((technology) => {
        if (technology) {
          technology.title = updateStackTechnology.title;
          return this._repository.save(technology);
        }
        return null;
      });
  }

  delete(id: number): Promise<void> {
    return this._repository.delete({ id: id }).then(() => null);
  }
}
