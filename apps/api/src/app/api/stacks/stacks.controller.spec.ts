import { faker } from "@faker-js/faker";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as supertest from "supertest";
import { Repository } from "typeorm";

import { TestDataFactory } from "../../../testing";
import { API } from "../../constants";
import { Stack } from "./stack.entity";
import { StacksModule } from "./stacks.module";
import { StackTechnology } from "./technologies/stack-technology.entity";

describe(API.ENDPOINTS.STACKS, () => {
  let app: INestApplication;
  let repository: Repository<Stack>;

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [
        StacksModule,
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

    repository = testingModule.get("StackRepository");
  });

  describe("create", () => {
    it("should create the given stack", async () => {
      const actual = TestDataFactory.Stack.build();

      const { body } = await supertest
        .agent(app.getHttpServer())
        .post(`/${API.ENDPOINTS.STACKS}`)
        .send(actual)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201);

      expect(body.title).toEqual(actual.title);
    });
  });

  describe("getAll", () => {
    const expected: Array<Stack> = [];
    beforeEach(async () => {
      const stacks = TestDataFactory.Stack.buildList(10);
      for (const stack of stacks) {
        const createdStack = await repository.save(stack);
        expected.push(createdStack);
      }
    });

    it("should return the expected stacks", async () => {
      const { body } = await supertest
        .agent(app.getHttpServer())
        .get(`/${API.ENDPOINTS.STACKS}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(body).toBeDefined();
      expect(body).toEqual(expected);
    });
  });

  describe("getById", () => {
    it("should return the expected stack", async () => {
      const expected = await repository.save(TestDataFactory.Stack.build());

      const { body } = await supertest
        .agent(app.getHttpServer())
        .get(`/${API.ENDPOINTS.STACKS}/${expected.id}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(body).toEqual(expected);
    });
  });

  describe("update", () => {
    it("should update the expected stack", async () => {
      const actual = await repository.save(TestDataFactory.Stack.build());
      const expected = {
        ...actual,
        title: faker.word.noun(),
      };

      const { body } = await supertest
        .agent(app.getHttpServer())
        .put(`/${API.ENDPOINTS.STACKS}/${actual.id}`)
        .send(expected)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(body).toEqual(expected);
    });
  });

  describe("delete", () => {
    it("should delete the expected stack", async () => {
      const actual = await repository.save(TestDataFactory.Stack.build());

      await supertest
        .agent(app.getHttpServer())
        .delete(`/${API.ENDPOINTS.STACKS}/${actual.id}`)
        .set("Accept", "application/json")
        .expect(204);

      const expected = await repository.find();
      expect(expected).toHaveLength(0);
    });
  });

  afterEach(() => {
    repository.clear();
  });

  afterAll(() => {
    app.close();
  });
});
