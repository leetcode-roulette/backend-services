import supertest from "supertest";
import express from "express";
import { app } from "../app";

describe("Tests for `authController` related routes", () => {
	test("Can log a signed in user out", async () => {
		const mockApp = express();
		mockApp.all("*", function(req, res, next) {
			req.cookies = { userId: 1 };
			next();
		});

		mockApp.use(app);

		supertest(app)
			.post("/logout")
			.expect(200)
			.then((response) => {
				expect(response.body).toBe("Successfully logged out user");
			});
	});

	test("Notified if logout is called without a logged in user", () => {
		supertest(app)
			.post("/logout")
			.expect(200)
			.then((response) => {
				expect(response.body).toBe("No user session found");
			});
	});
});
