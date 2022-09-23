import React from "react";
import express from 'express';

const connect = require("../../../config/db");
const request = require("supertest");

const app = express()
beforeEach(async () => {
  await connect();
});

const runTests = () => {
  describe("Test the home page", () => {
    test("It should give a 200 response.", async () => {
      let res = await request(app).get("/");
      expect(res.statusCode).toBe(200);
    });
  });
};

connect()
  .then(_ => app.listen(process.env.PORT))
  .then(runTests)
  .catch(err => {
    console.error(`Could not connect to mongodb`, err);
  });
