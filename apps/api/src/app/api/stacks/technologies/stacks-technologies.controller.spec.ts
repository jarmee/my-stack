import { faker } from "@faker-js/faker";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as supertest from "supertest";
import { Repository } from "typeorm";

import { TestDataFactory } from "../../../../testing";
import { API } from "../../../constants";
import { Stack } from "../stack.entity";
import { StackTechnology } from "./stack-technology.entity";
import { StacksTechnologiesModule } from "./stacks-technologies.module";

fdescribe(`/${API.ENDPOINTS.STACKS_TECHNOLOGIES()}`, () => {
  let app: INestApplication;
  let stackRepository: Repository<Stack>;
  let repository: Repository<StackTechnology>;
  let stack: Stack;

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [
        StacksTechnologiesModule,
        TypeOrmModule.forRoot({
          type: "better-sqlite3",
          database: ":memory:",
          dropSchema: true,
          entities: [Stack, StackTechnology],
          synchronize: true,
        }),
      ],
    }).compile();

    app = testingModule.createNestApplication();
    await app.init();

    stackRepository = testingModule.get("StackRepository");
    repository = testingModule.get("StackTechnologyRepository");
  });

  beforeEach(async () => {
    stack = await stackRepository.save(TestDataFactory.Stack.build() as Stack);
  });

  describe("create", () => {
    it("should create the given technology", async () => {
      const actual = TestDataFactory.StackTechnology.build();

      const { body } = await supertest
        .agent(app.getHttpServer())
        .post(`/${API.ENDPOINTS.STACKS_TECHNOLOGIES(stack.id)}`)
        .send(actual)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201);

      expect(body.title).toEqual(actual.title);
    });
  });

  describe("getAll", () => {
    const expected: Array<Omit<StackTechnology, "stack">> = [];

    beforeEach(async () => {
      const stackTechnologies = TestDataFactory.StackTechnology.buildList(10);
      for (const technology of stackTechnologies) {
        const createdTechnology = await repository.save({
          title: technology.title,
          stack: stack,
        });

        expected.push({
          id: createdTechnology.id,
          title: createdTechnology.title,
        });
      }
    });

    it("should return the expected technologies", async () => {
      const { body } = await supertest
        .agent(app.getHttpServer())
        .get(`/${API.ENDPOINTS.STACKS_TECHNOLOGIES(stack.id)}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(body).toBeDefined();
      expect(body).toEqual(expected);
    });
  });

  describe("getById", () => {
    it("should return the expected technology", async () => {
      const technology = await repository.save({
        ...TestDataFactory.StackTechnology.build(),
        stack: stack,
      });
      const expected = {
        id: technology.id,
        title: technology.title,
      };

      const { body } = await supertest
        .agent(app.getHttpServer())
        .get(`/${API.ENDPOINTS.STACKS_TECHNOLOGIES(stack.id)}/${expected.id}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(body).toBeDefined();
      expect(body).toEqual(expected);
    });
  });

  describe("update", () => {
    it("should update the expected technology", async () => {
      const actual = await repository.save({
        ...TestDataFactory.StackTechnology.build(),
        stack: stack,
      });
      const expected = {
        id: actual.id,
        title: faker.word.noun(),
      };

      const { body } = await supertest
        .agent(app.getHttpServer())
        .put(`/${API.ENDPOINTS.STACKS_TECHNOLOGIES(stack.id)}/${expected.id}`)
        .send(expected)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(body).toEqual(expected);
    });
  });

  describe("delete", () => {
    it("should delete the expected technology", async () => {
      const actual = await repository.save({
        ...TestDataFactory.StackTechnology.build(),
        stack: stack,
      });

      await supertest
        .agent(app.getHttpServer())
        .delete(`/${API.ENDPOINTS.STACKS_TECHNOLOGIES(stack.id)}/${actual.id}`)
        .set("Accept", "application/json")
        .expect(204);

      const expected = await repository.find();
      expect(expected).toHaveLength(0);
    });
  });

  afterEach(() => {
    repository.clear();
    stackRepository.clear();
  });

  afterAll(() => {
    app.close();
  });
});
