import supertest from "supertest";
import { app } from "../app";
import { Tags, iTag } from "../models/tags";
import mongoose from "mongoose";

beforeEach((done) => {
	mongoose.connect("mongodb://localhost:27017/tagsTests", {}, () => done());
});

afterEach((done) => {
	mongoose.connection.db.dropDatabase(() => {
		mongoose.connection.close(() => done());
	});
});

describe("Tests for `TagsController` related routes", () => {
	test("Can retrieve all tags", async () => {
		const tag: iTag = await Tags.create({
			name: "Heap",
			slug: "heap",
			numberOfProblems: 1
		});

		await supertest(app)
			.get("/tags")
			.expect(200)
			.then(response => {
				expect(Array.isArray(response.body.tags)).toBeTruthy();
				expect(response.body.tags.length).toEqual(1);

				const t = response.body.tags[0];
				expect(t.name).toBe(tag.name);
				expect(t.slug).toBe(tag.slug);
				expect(t.number_of_problems).toBe(tag.numberOfProblems);
			});
	});
});
