import {
  GIT_BRANCH,
  BUILD_DATE,
  GIT_COMMIT_HASH,
} from '@my-stack/shared/build-info';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import supertest = require('supertest');

import { API } from '../../constants';
import { BuildInfoModule } from './build-info.module';

describe('BuildInfoController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [BuildInfoModule],
    }).compile();

    app = testingModule.createNestApplication();
    await app.init();
  });

  describe('get', () => {
    it('should return the expected build information', async () => {
      const expected = {
        gitBranch: GIT_BRANCH,
        buildDate: BUILD_DATE,
        gitCommitHash: GIT_COMMIT_HASH,
      };

      const { body } = await supertest
        .agent(app.getHttpServer())
        .get(`/${API.ENDPOINTS.BUILD_INFO}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);

      expect(body).toBeDefined();
      expect(body).toEqual(expected);
    });
  });
});
