import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as supertest from "supertest";
import { Repository } from "typeorm";

import { TestDataFactory } from "../../../testing";
import { API } from "../../constants";
import { Skill } from "./skill.entity";
import { SkillsModule } from "./skills.module";

describe(API.ENDPOINTS.SKILLS, () => {
  let app: INestApplication;
  let repository: Repository<Skill>;

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [
        SkillsModule,
        TypeOrmModule.forRoot({
          type: "better-sqlite3",
          database: ":memory:",
          dropSchema: true,
          entities: [Skill],
          synchronize: true,
        }),
      ],
    }).compile();

    app = testingModule.createNestApplication();
    await app.init();

    repository = testingModule.get("SkillRepository");
  });

  describe("create", () => {
    it("should create the given skill", async () => {
      const actual = TestDataFactory.Skill.build();

      const { body } = await supertest
        .agent(app.getHttpServer())
        .post("/skills")
        .send(actual)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201);

      expect(body.title).toEqual(actual.title);
    });
  });

  describe("getAll", () => {
    const expected: Array<Skill> = [];
    beforeEach(async () => {
      const skills = TestDataFactory.Skill.buildList(10);
      for (const skill of skills) {
        const createdSkill = await repository.save(skill);
        expected.push(createdSkill);
      }
    });

    it("should return the expected skills", async () => {
      const { body } = await supertest
        .agent(app.getHttpServer())
        .get("/skills")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(body).toBeDefined();
      expect(body).toEqual(expected);
    });
  });

  describe("getById", () => {
    it("should return the expected skill", async () => {
      const expected = await repository.save(TestDataFactory.Skill.build());

      const { body } = await supertest
        .agent(app.getHttpServer())
        .get(`/skills/${expected.id}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(body).toEqual(expected);
    });
  });

  afterEach(() => {
    repository.clear();
  });

  afterAll(() => {
    app.close();
  });
});
