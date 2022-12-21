import { Module } from '@nestjs/common';

import { BuildInfoController } from './build-info.controller';

@Module({
  controllers: [BuildInfoController],
})
export class BuildInfoModule {}
