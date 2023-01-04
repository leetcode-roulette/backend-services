import supertest from "supertest";
import express from "express";
import { app } from "../app";
import { Questions, iQuestion } from "@models/questions";
import { UserQuestionStatuses } from "@models/userQuestionStatuses";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);

beforeEach((done) => {
	mongoose.connect("mongodb://localhost:27017/questionsTests", {}, () => done());
});

afterEach((done) => {
	mongoose.connection.db.dropDatabase(() => {
		mongoose.connection.close(() => done());
	});
});

describe("Tests for `GET /questions`", () => {
	test("Can retrieve all questions", async () => {
		const question: iQuestion = await Questions.create({
			_id: 1,
			frontendId: 1,
			title: "Two Sum",
			slug: "two-sum",
			content: "Two sum description",
			difficulty: 1,
			tags: ["Array", "Math"],
			isPremium: false,
			accepted: 100,
			submissions: 3000,
			hints: ["This question can be solves in O(n)", "A hashmap might help here"],
		});

		await supertest(app)
			.get("/questions")
			.expect(200)
			.then(response => {
				expect(Array.isArray(response.body.questions)).toBeTruthy();
				expect(response.body.questions.length).toEqual(1);

				const q = response.body.questions[0];
				expect(q.title).toBe(question.title);
				expect(q.title_slug).toBe(question.slug);
				expect(q.difficulty).toBe(question.difficulty);
				expect(q.completed).toBe(false);
				expect(q.attempted).toBe(false);
			});
	});

	test("Can retrieve a users question statuses", async () => {
		const mockApp = express();
		mockApp.all("*", function(req, res, next) {
			req.cookies = { userId: 1 };
			next();
		});

		mockApp.use(app);

		await Questions.create({
			_id: 1,
			frontendId: 1,
			title: "Two Sum",
			slug: "two-sum",
			content: "Two sum description",
			difficulty: 1,
			tags: ["Array", "Math"],
			isPremium: false,
			accepted: 100,
			submissions: 3000,
			hints: ["This question can be solves in O(n)", "A hashmap might help here"],
		});

		await Questions.create({
			_id: 2,
			frontendId: 2,
			title: "Add Two Numbers",
			slug: "add-two-numbers",
			content: "Two sum description",
			difficulty: 1,
			tags: ["Array", "Math"],
			isPremium: false,
			accepted: 100,
			submissions: 3000,
			hints: ["This question can be solves in O(n)", "A hashmap might help here"],
		});

		await UserQuestionStatuses.create({
			userId: 1,
			questionId: 1,
			isCompleted: true,
			hasBeenAttempted: true,
		});

		await UserQuestionStatuses.create({
			userId: 1,
			questionId: 2,
			isCompleted: false,
			hasBeenAttempted: true
		});

		await supertest(mockApp)
			.get("/questions")
			.expect(200)
			.then(response => {
				expect(Array.isArray(response.body.questions)).toBeTruthy();
				expect(response.body.questions.length).toEqual(2);

				const questions = response.body.questions;
				expect(questions[0].completed).toBe(true);
				expect(questions[0].attempted).toBe(true);
				expect(questions[1].completed).toBe(false);
				expect(questions[1].attempted).toBe(true);
			});
	});
});

describe("Tests for `GET /questions/:slug`", () => {
	test("Can retrieve question by slug", async () => {
		const question: iQuestion = await Questions.create({
			_id: 1,
			frontendId: 1,
			title: "Two Sum",
			slug: "two-sum",
			content: "Two sum description",
			difficulty: 1,
			tags: ["Array", "Math"],
			isPremium: false,
			accepted: 100,
			submissions: 3000,
			hints: ["This question can be solves in O(n)", "A hashmap might help here"],
		});

		await supertest(app)
			.get("/questions/two-sum")
			.expect(200)
			.then(response => {
				const q = response.body.question;
				expect(q.title).toBe(question.title);
				expect(q.title_slug).toBe(question.slug);
				expect(q.difficulty).toBe(question.difficulty);
				expect(q.completed).toBe(false);
				expect(q.attempted).toBe(false);
			});
	});
});