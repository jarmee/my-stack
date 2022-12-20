import {
  BUILD_DATE,
  GIT_BRANCH,
  GIT_COMMIT_HASH,
} from '@my-stack/shared/build-info';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { API } from '../../constants';
import { GetBuildInfo } from './get-build-info.dto';

@Controller(API.ENDPOINTS.BUILD_INFO)
@ApiTags(API.ENDPOINTS.BUILD_INFO)
export class BuildInfoController {
  @Get()
  @ApiOperation({
    operationId: 'getBuildInfo',
    description: 'returns the build info of this application',
  })
  @ApiResponse({
    status: 200,
    isArray: true,
    type: GetBuildInfo,
  })
  get(): GetBuildInfo {
    return {
      gitBranch: GIT_BRANCH,
      buildDate: BUILD_DATE,
      gitCommitHash: GIT_COMMIT_HASH,
    };
  }
}
