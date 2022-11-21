import Users, { iUser } from "@models/users";
import express from "express";
import session from "express-session";
import { app } from "app";
import mongoose from "mongoose";
import supertest from "supertest";

beforeEach((done) => {
	mongoose.connect("mongodb://localhost:27017/usersTests", {}, () => done());
});

afterEach((done) => {
	mongoose.connection.db.dropDatabase(() => {
		mongoose.connection.close(() => done());
	});
});

describe("Tests for `UsersController` related routes", () => {
	test("Can get the currently authenticated user", async () => {
		const mockApp = express();
		mockApp.use(session({ secret: "test", resave: true, saveUninitialized: true }));
		mockApp.all("*", function(req, res, next) {
			req.cookies = { userId: 1 };
			next();
		});

		mockApp.use(app);

		const user: iUser = await Users.create({
			username: "test",
			avatar: "location",
			isPremium: true,
			_id: 1
		});

		await supertest(mockApp)
			.get("/")
			.expect(200)
			.then(response => {
				const data = response.body.user;

				expect(data.username).toBe(user.username);
				expect(data.avatar).toBe(user.avatar);
				expect(data.is_premium).toBe(user.isPremium);
				expect(data.accepted).toBe(0);
				expect(Array.isArray(data.question_statuses)).toBe(true);
			});
	});

	test("Can not retrieve current user if unauthenticated", async () => {
		await supertest(app)
			.get("/")
			.expect(401);
	});

	test("Can find a user by username", async () => {
		const user: iUser = await Users.create({
			username: "test",
			avatar: "location",
			isPremium: true,
			_id: 1
		});

		await supertest(app)
			.get("/users/test")
			.expect(200)
			.then(response => {
				const data = response.body.user;

				expect(data.username).toBe(user.username);
				expect(data.avatar).toBe(user.avatar);
				expect(data.is_premium).toBe(user.isPremium);
				expect(data.accepted).toBe(0);
				expect(Array.isArray(data.question_statuses)).toBe(true);
			});
	});

	test("Can not get a user that does not exist", async () => {
		await supertest(app)
			.get("/users/madeup")
			.expect(500);
	});
});
