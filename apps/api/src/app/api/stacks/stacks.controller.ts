import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { API } from '../../constants';
import { CreateStackDto } from './create-stack.dto';
import { Stack } from './stack.entity';
import { StacksService } from './stacks.service';
import { UpdateStackDto } from './update-stack.dto';

@Controller(API.ENDPOINTS.STACKS)
@ApiTags(API.ENDPOINTS.STACKS)
export class StacksController {
  constructor(private _service: StacksService) {}

  @Post()
  @ApiOperation({ operationId: 'createStack', description: 'creates a stack' })
  @ApiResponse({
    status: 200,
    type: Stack,
  })
  create(@Body() createStack: CreateStackDto): Promise<Stack> {
    return this._service.create(createStack);
  }

  @Get()
  @ApiOperation({
    operationId: 'getAllStacks',
    description: 'returns all stacks',
  })
  @ApiResponse({
    status: 200,
    isArray: true,
    type: Stack,
  })
  getAll(): Promise<Array<Stack>> {
    return this._service.getAll();
  }

  @Get(':id')
  @ApiOperation({
    operationId: 'getStackById',
  })
  @ApiResponse({
    status: 200,
    type: Stack,
  })
  getById(@Param('id') id: number): Promise<Stack> {
    return this._service.getById(id);
  }

  @Put(':id')
  @ApiOperation({
    operationId: 'updateStack',
  })
  @ApiResponse({
    status: 200,
    type: Stack,
  })
  update(
    @Param('id') id: number,
    @Body() updateStack: UpdateStackDto
  ): Promise<Stack> {
    return this._service.update(id, updateStack);
  }

  @Delete(':id')
  @ApiOperation({
    operationId: 'deleteStack',
  })
  @ApiResponse({
    status: 204,
  })
  @HttpCode(204)
  delete(@Param('id') id: number): Promise<void> {
    return this._service.delete(id);
  }
}
