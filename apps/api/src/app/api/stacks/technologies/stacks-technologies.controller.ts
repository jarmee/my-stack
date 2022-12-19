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

import { API } from '../../../constants';
import { CreateStackTechnologyDto } from './create-stack-technology.dto';
import { StackTechnology } from './stack-technology.entity';
import { StacksTechnologiesService } from './stacks-technologies.service';
import { UpdateStackTechnologyDto } from './update-stack-technology.dto';

@Controller(API.ENDPOINTS.STACKS_TECHNOLOGIES())
@ApiTags(API.ENDPOINTS.STACKS)
export class StacksTechnologiesController {
  constructor(private _service: StacksTechnologiesService) {}

  @Post()
  @ApiOperation({
    operationId: 'createTechnologyForStack',
    description: 'creates a technology for a specific stack',
  })
  @ApiResponse({
    status: 200,
    type: StackTechnology,
  })
  create(
    @Param('stackId') stackId: number,
    @Body() createTechnology: CreateStackTechnologyDto
  ): Promise<StackTechnology> {
    return this._service.create(stackId, createTechnology);
  }

  @Get()
  @ApiOperation({
    operationId: 'getAllTechnologiesOfStack',
    description: 'returns all technologies of a specific stack',
  })
  @ApiResponse({
    status: 200,
    isArray: true,
    type: StackTechnology,
  })
  getAll(@Param('stackId') stackId: number): Promise<Array<StackTechnology>> {
    return this._service.getAll(stackId);
  }

  @Get(':id')
  @ApiOperation({
    operationId: 'getTechnologyOfStackById',
  })
  @ApiResponse({
    status: 200,
    type: StackTechnology,
  })
  getById(
    @Param('stackId') stackId: number,
    @Param('id') id: number
  ): Promise<StackTechnology> {
    return this._service.getById(stackId, id);
  }

  @Put(':id')
  @ApiOperation({
    operationId: 'updateTechnologyOfStackById',
  })
  @ApiResponse({
    status: 200,
    type: StackTechnology,
  })
  update(
    @Param('stackId') stackId: number,
    @Param('id') id: number,
    @Body() updateTechnology: UpdateStackTechnologyDto
  ): Promise<StackTechnology> {
    return this._service.update(stackId, id, updateTechnology);
  }

  @Delete(':id')
  @ApiOperation({
    operationId: 'deleteTechnologyOfStack',
  })
  @ApiResponse({
    status: 204,
  })
  @HttpCode(204)
  delete(
    @Param('stackId') stackId: number,
    @Param('id') id: number
  ): Promise<void> {
    return this._service.delete(id);
  }
}
