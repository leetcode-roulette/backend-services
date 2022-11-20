# Tags Service
Auth endpoints used for [Leetcode Roulette](https://leetcoderoulette.com).

> API hosted at https://api.leetcoderoulette.com

## Getting Started
To get started running the Auth Service locally, clone the repository to your local machine and change to the project root directory. Next, make sure to make the needed configurations and run `npm install` to get the needed packages for the project. Next, build and run the project with `npm run build` followed by `npm start` respectively.

```
git clone https://github.com/leetcode-roulette/backend-services.git
cd backend-services/src/services/auth
npm install
npm run build
npm start
```

This will install the required dependencies on your local machine followed by building the source code to a `dist` folder and running the server code in the `dist/index.js` file.


### Prerequisites
Before running the Auth Service locally, the following steps will need to be taken to ensure the needed software will be installed or set up.

* Install [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and [NodeJS](https://nodejs.dev/en/learn/how-to-install-nodejs/)
* Install [MongoDB](https://www.mongodb.com/docs/manual/installation/) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/lp/try4) and setup using the provided [instructions](https://www.mongodb.com/docs/atlas/getting-started/)
* Install and setup [Kafka](https://kafka.apache.org/quickstart)

## Developing
To begin development on this project, make sure to make the needed configurations and run `npm install` to get the needed packages for the project. Finally, run the `npm run dev` command to deploy a local development environment on your local machine.

```
npm install
npm run dev
```

This will spin up a nodemon server using the server code in the `src/index.ts` file.

### Building
To build the project, run the `npm run build` command.

```
npm run build
```

This will compile the typescript in the `src` folder and create a new `dist` folder consisting of built Javascript code.

### Testing
To test the project, run the `npm run test` command.

```
npm run test
```

This will run the tests in any file in the `src` directory following the specified formats.

* `"**/tests/**/*.spec.ts"`
* `"**/tests/**/*.test.ts"`

## Features
This project allows users to sync and unsync leetcode cookies from [leetcode](https://leetcode.com). 

## Configuration
The following configurations can be specified in a `.env` file.

##### KAFKA_BROKERS
Type: `String[]`
Default: `["kafka1:9092", "kafka2:9092"]`

Space delimited string that specifies broker addresses.

##### KAFKA_CLIENT_ID
Type: `String`
Default: `leetcode-roulette`

Specifies the client id for producer instance.

```Javascript
const producer: TagsProducer = new TagsProducer({
  clientId: KAFKA_CLIENT_ID,
  brokers: KAFKA_BROKERS
}); // Sets up up a new producer instance
```

##### PORT
Type: `Integer`
Default: 3000

Specifies which port the server will run on.

```javascript
app.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}`); // Log the port the application is being run on
});
```

##### VERSION
Type: `String`
Default: `'1.0.0'`

Specifies the current version of the project.

##### ENVIRONMENT
Type: `String`
Default: `'dev'`

Specifies the environment that is being used.

```javascript
res.status(200).json({
  version: VERSION,
  environment: ENVIRONMENT,
  status: "Live"
});
```

## Built With
* [NodeJS](https://nodejs.org) - Node.js is an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside a web browser.
* [Kafka](https://kafka.apache.org/) - Apache Kafka is an open-source distributed event streaming platform used by thousands of companies for high-performance data pipelines, streaming analytics, data integration, and mission-critical applications.
* [Express.JS](https://expressjs.com) - Express.js, or simply Express, is a back end web application framework for Node.js, released as free and open-source software under the MIT License.
* [Typescript](https://typescriptlang.org) - TypeScript is a free and open source programming language developed and maintained by Microsoft.
